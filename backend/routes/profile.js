// backend/routes/profile.js
import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { db } from "../services/firebase.js";

const router = express.Router();

// GET /profile/me → Fetch logged-in user's profile
router.get("/me", verifyToken, async (req, res) => {
  try {
    const { uid } = req.user;
    const userDoc = await db.collection("users").doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.json({ success: true, user: { uid, ...userDoc.data() } });
  } catch (err) {
    console.error("[ERROR] Fetching profile:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /profile/update → Update logged-in user's profile
router.put("/update", verifyToken, async (req, res) => {
  try {
    const { uid } = req.user;
    const updates = req.body;

    await db.collection("users").doc(uid).update(updates);

    res.json({ success: true, message: "Profile updated successfully" });
  } catch (err) {
    console.error("[ERROR] Updating profile:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;