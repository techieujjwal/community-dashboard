// routes/role.js
import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { checkRole } from "../middleware/checkRole.js";
import { db } from "../services/firebase.js";

const router = express.Router();

router.post("/:communityId/assign", verifyToken, checkRole("canManageRoles"), async (req, res) => {
  try {
    const { communityId } = req.params;
    const { targetUserId, role } = req.body;

    await db.collection("communities").doc(communityId)
      .collection("roles")
      .doc(targetUserId)
      .set({
        userId: targetUserId,
        role,
        updatedAt: new Date(),
      }, { merge: true });

    res.json({ message: `Role '${role}' assigned successfully to ${targetUserId}` });
  } catch (err) {
    console.error("Error assigning role:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/:communityId/members", verifyToken, checkRole("canManageMembers"), async (req, res) => {
  try {
    const { communityId } = req.params;
    const snapshot = await db
      .collection("communities")
      .doc(communityId)
      .collection("roles")
      .get();

    const members = snapshot.docs.map((doc) => doc.data());
    res.json({ members });
  } catch (err) {
    console.error("Error fetching members:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
