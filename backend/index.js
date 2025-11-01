import express from "express";
import cors from "cors";
import communityRoutes from "./routes/community.js";
import eventRoutes from "./routes/events.js";

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // frontend origin
  credentials: true,
}));
app.use(express.json());

// Routes
app.use("/api/communities", communityRoutes);
app.use("/api/events", eventRoutes);

// Health Check Route
app.get("/", (req, res) => res.send("[SERVER] Community Engagement Hub Backend is running"));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`[SERVER] Running on http://localhost:${PORT}`));