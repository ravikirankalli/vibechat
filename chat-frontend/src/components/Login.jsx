// src/components/Login.jsx
import React, { useState } from "react";

export default function Login({ setUsername }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Please enter a username");
      return;
    }
    try {
      await setUsername(name);
    } catch (err) {
      setError(String(err));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          👋 Welcome!
        </h2>

        <form onSubmit={submit} className="space-y-4">
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-700"
            placeholder="Enter your username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-2 rounded-lg hover:scale-105 transition-transform duration-200 shadow-md"
          >
            Join Chat
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Start chatting instantly ✨
        </p>
      </div>
    </div>
  );
}
