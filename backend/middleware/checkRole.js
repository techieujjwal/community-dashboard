import { db } from "../services/firebase.js";

export default function checkRole(requiredRole) {
  return async (req, res, next) => {
    const { communityId } = req.params;
    const userId = req.user.uid;

    const memberQuery = await db.collection("members")
      .where("communityId", "==", communityId)
      .where("userId", "==", userId)
      .limit(1)
      .get();

    if (memberQuery.empty) return res.status(403).json({ message: "Not a member" });
    const member = memberQuery.docs[0].data();

    if (member.role !== requiredRole && requiredRole === "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    next();
  };
}