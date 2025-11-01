// import express from "express";
// import cors from "cors";

// // Route Imports
// import authRoutes from "./routes/auth.js";
// import communityRoutes from "./routes/community.js";
// import profileRoutes from "./routes/profile.js";
// import analyticsRoutes from "./routes/analytics.js";
// import eventRoutes from "./routes/events.js";
// import postRoutes from "./routes/posts.js";
// import chatRoutes from "./routes/chats.js";
// import dashboardRoutes from "./routes/dashboard.js"
// import onboardingRoutes from "./routes/onboarding.js";

// // Middleware Imports
// import { errorHandler } from "./middleware/errorHandler.js";
// import { verifyToken } from "./middleware/verifyToken.js"; // for protected global routes

// // Initialize App
// const app = express();

// // Middleware
// app.use(cors({
//   origin: "http://localhost:5173", // frontend origin
//   credentials: true,
// }));
// app.use(express.json());

// // Base Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/profile", profileRoutes);
// app.use("/api/community", communityRoutes);
// app.use("/api/analytics", verifyToken, analyticsRoutes); // protected by token
// app.use("/api/events", verifyToken, eventRoutes);
// app.use("/api/posts", verifyToken, postRoutes);
// app.use("/api/chat", verifyToken, chatRoutes);
// app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/onboarding", onboardingRoutes);

// // Health Check Route
// app.get("/", (req, res) => res.send("[SERVER] Community Engagement Hub Backend is running"));

// // Global Error Handler (after all routes)
// app.use(errorHandler);

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`[SERVER] Running on http://localhost:${PORT}`));
import express from "express";
import communityRoutes from "./routes/community.js";
import eventRoutes from "./routes/events.js";

const app = express();
app.use(express.json());

app.use("/api/communities", communityRoutes);
app.use("/api/communities/:id/events", eventRoutes);

app.listen(5000, () => console.log("[SERVER] Server running on port 5000"));
