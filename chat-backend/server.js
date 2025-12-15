import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

/**
 * rooms = {
 *   roomName: {
 *     owner: string,
 *     messages: [],
 *     users: Set
 *   }
 * }
 */
const rooms = {};
const socketToUser = {};

// helper to send rooms
const getRoomsPayload = () =>
  Object.entries(rooms).map(([name, data]) => ({
    name,
    owner: data.owner,
  }));

io.on("connection", (socket) => {
  console.log("✔ Connected:", socket.id);

  socket.emit("rooms_list", getRoomsPayload());

  socket.on("get_rooms", () => {
    socket.emit("rooms_list", getRoomsPayload());
  });

  socket.on("set_username", (username, cb) => {
    if (!username?.trim()) {
      return cb({ success: false, error: "Invalid username" });
    }

    socketToUser[socket.id] = {
      username,
      room: null,
    };

    cb({ success: true });
  });

  socket.on("create_room", (roomName, cb) => {
    const user = socketToUser[socket.id];
    if (!user) return cb({ success: false, error: "Login first" });

    roomName = roomName.trim();
    if (!roomName) return cb({ success: false, error: "Invalid room name" });
    if (rooms[roomName])
      return cb({ success: false, error: "Room already exists" });

    rooms[roomName] = {
      owner: user.username,
      messages: [],
      users: new Set(),
    };

    io.emit("rooms_list", getRoomsPayload());
    cb({ success: true });
  });

  socket.on("delete_room", (roomName, cb) => {
    const user = socketToUser[socket.id];
    const room = rooms[roomName];

    if (!user) return cb({ success: false, error: "Unauthorized" });
    if (!room) return cb({ success: false, error: "Room not found" });
    if (room.owner !== user.username)
      return cb({ success: false, error: "Only owner can delete room" });

    delete rooms[roomName];
    io.emit("rooms_list", getRoomsPayload());
    cb({ success: true });
  });

  socket.on("join_room", (roomName, cb) => {
    const user = socketToUser[socket.id];
    if (!user) return cb({ success: false, error: "Unauthorized" });
    if (!rooms[roomName])
      return cb({ success: false, error: "Room not found" });

    socket.join(roomName);
    rooms[roomName].users.add(user.username);
    user.room = roomName;

    cb({
      success: true,
      messages: rooms[roomName].messages,
    });

    io.to(roomName).emit("room_users", [...rooms[roomName].users]);
  });

  socket.on("send_message", (text, cb) => {
    const user = socketToUser[socket.id];
    if (!user?.room) return cb({ success: false });

    const msg = {
      id: Date.now(),
      username: user.username,
      text,
      timestamp: new Date().toISOString(),
    };

    rooms[user.room].messages.push(msg);
    io.to(user.room).emit("new_message", msg);

    cb({ success: true });
  });

  socket.on("disconnect", () => {
    delete socketToUser[socket.id];
    console.log("❌ Disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("🔥 Server running on http://localhost:3000");
});
