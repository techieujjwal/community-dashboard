//routes/posts.js
import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { createPost, getPosts, likePost, deletePost } from "../controllers/postController.js";

const router = express.Router();
router.post("/create", verifyToken, createPost);
router.get("/:communityId", verifyToken, getPosts);
router.put("/:communityId/:postId/like", verifyToken, likePost);
router.delete("/:communityId/:postId", verifyToken, deletePost);
export default router;