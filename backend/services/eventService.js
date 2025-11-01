import { db } from "./firebase.js";

/**
 * Create a new event inside a community
 */
export async function createEvent(communityId, { title, description, date, createdBy, assignedRoles, visibility }) {
  const eventRef = db
    .collection("communities")
    .doc(communityId)
    .collection("events")
    .doc();

  const newEvent = {
    title,
    description,
    date: new Date(date),
    createdBy,
    assignedRoles: assignedRoles || {},
    attendees: [],
    visibility: visibility || "public",
    status: "upcoming",
    createdAt: new Date().toISOString(),
  };

  await eventRef.set(newEvent);
  return { id: eventRef.id, ...newEvent };
}

/**
 * Fetch all events of a community
 */
export async function getCommunityEvents(communityId) {
  const snapshot = await db
    .collection("communities")
    .doc(communityId)
    .collection("events")
    .get();

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

/**
 * RSVP or attend an event
 */
export async function addAttendee(communityId, eventId, userId) {
  const eventRef = db
    .collection("communities")
    .doc(communityId)
    .collection("events")
    .doc(eventId);

  await eventRef.update({
    attendees: admin.firestore.FieldValue.arrayUnion(userId),
  });
  return { success: true };
}

/**
 * Update event status (e.g., mark as completed)
 */
export async function updateEventStatus(communityId, eventId, status) {
  const eventRef = db
    .collection("communities")
    .doc(communityId)
    .collection("events")
    .doc(eventId);

  await eventRef.update({ status });
  return { success: true };
}
