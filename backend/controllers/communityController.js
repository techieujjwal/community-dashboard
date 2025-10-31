// communityService.js
import { admin } from "../services/firebase.js";
const db = admin.firestore();

// Get all communities
export const getAllCommunities = async (req, res) => {
  try {
    const snapshot = await db.collection("communities").get();
    const communities = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, data: communities });
  } catch (err) {
    console.error("[ERROR] Fetching communities:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Create new community
export const createCommunity = async (req, res) => {
  try {
    const { name, description } = req.body;
    const createdBy = req.user?.uid;

    if (!name) {
      return res.status(400).json({ success: false, error: "Community name is required" });
    }

    const docRef = await db.collection("communities").add({
      name,
      description: description || "",
      createdBy,
      members: [createdBy],
      createdAt: new Date().toISOString(),
      activityLogs: []
    });

    res.status(201).json({ success: true, id: docRef.id });
  } catch (err) {
    console.error("[ERROR] Creating community:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Edit community details
export const editCommunity = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const docRef = db.collection("communities").doc(id);
    await docRef.update({
      ...(name && { name }),
      ...(description && { description }),
      updatedAt: new Date().toISOString()
    });

    res.json({ success: true, message: "Community updated successfully" });
  } catch (err) {
    console.error("[ERROR] Editing community:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Log member interaction with dashboard
// export const logCommunityInteraction = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user?.uid;

//     const docRef = db.collection("communities").doc(id);
//     const communitySnap = await docRef.get();

//     if (!communitySnap.exists) {
//       return res.status(404).json({ success: false, error: "Community not found" });
//     }

//     const logEntry = {
//       userId,
//       timestamp: new Date().toISOString(),
//       action: "Viewed Dashboard"
//     };

//     await docRef.update({
//       activityLogs: admin.firestore.FieldValue.arrayUnion(logEntry)
//     });

//     res.json({ success: true, message: "Interaction logged successfully" });
//   } catch (err) {
//     console.error("[ERROR] Logging interaction:", err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

// Get community analytics (auto logs interaction)
export const getCommunityAnalytics = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.uid;

    const docRef = db.collection("communities").doc(id);
    const communitySnap = await docRef.get();

    if (!communitySnap.exists) {
      return res.status(404).json({ success: false, error: "Community not found" });
    }

    const community = communitySnap.data();

    const logEntry = {
      userId,
      timestamp: new Date().toISOString(),
      action: "Viewed Dashboard"
    };

    await docRef.update({
      activityLogs: admin.firestore.FieldValue.arrayUnion(logEntry)
    });

    const analytics = {
      totalMembers: community.members?.length || 0,
      totalInteractions: (community.activityLogs?.length || 0) + 1,
      memberInteractions: community.activityLogs?.reduce((acc, log) => {
        acc[log.userId] = (acc[log.userId] || 0) + 1;
        return acc;
      }, { [userId]: ((community.activityLogs?.filter(l => l.userId === userId).length || 0) + 1) }) || {},
      recentActivity: [...(community.activityLogs || []), logEntry].slice(-5).reverse()
    };

    res.json({ success: true, data: analytics });
  } catch (err) {
    console.error("[ERROR] Fetching analytics:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
