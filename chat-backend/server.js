// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// In-memory chat storage
const rooms = {}; // { roomName: { messages: [], users: Set() } }
const usernameToSocket = {};
const socketToUser = {};

// ⚡ No authentication middleware (Firebase removed)
io.use((socket, next) => {
  console.log("Client trying to connect...");
  next();
});

io.on("connection", (socket) => {
  console.log(`✔ Client connected: ${socket.id}`);

  // Send available rooms
  socket.emit("rooms_list", Object.keys(rooms));

  // Set username
  socket.on("set_username", (username, callback) => {
    if (!username || !username.trim()) {
      return callback({ success: false, error: "Invalid username" });
    }

    username = username.trim();

    if (usernameToSocket[username]) {
      return callback({ success: false, error: "Username already in use" });
    }

    usernameToSocket[username] = socket.id;
    socketToUser[socket.id] = { username, room: null };

    callback({ success: true, username });
  });

  // Create room
  socket.on("create_room", (roomName, callback) => {
    if (!roomName || !roomName.trim()) {
      return callback({ success: false, error: "Invalid room name" });
    }

    roomName = roomName.trim();

    if (!rooms[roomName]) {
      rooms[roomName] = { messages: [], users: new Set() };
      io.emit("rooms_list", Object.keys(rooms));
    }

    callback({ success: true, room: roomName });
  });

  // Join room
  socket.on("join_room", (roomName, callback) => {
    const user = socketToUser[socket.id];
    if (!user) return callback({ success: false, error: "Set username first" });

    if (!roomName || !roomName.trim()) {
      return callback({ success: false, error: "Invalid room" });
    }

    roomName = roomName.trim();

    if (!rooms[roomName]) {
      return callback({ success: false, error: "Room not found" });
    }

    // Leave old room
    if (user.room) {
      socket.leave(user.room);
      rooms[user.room].users.delete(user.username);
      io.to(user.room).emit("room_users", Array.from(rooms[user.room].users));
    }

    // Join new room
    socket.join(roomName);
    rooms[roomName].users.add(user.username);
    user.room = roomName;

    const messages = rooms[roomName].messages.slice(-100);

    callback({ success: true, room: roomName, messages });

    io.to(roomName).emit("room_users", Array.from(rooms[roomName].users));
  });

  // Send message
  socket.on("send_message", (text, callback) => {
    const user = socketToUser[socket.id];
    if (!user || !user.room) {
      return callback({ success: false, error: "Not in a room" });
    }

    if (!text || !text.trim()) {
      return callback({ success: false, error: "Empty message" });
    }

    const message = {
      id: Date.now() + "_" + Math.random().toString(36).substring(2, 8),
      username: user.username,
      text: text.trim(),
      timestamp: new Date().toISOString()
    };

    rooms[user.room].messages.push(message);

    io.to(user.room).emit("new_message", message);

    callback({ success: true });
  });

  // Leave room
  socket.on("leave_room", (callback) => {
    const user = socketToUser[socket.id];

    if (!user || !user.room) {
      return callback({ success: false, error: "Not in a room" });
    }

    const room = user.room;

    socket.leave(room);
    rooms[room].users.delete(user.username);
    user.room = null;

    io.to(room).emit("room_users", Array.from(rooms[room].users));

    callback({ success: true });
  });

  // Disconnect
  socket.on("disconnect", () => {
    const user = socketToUser[socket.id];

    if (user) {
      if (user.room) {
        rooms[user.room].users.delete(user.username);
        io.to(user.room).emit("room_users", Array.from(rooms[user.room].users));
      }

      delete usernameToSocket[user.username];
      delete socketToUser[socket.id];
    }

    console.log(`✖ Client disconnected: ${socket.id}`);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
