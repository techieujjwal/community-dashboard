// backend/index.js
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

app.get("/", (req, res) => res.send("[SERVER] Backend running..."));

app.listen(5000, () => console.log("[SERVER] Server running on http://localhost:5000"));