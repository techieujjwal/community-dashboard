import express from "express";
import cors from "cors";

// Route Imports
import authRoutes from "./routes/auth.js";
import communityRoutes from "./routes/community.js";
import profileRoutes from "./routes/profile.js";
import analyticsRoutes from "./routes/analytics.js";
import eventRoutes from "./routes/events.js";
import postRoutes from "./routes/posts.js";
import chatRoutes from "./routes/chats.js";

// Middleware Imports
import { errorHandler } from "./middleware/errorHandler.js";
import { verifyToken } from "./middleware/verifyToken.js"; // for protected global routes

// Initialize App
const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // frontend origin
  credentials: true,
}));
app.use(express.json());

// Base Routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/community", communityRoutes);
app.use("/analytics", verifyToken, analyticsRoutes); // protected by token
app.use("/events", verifyToken, eventRoutes);
app.use("/posts", verifyToken, postRoutes);
app.use("/chat", verifyToken, chatRoutes);

// Health Check Route
app.get("/", (req, res) => res.send("[SERVER] Community Engagement Hub Backend is running"));

// Global Error Handler (after all routes)
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`[SERVER] Running on http://localhost:${PORT}`));
