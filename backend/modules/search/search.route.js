import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { searchController } from "./search.controller.js";
import { searchLimiter } from "../../utils/rateLimiter.js";
const router = express.Router();

router.get("/", searchLimiter, protect, asyncHandler(searchController));

export default router;
