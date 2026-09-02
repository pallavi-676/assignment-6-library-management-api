const bookModel = require("../models/bookModel");
const transactionModel = require("../models/transactionModel");

async function getBooks(req, res, next) {
  try {
    let books = await bookModel.all();

    if (req.query.category) {
      books = books.filter(b => b.category?.toLowerCase() === req.query.category.toLowerCase());
    }

    if (req.query.status) {
      books = books.filter(b => b.status === req.query.status);
    }

    res.json(books);
  } catch (error) {
    next(error);
  }
}

async function getBook(req, res, next) {
  try {
    const book = await bookModel.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    next(error);
  }
}

async function addBook(req, res, next) {
  try {
    const { title, author, isbn, category, quantity } = req.body;

    const book = await bookModel.create({
      title,
      author,
      isbn,
      category,
      quantity: Number(quantity),
      status: "available",
      createdAt: new Date()
    });

    res.status(201).json({ message: "Book added", book });
  } catch (error) {
    next(error);
  }
}

async function updateBook(req, res, next) {
  try {
    const existing = await bookModel.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Book not found" });

    const allowed = {};
    ["title", "author", "isbn", "category", "status"].forEach(key => {
      if (req.body[key] !== undefined) allowed[key] = req.body[key];
    });
    if (req.body.quantity !== undefined) allowed.quantity = Number(req.body.quantity);

    const book = await bookModel.update(req.params.id, allowed);
    res.json({ message: "Book updated", book });
  } catch (error) {
    next(error);
  }
}

async function deleteBook(req, res, next) {
  try {
    const existing = await bookModel.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Book not found" });

    const active = await transactionModel.findActiveByBook(req.params.id);
    if (active) {
      return res.status(409).json({ message: "Cannot delete a borrowed book" });
    }

    await bookModel.remove(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (error) {
    next(error);
  }
}

async function searchBooks(req, res, next) {
  try {
    const q = (req.query.q || "").toLowerCase();
    const books = await bookModel.all();

    const result = books.filter(book =>
      book.title?.toLowerCase().includes(q) ||
      book.author?.toLowerCase().includes(q)
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function borrowBook(req, res, next) {
  try {
    const book = await bookModel.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.quantity < 1 || book.status === "borrowed") {
      return res.status(409).json({ message: "Book is not available" });
    }

    const activeUserTransaction = await transactionModel.byUser(req.user.userId);
    const alreadyBorrowed = activeUserTransaction.some(
      t => t.bookId === req.params.id && t.status === "active"
    );

    if (alreadyBorrowed) {
      return res.status(409).json({ message: "You already borrowed this book" });
    }

    const borrowDate = new Date();
    const dueDate = new Date(borrowDate);
    dueDate.setDate(dueDate.getDate() + 14);

    const transaction = await transactionModel.create({
      userId: req.user.userId,
      bookId: req.params.id,
      type: "borrow",
      borrowDate,
      returnDate: null,
      dueDate,
      status: "active"
    });

    const newQuantity = book.quantity - 1;
    await bookModel.update(req.params.id, {
      quantity: newQuantity,
      status: newQuantity > 0 ? "available" : "borrowed"
    });

    res.status(201).json({ message: "Book borrowed", transaction });
  } catch (error) {
    next(error);
  }
}

async function returnBook(req, res, next) {
  try {
    const book = await bookModel.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const transactions = await transactionModel.byUser(req.user.userId);
    const active = transactions.find(
      t => t.bookId === req.params.id && t.status === "active"
    );

    if (!active) {
      return res.status(404).json({ message: "No active borrowing found for this book" });
    }

    const returnDate = new Date();
    const status = returnDate > active.dueDate ? "overdue" : "returned";

    const updated = await transactionModel.update(active.transactionId, {
      type: "return",
      returnDate,
      status: "returned"
    });

    await bookModel.update(req.params.id, {
      quantity: Number(book.quantity || 0) + 1,
      status: "available"
    });

    res.json({
      message: status === "overdue"
        ? "Book returned late"
        : "Book returned",
      transaction: updated
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
  searchBooks,
  borrowBook,
  returnBook
};