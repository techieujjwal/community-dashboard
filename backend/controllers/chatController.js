// backend/controllers/chatController.js
import { db } from "../services/firebase.js";

/**
 * Create a new chat message
 * POST /chats/send
 * Body: { receiverId, message }
 */
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user.uid;
    const { receiverId, message } = req.body;

    if (!receiverId || !message)
      return res.status(400).json({ success: false, error: "Missing fields" });

    const chatData = {
      senderId,
      receiverId,
      message,
      timestamp: new Date().toISOString(),
    };

    const chatRef = await db.collection("chats").add(chatData);

    res.json({
      success: true,
      message: "Message sent successfully",
      chatId: chatRef.id,
      data: chatData,
    });
  } catch (err) {
    console.error("[ERROR] Sending message:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * Get all messages between two users
 * GET /chats/:receiverId
 */
export const getMessages = async (req, res) => {
  try {
    const senderId = req.user.uid;
    const { receiverId } = req.params;

    const snapshot = await db
      .collection("chats")
      .where("senderId", "in", [senderId, receiverId])
      .where("receiverId", "in", [senderId, receiverId])
      .orderBy("timestamp", "asc")
      .get();

    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({ success: true, messages });
  } catch (err) {
    console.error("[ERROR] Fetching messages:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * Delete a chat message
 * DELETE /chats/:chatId
 */
export const deleteMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chatRef = db.collection("chats").doc(chatId);

    const chatDoc = await chatRef.get();
    if (!chatDoc.exists)
      return res.status(404).json({ success: false, error: "Message not found" });

    const chatData = chatDoc.data();
    if (chatData.senderId !== req.user.uid)
      return res.status(403).json({ success: false, error: "Unauthorized" });

    await chatRef.delete();

    res.json({ success: true, message: "Message deleted successfully" });
  } catch (err) {
    console.error("[ERROR] Deleting message:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * Get all user conversations (distinct users you’ve chatted with)
 * GET /chats/conversations
 */
export const getConversations = async (req, res) => {
  try {
    const userId = req.user.uid;

    const snapshot = await db
      .collection("chats")
      .where("senderId", "==", userId)
      .get();

    const receiverIds = new Set(snapshot.docs.map((doc) => doc.data().receiverId));

    res.json({ success: true, conversations: Array.from(receiverIds) });
  } catch (err) {
    console.error("[ERROR] Fetching conversations:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
