import express from "express";
import { db } from "../services/firebase.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Verify and create/fetch user profile
router.post("/login", verifyToken, async (req, res) => {
  try {
    console.log("[LOG] /login route triggered");

    const { uid, email, name, picture } = req.user;

    console.log(`[LOG] User details extracted from token: UID=${uid}, Email=${email}`);

    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      console.log("[LOG] New user detected, creating profile in Firestore...");

      // new user → create profile
      await userRef.set({
        email: email || "",
        name: name || "",
        photoURL: picture || "",
        role: "member",
        createdAt: new Date(),
      });
      console.log(`[LOG] Profile created successfully for UID=${uid}`);
    } else {
      console.log("[LOG] Existing user found, skipping profile creation");
    }

    const userData = (await userRef.get()).data();
    console.log(`[LOG] Login successful for ${email}`);

    res.status(200).json({
      message: "Login verified",
      user: { uid, ...userData },
    });
  } catch (err) {
    console.error("[ERROR] /login route failed:", err.message);
    res.status(500).json({ error: "Server error during login" });
  }
});

export default router;