import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    const { uid, email, name } = req.user;
    res.status(200).json({
      message: "Dashboard content fetched successfully",
      user: { uid, email, name },
    });
  } catch (err) {
    console.error("[ERROR] /dashboard route:", err.message);
    res.status(500).json({ error: "Failed to fetch dashboard content" });
  }
});

export default router;
