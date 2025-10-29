import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import checkRole from "../middlewares/checkRole.js";
import { createCommunity, joinCommunity, searchCommunities } from "../services/communityService.js";

const router = express.Router();

router.post("/create", verifyToken, createCommunity);
router.post("/:communityId/join", verifyToken, joinCommunity);
router.get("/search", verifyToken, searchCommunities);

export default router;