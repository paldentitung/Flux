import express from "express";
import {
  createPostController,
  deletePostController,
  getPostsController,
} from "../controllers/posts.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/", protect, getPostsController);
router.post("/", protect, upload.array("images"), createPostController);
router.delete("/:postId", protect, deletePostController);
export default router;
