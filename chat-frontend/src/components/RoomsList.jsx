// src/components/RoomsList.jsx
import React, { useState } from "react";

export default function RoomsList({ rooms, createRoom, joinRoom, currentRoom }) {
  const [newRoom, setNewRoom] = useState("");
  const [error, setError] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createRoom(newRoom); // call backend
      setNewRoom("");
    } catch (err) {
      setError(String(err));
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4 border border-slate-100 dark:border-slate-700">
      {/* CREATE ROOM */}
      <form onSubmit={handleCreate} className="mb-4 space-y-2">
        <input
          value={newRoom}
          onChange={(e) => setNewRoom(e.target.value)}
          placeholder="Create room"
          className="w-full p-2 border rounded mb-2 bg-slate-50 dark:bg-slate-900"
        />
        <button className="w-full px-3 py-2 rounded bg-green-600 text-white">
          Create
        </button>
        <button className="w-full px-3 py-2 rounded bg-green-600 text-white">
          Search
        </button>
      </form>

      {/* ERROR */}
      {error && (
        <div className="text-red-500 text-sm mb-2">{error}</div>
      )}

      {/* ROOMS LIST */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-4 border border-slate-100 dark:border-slate-700">
        {rooms.length === 0 && (
          <div className="text-sm text-slate-500">No rooms yet</div>
        )}

        {rooms.map((room) => (
          <div
            key={room}
            className={`flex items-center justify-between p-2 rounded ${
              currentRoom === room
                ? "bg-blue-50 dark:bg-blue-900"
                : ""
            }`}
          >
            <div>{room}</div>
            <button
              onClick={() => joinRoom(room)}
              className="px-2 py-1 text-sm border rounded"
            >
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
