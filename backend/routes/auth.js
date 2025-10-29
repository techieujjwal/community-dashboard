import express from "express";
import { auth } from "../services/firebase.js";

const router = express.Router();

router.post("/verify", async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = await auth.verifyIdToken(token);
    res.json({ uid: decoded.uid, email: decoded.email });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

export default router;