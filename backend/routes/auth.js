import express from "express";
import { db } from "../services/firebase.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// Verify and create/fetch user profile
router.post("/login", verifyToken, async (req, res) => {
  try {
    const { uid, email, name, picture } = req.user;

    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      // new user → create profile
      await userRef.set({
        email: email || "",
        name: name || "",
        photoURL: picture || "",
        role: "member",
        createdAt: new Date(),
      });
      console.log("Created new user:", uid);
    }

    const userData = (await userRef.get()).data();

    res.status(200).json({
      message: "Login verified",
      user: { uid, ...userData },
    });
  } catch (err) {
    console.error("Error in /login:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});

export default router;