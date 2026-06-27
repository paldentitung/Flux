import { Server } from "socket.io";

let io;

// userId -> socketId map
const onlineUsers = new Map();

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ client connected:", socket.id);
    const userId = socket.handshake.query.userId;

    if (userId) {
      onlineUsers.set(userId, socket.id);
      socket.emit("onlineUsers", getOnlineUsers());
      io.emit("userOnline", userId);
    }

    socket.on("disconnect", () => {
      onlineUsers.delete(userId);
      io.emit("userOffline", userId);
    });
  });
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};

export const getSocketId = (userId) => onlineUsers.get(userId);
export const getOnlineUsers = () => Array.from(onlineUsers.keys());
export const isUserOnline = (userId) => onlineUsers.has(userId);
