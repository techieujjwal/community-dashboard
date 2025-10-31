// middleware/checkRole.js
import { db } from "../services/firebase.js";
import { permissions } from "./permissions.js";

export const checkRole = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.uid;
      const { communityId } = req.params;

      if (!communityId) {
        return res.status(400).json({ error: "Missing community ID in params" });
      }

      const roleDoc = await db
        .collection("communities")
        .doc(communityId)
        .collection("roles")
        .doc(userId)
        .get();

      if (!roleDoc.exists) {
        return res.status(403).json({ error: "You are not a member of this community" });
      }

      const { role } = roleDoc.data();
      const rolePerms = permissions[role];

      if (!rolePerms || !rolePerms[requiredPermission]) {
        return res.status(403).json({ error: "Access denied: insufficient permissions" });
      }

      req.user.role = role;
      next();
    } catch (err) {
      console.error("Error in checkRole:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  };
};
