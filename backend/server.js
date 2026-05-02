import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import errorMiddleware from "./middleware/error.middleware.js";
import authRoute from "./routes/auth.route.js";
import postsRoute from "./routes/posts.route.js";
import cookieParser from "cookie-parser";
dotenv.config({ path: ".env.local" });

const app = express();
const PORT = process.env.PORT || 7777;

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true, // ⭐ allow cookies
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
connectDB();

app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);

// error handler
app.use(errorMiddleware);
console.log(process.env.EMAIL_USER); // should print your email
console.log(process.env.EMAIL_PASS); // should print app password
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
