import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getAllCommunities,
  createCommunity,
  editCommunity,
  logCommunityInteraction,
  getCommunityAnalytics
} from "../controllers/communityController.js";

const router = express.Router();

router.get("/", verifyToken, getAllCommunities);
router.post("/create", verifyToken, createCommunity);
router.put("/edit/:id", verifyToken, editCommunity);
router.post("/:id/interact", verifyToken, logCommunityInteraction);
router.get("/analytics/:id", verifyToken, getCommunityAnalytics);

export default router;
