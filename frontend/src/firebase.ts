// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCKjLAfhnIeo5b8FROjftcA27Bc-UIoGgw",
  authDomain: "community-hub-fa67e.firebaseapp.com",
  projectId: "community-hub-fa67e",
  storageBucket: "community-hub-fa67e.firebasestorage.app",
  messagingSenderId: "265402271863",
  appId: "1:265402271863:web:8e207bc54d74b4934b9e72",
  measurementId: "G-XQM2XEVXX6"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);