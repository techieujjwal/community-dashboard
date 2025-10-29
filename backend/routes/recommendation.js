import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { getRecommendations } from "../services/recommendationService.js";

const router = express.Router();

router.get("/", verifyToken, getRecommendations);

export default router;