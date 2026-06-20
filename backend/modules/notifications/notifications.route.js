import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "./notifications.controller.js";

const router = express.Router();

router.use(protect);

router.get("/", asyncHandler(getMyNotifications));
router.patch("/read-all", asyncHandler(markAllAsRead));
router.patch("/:id/read", asyncHandler(markAsRead));
router.delete("/:id", asyncHandler(deleteNotification));

export default router;
