//controllers/eventController.js
import { db, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "../services/firebase.js";

// Create new event
export const createEvent = async (req, res) => {
  try {
    const { communityId, title, description, date, assignedRoles } = req.body;

    if (!communityId || !title)
      return res.status(400).json({ error: "Community ID and title are required" });

    const eventRef = await addDoc(collection(db, "communities", communityId, "events"), {
      title,
      description,
      date: new Date(date),
      createdBy: req.user.uid,
      assignedRoles: assignedRoles || {},
      attendees: [],
      visibility: "public",
      status: "upcoming",
      createdAt: new Date(),
    });

    res.status(201).json({ success: true, id: eventRef.id });
  } catch (err) {
    console.error("[ERROR] Creating event:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get all events
export const getEvents = async (req, res) => {
  try {
    const { communityId } = req.params;
    const snapshot = await getDocs(collection(db, "communities", communityId, "events"));
    const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, data: events });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update event
export const updateEvent = async (req, res) => {
  try {
    const { communityId, eventId } = req.params;
    const updates = req.body;
    const eventRef = doc(db, "communities", communityId, "events", eventId);
    await updateDoc(eventRef, updates);
    res.json({ success: true, message: "Event updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const { communityId, eventId } = req.params;
    await deleteDoc(doc(db, "communities", communityId, "events", eventId));
    res.json({ success: true, message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};