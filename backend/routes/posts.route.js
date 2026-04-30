import express from "express";
import {
  createPostController,
  getPostsController,
} from "../controllers/posts.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/", getPostsController);
router.post("/", protect, upload.array("images"), createPostController);
export default router;
