import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config({ path: ".env.local" });

const PORT = process.env.PORT || 7777;

connectDB();

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
