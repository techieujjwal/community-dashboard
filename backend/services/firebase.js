import dotenv from "dotenv";
dotenv.config();

import admin from "firebase-admin";

import fs from "fs";

const serviceAccount = JSON.parse(
  fs.readFileSync(new URL("./firebaseServiceAccount.json", import.meta.url))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export { admin, db };