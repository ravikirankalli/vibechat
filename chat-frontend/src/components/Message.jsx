// src/components/Message.jsx
import React from "react";

export default function Message({ message, isOwn }) {
  return (
    <div
      className={`flex ${
        isOwn ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs md:max-w-sm px-4 py-2 rounded-2xl text-sm shadow ${
          isOwn
            ? "bg-gradient-to-br from-yellow-400 to-yellow-500 text-black rounded-br-none"
            : "bg-white/20 backdrop-blur-md text-white rounded-bl-none"
        }`}
      >
        {!isOwn && (
          <div className="text-xs font-semibold text-purple-300 mb-1">
            {message.username}
          </div>
        )}
        <div className="break-words">{message.text}</div>
      </div>
    </div>
  );
}
