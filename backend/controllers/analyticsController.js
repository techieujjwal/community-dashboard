//controllers/analyticsController.js
import { db, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "../services/firebase.js";

// Get overall community analytics (for admin dashboard)
export const getCommunityAnalytics = async (req, res) => {
  try {
    const { id } = req.params;
    const communityRef = doc(db, "communities", id);
    const communitySnap = await getDoc(communityRef);

    if (!communitySnap.exists()) {
      return res.status(404).json({ success: false, error: "Community not found" });
    }

    // Fetch analytics subcollection
    const analyticsSnap = await getDocs(collection(communityRef, "analytics"));
    const analyticsData = analyticsSnap.docs.map(d => d.data());

    // Aggregate analytics for charts
    const totalInteractions = analyticsData.reduce((sum, a) => sum + (a.totalInteractions || 0), 0);
    const postCount = analyticsData.reduce((sum, a) => sum + (a.postCount || 0), 0);
    const eventCount = analyticsData.reduce((sum, a) => sum + (a.eventCount || 0), 0);

    // Build member activity map
    const memberActivity = {};
    analyticsData.forEach(a => {
      Object.entries(a.memberActivity || {}).forEach(([uid, count]) => {
        memberActivity[uid] = (memberActivity[uid] || 0) + count;
      });
    });

    res.json({
      success: true,
      data: {
        totalInteractions,
        postCount,
        eventCount,
        memberActivity,
        analyticsOverTime: analyticsData.sort((a, b) => new Date(a.date) - new Date(b.date)),
      },
    });
  } catch (err) {
    console.error("[ERROR] Fetching community analytics:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};