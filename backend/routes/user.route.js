import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { followUserController } from "../controllers/user.controller.js";

const router = express.Router();
router.post("/:id/follow", protect, asyncHandler(followUserController));

export default router;
