const express = require("express");
const router = express.Router();

const controller = require("../controllers/bookController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const validator = require("../middleware/validator");
const {
  bookValidation,
  idValidation,
  searchValidation
} = require("../utils/validation");

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 */
router.get("/", auth, controller.getBooks);

/**
 * @swagger
 * /api/books/search:
 *   get:
 *     summary: Search books by title or author
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema: {type: string}
 */
router.get("/search", auth, searchValidation, validator, controller.searchBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get one book
 *     tags: [Books]
 */
router.get("/:id", auth, idValidation, validator, controller.getBook);

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Add a book (librarian only)
 *     tags: [Books]
 *     security: [{bearerAuth: []}]
 */
router.post(
  "/",
  auth,
  role("librarian"),
  bookValidation,
  validator,
  controller.addBook
);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book (librarian only)
 *     tags: [Books]
 *     security: [{bearerAuth: []}]
 */
router.put(
  "/:id",
  auth,
  role("librarian"),
  idValidation,
  validator,
  controller.updateBook
);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book (librarian only)
 *     tags: [Books]
 *     security: [{bearerAuth: []}]
 */
router.delete(
  "/:id",
  auth,
  role("librarian"),
  idValidation,
  validator,
  controller.deleteBook
);

/**
 * @swagger
 * /api/books/{id}/borrow:
 *   post:
 *     summary: Borrow a book (student only)
 *     tags: [Borrow and Return]
 *     security: [{bearerAuth: []}]
 */
router.post(
  "/:id/borrow",
  auth,
  role("student"),
  idValidation,
  validator,
  controller.borrowBook
);

/**
 * @swagger
 * /api/books/{id}/return:
 *   post:
 *     summary: Return a book (student only)
 *     tags: [Borrow and Return]
 *     security: [{bearerAuth: []}]
 */
router.post(
  "/:id/return",
  auth,
  role("student"),
  idValidation,
  validator,
  controller.returnBook
);

module.exports = router;