import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { db } from "../services/firebase.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const router = express.Router();

// GET /profile/me → Get logged-in user's profile
router.get("/me", verifyToken, async (req, res) => {
  try {
    const { uid } = req.user;
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.json({ success: true, user: { uid, ...userSnap.data() } });
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

    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, updates);

    res.json({ success: true, message: "Profile updated successfully" });
  } catch (err) {
    console.error("[ERROR] Updating profile:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
