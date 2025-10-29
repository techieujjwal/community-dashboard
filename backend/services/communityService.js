import { db } from "./firebase.js";
import { collections, communitySchema } from "./firestoreSchema.js";

export async function createCommunity(req, res) {
  try {
    const userId = req.user.uid;
    const data = req.body;

    const newCommunity = {
      ...communitySchema,
      ...data,
      createdBy: userId,
      adminId: userId,
      createdAt: new Date(),
    };

    const ref = await db.collection(collections.COMMUNITIES).add(newCommunity);
    res.json({ id: ref.id, ...newCommunity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}