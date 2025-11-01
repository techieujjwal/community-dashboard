import { db } from "./firebase.js";
import admin from "firebase-admin";
const FieldValue = admin.firestore.FieldValue;

// Create a new community
export async function createCommunity({ name, description, createdBy }) {
  const communityRef = db.collection("communities").doc();
  const newCommunity = {
    name,
    description,
    createdBy,
    createdAt: new Date().toISOString(),
    members: [createdBy],
    roles: { [createdBy]: "admin" }, // creator becomes admin
    activityLogs: [],
  };
  await communityRef.set(newCommunity);
  return { id: communityRef.id, ...newCommunity };
}

// Fetch all communities
export async function getAllCommunities() {
  const snapshot = await db.collection("communities").get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Fetch a single community
export async function getCommunityById(id) {
  const doc = await db.collection("communities").doc(id).get();
  if (!doc.exists) throw new Error("Community not found");
  return { id: doc.id, ...doc.data() };
}

// Add member to a community
export async function addMember(communityId, userId) {
  const communityRef = db.collection("communities").doc(communityId);
  await communityRef.update({
    members: FieldValue.arrayUnion(userId),
  });
  return { success: true };
}

// Log an activity
export async function logActivity(communityId, { userId, action, description }) {
  const communityRef = db.collection("communities").doc(communityId);
  const logEntry = {
    userId,
    action,
    description,
    timestamp: new Date().toISOString(),
  };
  await communityRef.update({
    activityLogs: FieldValue.arrayUnion(logEntry),
  });
  return { success: true };
}
