// services/firebase.js
import admin from "firebase-admin";
import dotenv from "dotenv";
import serviceAccount from "../config/serviceAccountKey.json" assert { type: "json" };

dotenv.config();

// Initialize Firebase Admin only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Export initialized services
export const db = admin.firestore();
export const auth = admin.auth();
export { admin };
