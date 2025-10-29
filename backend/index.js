import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import communityRoutes from "./routes/community.js";
import profileRoutes from "./routes/profile.js";
import recommendationRoutes from "./routes/recommendation.js";

const app = express();
app.use(cors());
app.use(express.json());

// register routes
app.use("/api/auth", authRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/recommendation", recommendationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`[SERVER] Server running on port ${PORT}`));
