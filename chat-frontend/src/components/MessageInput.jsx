// src/components/MessageInput.jsx
import React, { useState } from "react";

export default function MessageInput({ sendMessage }) {
  const [text, setText] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await sendMessage(text);
      setText("");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <form
      onSubmit={handleSend}
      className="flex items-center gap-3 p-4 border-t border-white/10 bg-white/5 backdrop-blur-xl"
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 px-4 py-3 rounded-full bg-white/20 text-white placeholder-gray-300 border border-white/20 outline-none focus:ring-2 focus:ring-yellow-400/50 transition"
      />

      <button
        type="submit"
        className="bg-yellow-400 hover:bg-yellow-500 active:scale-95 text-black font-semibold px-6 py-3 rounded-full transition"
      >
        Send
      </button>
    </form>
  );
}
