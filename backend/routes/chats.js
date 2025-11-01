//routes/chats.js
import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { sendMessage, getMessages } from "../controllers/chatController.js";

const router = express.Router();
router.post("/send", verifyToken, sendMessage);
router.get("/:communityId", verifyToken, getMessages);
export default router;
