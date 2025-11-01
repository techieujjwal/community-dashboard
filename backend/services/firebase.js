// services/firebase.js
import admin from "firebase-admin";
import dotenv from "dotenv";
import serviceAccount from "../config/serviceAccountKey.json" assert { type: "json" };

dotenv.config();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
const auth = admin.auth();

// Create wrapper functions that mimic firebase/firestore modular API
const collection = (dbRef, name) => dbRef.collection(name);
const doc = (dbRef, collectionName, id) => dbRef.collection(collectionName).doc(id);

const addDoc = async (colRef, data) => colRef.add(data);
const getDocs = async (colRef) => {
  const snapshot = await colRef.get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
const getDoc = async (docRef) => {
  const snapshot = await docRef.get();
  return { id: docRef.id, exists: snapshot.exists, data: () => snapshot.data() };
};
const updateDoc = async (docRef, data) => docRef.update(data);
const deleteDoc = async (docRef) => docRef.delete();
const arrayUnion = (...values) => admin.firestore.FieldValue.arrayUnion(...values);

export {
  db,
  auth,
  admin,
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
};
