import express from "express";
import {
  createEvent,
  getCommunityEvents,
  addAttendee,
  updateEventStatus,
} from "../services/eventService.js";
import { checkRole } from "../middleware/permissions.js";

const router = express.Router({ mergeParams: true });

// 🟢 Admin/Moderator — create new event
router.post("/", checkRole(["admin", "moderator"]), async (req, res) => {
  try {
    const { id: communityId } = req.params;
    const event = await createEvent(communityId, req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🟢 Public — get all events for a community
router.get("/", async (req, res) => {
  try {
    const { id: communityId } = req.params;
    const events = await getCommunityEvents(communityId);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🟣 Members — RSVP / attend event
router.post("/:eventId/attend", checkRole(["member", "admin", "moderator"]), async (req, res) => {
  try {
    const { id: communityId, eventId } = req.params;
    const { userId } = req.body;
    const result = await addAttendee(communityId, eventId, userId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔵 Admin — update event status (e.g., completed)
router.patch("/:eventId/status", checkRole(["admin"]), async (req, res) => {
  try {
    const { id: communityId, eventId } = req.params;
    const { status } = req.body;
    const result = await updateEventStatus(communityId, eventId, status);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
