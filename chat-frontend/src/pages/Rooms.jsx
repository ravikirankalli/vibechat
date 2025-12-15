// src/pages/Rooms.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomsList from "../components/RoomsList";

export default function Rooms({ socket }) {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ listen FIRST
    const handleRooms = (roomsList) => {
      setRooms(roomsList);
    };

    socket.on("rooms_list", handleRooms);

    // ✅ then request rooms
    socket.emit("get_rooms");

    return () => {
      socket.off("rooms_list", handleRooms);
    };
  }, [socket]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 px-4 py-10">
      <h1 className="text-3xl font-bold text-white text-center mb-8">
        Join a Chat Room 💬
      </h1>

      <RoomsList
        rooms={rooms}
        onJoin={(room) => navigate(`/rooms/${room}/chat`)}
      />
    </div>
  );
}
