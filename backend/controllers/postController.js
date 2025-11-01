//controllers/postController.js
import { db } from "../services/firebase.js";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, arrayUnion } from "firebase/firestore";

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { communityId, content, mediaURL } = req.body;
    if (!content) return res.status(400).json({ error: "Post content required" });

    const postRef = await addDoc(collection(db, "communities", communityId, "posts"), {
      authorId: req.user.uid,
      content,
      mediaURL: mediaURL || "",
      likes: 0,
      likedBy: [],
      createdAt: new Date(),
    });

    res.status(201).json({ success: true, id: postRef.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const { communityId } = req.params;
    const snapshot = await getDocs(collection(db, "communities", communityId, "posts"));
    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Like post
export const likePost = async (req, res) => {
  try {
    const { communityId, postId } = req.params;
    const userId = req.user.uid;
    const postRef = doc(db, "communities", communityId, "posts", postId);
    await updateDoc(postRef, {
      likedBy: arrayUnion(userId),
    });
    res.json({ success: true, message: "Post liked" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  try {
    const { communityId, postId } = req.params;
    await deleteDoc(doc(db, "communities", communityId, "posts", postId));
    res.json({ success: true, message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};