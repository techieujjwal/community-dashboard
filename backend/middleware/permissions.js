import { db } from "../services/firebase.js";

export function checkRole(requiredRoles) {
  return async (req, res, next) => {
    try {
      const { id } = req.params; // community ID
      const userId = req.body.userId || req.user?.uid;

      if (!userId) {
        return res.status(401).json({ error: "Unauthorized: No user ID provided" });
      }

      const doc = await db.collection("communities").doc(id).get();
      if (!doc.exists) {
        return res.status(404).json({ error: "Community not found" });
      }

      const data = doc.data();
      const userRole = data.roles?.[userId];

      if (!userRole || !requiredRoles.includes(userRole)) {
        return res.status(403).json({ error: "Access denied: insufficient permissions" });
      }

      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
