import { db } from "./firebase.js";

export async function getRecommendations(req, res) {
  try {
    const user = req.user;
    const query = await db.collection("communities")
      .where("collegeOrWork", "==", user.collegeOrWork)
      .where("visibility", "==", "public")
      .limit(5)
      .get();

    const communities = query.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json({ recommendations: communities });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}