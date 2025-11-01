//routes/analytics.js
import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getCommunityAnalytics } from "../controllers/analyticsController.js";

const router = express.Router();
router.get("/:id", verifyToken, getCommunityAnalytics);
export default router;