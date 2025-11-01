import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { saveOnboarding } from "../controllers/onboardingController.js";

const router = express.Router();

router.post("/", verifyToken, saveOnboarding);

export default router;
