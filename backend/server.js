import "./config/env.js";
import { createServer } from "http";
import { connectDB } from "./config/db.js";
import app from "./app.js";
import { initSocket } from "./config/socket.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    const httpServer = createServer(app);
    initSocket(httpServer);

    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("DB connection failed:", error);
    process.exit(1);
  }
};

startServer();
