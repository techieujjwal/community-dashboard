// services/communityService.js
import { db } from "./firebase.js";
import { FieldValue } from "firebase-admin/firestore";

export const createCommunity = async (userId, data) => {
  const { name, college, work, purpose, isPrivate } = data;
  const communityRef = db.collection("communities").doc();

  const communityData = {
    id: communityRef.id,
    name,
    college,
    work,
    purpose,
    isPrivate,
    createdBy: userId,
    createdAt: FieldValue.serverTimestamp(),
  };

  await communityRef.set(communityData);

  // Add creator as admin in subcollection "roles"
  await communityRef.collection("roles").doc(userId).set({
    userId,
    role: "admin",
    joinedAt: FieldValue.serverTimestamp(),
  });

  return communityData;
};

export const joinCommunity = async (userId, communityId) => {
  const communityRef = db.collection("communities").doc(communityId);
  const doc = await communityRef.get();

  if (!doc.exists) throw new Error("Community not found");

  const community = doc.data();
  if (community.isPrivate) {
    throw new Error("Private community – request pending admin approval");
  }

  await communityRef.collection("roles").doc(userId).set({
    userId,
    role: "member",
    joinedAt: FieldValue.serverTimestamp(),
  });

  return { message: "Joined community successfully", communityId };
};

export const getUserCommunities = async (userId) => {
  const snapshot = await db.collectionGroup("roles").where("userId", "==", userId).get();
  const communities = [];

  for (const doc of snapshot.docs) {
    const communityRef = doc.ref.parent.parent; // go up from roles subcollection
    const communitySnap = await communityRef.get();
    if (communitySnap.exists) {
      communities.push(communitySnap.data());
    }
  }

  return communities;
};

export const searchCommunities = async (query) => {
  const snapshot = await db
    .collection("communities")
    .where("isPrivate", "==", false)
    .get();

  const results = [];
  snapshot.forEach((doc) => {
    const c = doc.data();
    const q = query.toLowerCase();
    if (
      c.name.toLowerCase().includes(q) ||
      c.purpose.toLowerCase().includes(q) ||
      (c.college && c.college.toLowerCase().includes(q))
    ) {
      results.push(c);
    }
  });

  return results;
};
