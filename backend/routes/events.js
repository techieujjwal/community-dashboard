//routes/events.js
import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { createEvent, getEvents, updateEvent, deleteEvent } from "../controllers/eventController.js";

const router = express.Router();
router.post("/create", verifyToken, createEvent);
router.get("/:communityId", verifyToken, getEvents);
router.put("/:communityId/:eventId", verifyToken, updateEvent);
router.delete("/:communityId/:eventId", verifyToken, deleteEvent);
export default router;