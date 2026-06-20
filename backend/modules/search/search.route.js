import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { searchController } from "./search.conroller.js";
const router = express.Router();

router.get("/", protect, asyncHandler(searchController));

export default router;
