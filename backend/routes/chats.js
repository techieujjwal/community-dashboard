import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  sendMessage,
  getMessages,
  deleteMessage,
  getConversations,
} from "../controllers/chatController.js";

const router = express.Router();

// Send message
router.post("/send", verifyToken, sendMessage);

// Get chat between two users
router.get("/:receiverId", verifyToken, getMessages);

// Delete message
router.delete("/:chatId", verifyToken, deleteMessage);

// Get list of conversations
router.get("/", verifyToken, getConversations);

export default router;
