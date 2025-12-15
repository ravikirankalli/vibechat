// src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { io } from "socket.io-client";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Rooms from "./pages/Rooms";
import ChatPage from "./pages/ChatPage";
import CreateRoom from "./pages/CreateRoom";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./utils/ProtectedRoute";

const socket = io("https://vibechat-mpif.onrender.com", {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
});

export default function App() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    socket.on("connect", () => console.log("🟢 Connected:", socket.id));
    socket.on("disconnect", () => console.log("🔴 Disconnected"));

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <>
      <Navbar username={username} setUsername={setUsername} />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home username={username} />} />

        {/* Public */}
        <Route
          path="/login"
          element={<Login setUsername={setUsername} socket={socket} />}
        />
        <Route
          path="/signup"
          element={<Signup setUsername={setUsername} socket={socket} />}
        />

        {/* Protected */}
        <Route
          path="/rooms"
          element={
            <ProtectedRoute username={username}>
              <Rooms username={username} socket={socket} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rooms/:room/chat"
          element={
            <ProtectedRoute username={username}>
              <ChatPage username={username} socket={socket} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-room"
          element={
            <ProtectedRoute username={username}>
              <CreateRoom socket={socket} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute username={username}>
              <Profile username={username} />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
