import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import errorMiddleware from "./middleware/error.middleware.js";

dotenv.config({ path: ".env.local" });

const app = express();
const PORT = process.env.PORT || 7777;

app.use(cors());
app.use(express.json());

connectDB();

// error handler
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
