//middleware/logActivity.js
// middleware/logActivity.js
import { db } from "../services/firebase.js";

export const logActivity = (activityType) => {
  return async (req, res, next) => {
    try {
      const { uid } = req.user;
      const log = {
        userId: uid,
        activityType, // e.g. "POST_CREATED", "EVENT_JOINED"
        timestamp: new Date(),
        details: req.body || {},
      };
      await db.collection("activityLogs").add(log);
      next();
    } catch (err) {
      console.error("Activity logging failed:", err);
      next(); // Don’t block request even if logging fails
    }
  };
};
