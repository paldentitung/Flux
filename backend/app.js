import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.middleware.js";
import authRoute from "./modules/auth/auth.route.js";
import postsRoute from "./modules/posts/posts.route.js";
import commentRoute from "./modules/comments/comment.route.js";
import userRoute from "./modules/users/user.route.js";
import searchRoute from "./modules/search/search.route.js";
import notificationRoutes from "./modules/notifications/notifications.route.js";
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);
app.use("/api/comment", commentRoute);
app.use("/api/user", userRoute);
app.use("/api/search", searchRoute);
app.use("/api/notifications", notificationRoutes);

app.use(errorMiddleware);

export default app;
