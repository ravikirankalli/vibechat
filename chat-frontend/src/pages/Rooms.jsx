import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomsList from "../components/RoomsList";

export default function Rooms({ socket, username }) {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleRooms = (roomsList) => {
      setRooms(Array.isArray(roomsList) ? roomsList : []);
    };

    socket.on("rooms_list", handleRooms);
    socket.emit("get_rooms");

    return () => {
      socket.off("rooms_list", handleRooms);
    };
  }, [socket]);

  const handleDelete = (roomName) => {
    socket.emit("delete_room", roomName, (res) => {
      if (!res.success) alert(res.error);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 px-4 py-10">
      <h1 className="text-3xl font-bold text-white text-center mb-8">
        Join a Chat Room 💬
      </h1>

      <RoomsList
        rooms={rooms}
        username={username}
        onJoin={(room) => navigate(`/rooms/${room}/chat`)}
        onDelete={handleDelete}
      />
    </div>
  );
}
