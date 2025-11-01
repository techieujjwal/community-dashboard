import { db } from "./firebase.js";
import {
  userSchema,
  communitySchema,
  eventSchema,
  roleSchema,
  analyticsSchema,
} from "../services/firestoreSchema.js";

// Utility function to add timestamps
const now = new Date();

async function setupFirestore() {
  try {
    console.log("[LOG]  Starting Firestore setup...");

    // Create a sample user
    const userRef = db.collection("users").doc("user_001");
    await userRef.set({
      ...userSchema,
      name: "Anushree",
      email: "anushree@example.com",
      createdAt: now,
      updatedAt: now,
    });
    console.log("[LOG] User created");

    // Create a sample community
    const communityRef = db.collection("communities").doc("community_001");
    await communityRef.set({
      ...communitySchema,
      name: "AI Learners Hub",
      description: "A community for AI enthusiasts",
      createdBy: "user_001",
      adminId: "user_001",
      createdAt: now,
    });
    console.log("[LOG] Community created");

    // Add default roles subcollection
    const roles = [
      {
        roleName: "admin",
        permissions: {
          canManageMembers: true,
          canAccessAnalytics: true,
          canEditPosts: true,
          canManageEvents: true,
        },
      },
      {
        roleName: "member",
        permissions: {
          canChat: true,
        },
      },
    ];

    for (const role of roles) {
      await communityRef.collection("roles").doc(role.roleName).set({
        ...roleSchema,
        ...role,
        createdAt: now,
      });
    }
    console.log("[LOG] Roles created");

    // Add a sample event
    await communityRef.collection("events").doc("event_001").set({
      ...eventSchema,
      title: "AI Workshop",
      description: "Intro to ML with Python",
      createdBy: "user_001",
      date: now,
      status: "upcoming",
    });
    console.log("[LOG] Event created");

    // Add analytics data
    await communityRef.collection("analytics").doc("2025-11-01").set({
      ...analyticsSchema,
      date: now,
      totalInteractions: 12,
      postCount: 3,
      eventCount: 1,
      memberActivity: {
        user_001: 7,
      },
    });
    console.log("[LOG] Analytics added");

    console.log("[DONE] Firestore setup completed!");
  } catch (error) {
    console.error("[FAIL] Error setting up Firestore:", error);
  }
}

setupFirestore();
