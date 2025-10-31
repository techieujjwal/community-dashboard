import { db } from "../services/firebase.js";
import { doc, getDoc } from "firebase/firestore";

export const getUserProfile = async (req, res) => {
  try {
    const uid = req.user?.uid; // comes from verifyToken
    if (!uid) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return res.status(404).json({ success: false, error: "User profile not found" });
    }

    const userData = userSnap.data();
    res.json({ success: true, data: userData });
  } catch (err) {
    console.error("[ERROR] Fetching user profile:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
