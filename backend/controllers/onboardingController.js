import { admin } from "../services/firebase.js";
const db = admin.firestore();

// Save onboarding info
export const saveOnboarding = async (req, res) => {
  try {
    const userId = req.user?.uid;
    const { work, college, name, description, memberCap, roles, chatEnabled } = req.body;

    if (!userId || !name) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const communityRef = await db.collection("communities").add({
      createdBy: userId,
      name,
      description,
      work,
      college,
      memberCap,
      roles,
      chatEnabled,
      members: [userId],
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({ success: true, id: communityRef.id });
  } catch (err) {
    console.error("[ERROR] Saving onboarding:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
