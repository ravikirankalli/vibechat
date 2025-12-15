import React from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";

export default function ChatWindow({
  room,
  messages,
  users,
  username,
  sendMessage,
  leaveRoom,
}) {
  return (
    <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex flex-col h-[85vh]">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <h2 className="text-white font-bold text-lg">#{room}</h2>
        <button
          onClick={leaveRoom}
          className="text-red-400 hover:text-red-500 font-medium transition"
        >
          Leave
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <Message
            key={msg.id}
            message={msg}
            isOwn={msg.username === username}
          />
        ))}
      </div>

      {/* Input */}
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
}
