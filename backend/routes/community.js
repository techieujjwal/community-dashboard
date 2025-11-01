import express from "express";
import {
  createCommunity,
  getAllCommunities,
  getCommunityById,
  addMember,
  logActivity,
} from "../services/communityService.js";
import { checkRole } from "../middleware/permissions.js";

const router = express.Router();

// Admin only — Create community
router.post("/", async (req, res) => {
  try {
    const { name, description, createdBy } = req.body;
    const community = await createCommunity({ name, description, createdBy });
    res.status(201).json(community);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Public — View all communities
router.get("/", async (_, res) => {
  try {
    const communities = await getAllCommunities();
    res.json(communities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Public — View single community
router.get("/:id", async (req, res) => {
  try {
    const community = await getCommunityById(req.params.id);
    res.json(community);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Moderator/Admin — Add member
router.post("/:id/members", checkRole(["admin", "moderator"]), async (req, res) => {
  try {
    await addMember(req.params.id, req.body.userId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Member/Admin — Log activity
router.post("/:id/logs", checkRole(["admin", "member", "moderator"]), async (req, res) => {
  try {
    await logActivity(req.params.id, req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;