import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import communityRoutes from "./routes/community.js";

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",  // frontend URL
  credentials: true,
}));
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/community", communityRoutes);
app.use("/profile", profileRoutes);

// Default route
app.get("/", (req, res) => res.send("[SERVER] Backend running..."));

// Start server
app.listen(5000, () => console.log("[SERVER] Server running on http://localhost:5000"));