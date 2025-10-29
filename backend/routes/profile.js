import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { db } from "../services/firebase.js";
import { collections, userSchema } from "../services/firestoreSchema.js";

const router = express.Router();

router.post("/setup", verifyToken, async (req, res) => {
  const userId = req.user.uid;
  const { name, bio, photoURL } = req.body;

  const newUser = {
    ...userSchema,
    name,
    bio,
    photoURL,
    email: req.user.email,
    updatedAt: new Date(),
  };

  await db.collection(collections.USERS).doc(userId).set(newUser);
  res.json({ message: "Profile saved", user: newUser });
});

export default router;