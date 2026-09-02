const { db } = require("../config/firebase");

const users = db.collection("users");

async function findByEmail(email) {
  const snapshot = await users.where("email", "==", email.toLowerCase()).limit(1).get();
  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return { userId: doc.id, ...doc.data() };
}

async function findById(userId) {
  const doc = await users.doc(userId).get();
  if (!doc.exists) return null;
  return { userId: doc.id, ...doc.data() };
}

async function create(data) {
  const ref = await users.add(data);
  return { userId: ref.id, ...data };
}

async function update(userId, data) {
  await users.doc(userId).update(data);
  return findById(userId);
}

async function remove(userId) {
  await users.doc(userId).delete();
}

async function all() {
  const snapshot = await users.get();
  return snapshot.docs.map(doc => ({ userId: doc.id, ...doc.data() }));
}

module.exports = { findByEmail, findById, create, update, remove, all };