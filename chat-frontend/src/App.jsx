// src/App.jsx
import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import RoomsList from "./components/RoomsList";
import ChatWindow from "./components/ChatWindow";
import "./index.css";
import { io } from "socket.io-client";

// ⭐ Global socket connection (Render backend)
const socketConnection = io("https://vibechat-mpif.onrender.com", {
  transports: ["websocket"],
  withCredentials: false,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000
});

export default function App() {
  const [socket] = useState(socketConnection);
  const [username, setUsername] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [roomUsers, setRoomUsers] = useState([]);

  // -------------------------------
  //   SOCKET.IO LISTENERS
  // -------------------------------

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      console.log("🔌 Connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected");
    });

    socket.on("rooms_list", (roomsList) => {
      setRooms(roomsList);
    });

    socket.on("new_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("room_users", (users) => {
      setRoomUsers(users);
    });

    // Cleanup listeners on unmount
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("rooms_list");
      socket.off("new_message");
      socket.off("room_users");
    };
  }, [socket]);

  // -------------------------------
  //   USER & ROOM ACTIONS
  // -------------------------------

  const handleSetUsername = (name) => {
    return new Promise((resolve, reject) => {
      socket.emit("set_username", name, (res) => {
        if (res.success) {
          setUsername(res.username);
          resolve(res.username);
        } else reject(res.error);
      });
    });
  };

  const handleCreateRoom = (roomName) => {
    return new Promise((resolve, reject) => {
      socket.emit("create_room", roomName, (res) => {
        if (res.success) resolve(res.room);
        else reject(res.error);
      });
    });
  };

  const handleJoinRoom = (roomName) => {
    return new Promise((resolve, reject) => {
      socket.emit("join_room", roomName, (res) => {
        if (res.success) {
          setCurrentRoom(res.room);
          setMessages(res.messages || []);
          resolve(res);
        } else reject(res.error);
      });
    });
  };

  const handleSendMessage = (text) => {
    return new Promise((resolve, reject) => {
      socket.emit("send_message", text, (res) => {
        if (res.success) resolve();
        else reject(res.error);
      });
    });
  };

  const handleLeaveRoom = () => {
    socket.emit("leave_room", (res) => {
      if (res?.success) {
        setCurrentRoom(null);
        setMessages([]);
        setRoomUsers([]);
      }
    });
  };

  // -------------------------------
  //   UI
  // -------------------------------
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="max-w-6xl mx-auto p-6">
        {!username ? (
          <Login setUsername={handleSetUsername} />
        ) : (
          <div className="grid md:grid-cols-4 gap-4">
            {/* Rooms Panel */}
            <div className="md:col-span-1">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
                <div className="mb-4 text-sm">
                  Signed in as <strong>{username}</strong>
                </div>

                <RoomsList
                  rooms={rooms}
                  createRoom={handleCreateRoom}
                  joinRoom={handleJoinRoom}
                  currentRoom={currentRoom}
                />
              </div>
            </div>

            {/* Chat Window */}
            <div className="md:col-span-3">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
                <ChatWindow
                  room={currentRoom}
                  messages={messages}
                  sendMessage={handleSendMessage}
                  leaveRoom={handleLeaveRoom}
                  users={roomUsers}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
