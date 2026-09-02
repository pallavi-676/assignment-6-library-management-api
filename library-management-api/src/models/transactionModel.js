const { db } = require("../config/firebase");

const transactions = db.collection("transactions");

async function create(data) {
  const ref = await transactions.add(data);
  return { transactionId: ref.id, ...data };
}

async function findById(transactionId) {
  const doc = await transactions.doc(transactionId).get();
  if (!doc.exists) return null;
  return { transactionId: doc.id, ...doc.data() };
}

async function findActiveByBook(bookId) {
  const snapshot = await transactions
    .where("bookId", "==", bookId)
    .where("status", "==", "active")
    .limit(1)
    .get();

  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { transactionId: doc.id, ...doc.data() };
}

async function byUser(userId) {
  const snapshot = await transactions.where("userId", "==", userId).get();
  return snapshot.docs.map(doc => ({ transactionId: doc.id, ...doc.data() }));
}

async function all() {
  const snapshot = await transactions.get();
  return snapshot.docs.map(doc => ({ transactionId: doc.id, ...doc.data() }));
}

async function update(transactionId, data) {
  await transactions.doc(transactionId).update(data);
  return findById(transactionId);
}

module.exports = { create, findById, findActiveByBook, byUser, all, update };