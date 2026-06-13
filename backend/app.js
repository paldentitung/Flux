import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.middleware.js";
import authRoute from "./routes/auth.route.js";
import postsRoute from "./routes/posts.route.js";
import commentRoute from "./routes/comment.route.js";
import userRoute from "./routes/user.route.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
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

app.use(errorMiddleware);

export default app;
