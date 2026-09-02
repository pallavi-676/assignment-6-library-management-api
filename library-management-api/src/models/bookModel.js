const { db } = require("../config/firebase");

const books = db.collection("books");

async function create(data) {
  const ref = await books.add(data);
  return { bookId: ref.id, ...data };
}

async function findById(bookId) {
  const doc = await books.doc(bookId).get();
  if (!doc.exists) return null;
  return { bookId: doc.id, ...doc.data() };
}

async function all() {
  const snapshot = await books.get();
  return snapshot.docs.map(doc => ({ bookId: doc.id, ...doc.data() }));
}

async function update(bookId, data) {
  await books.doc(bookId).update(data);
  return findById(bookId);
}

async function remove(bookId) {
  await books.doc(bookId).delete();
}

module.exports = { create, findById, all, update, remove };