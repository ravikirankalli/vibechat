
import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";

export default function ChatWindow({
  room,
  messages,
  sendMessage,
  leaveRoom,
  users,
  username, 
}) {
  const listRef = useRef(null);
  const [unread, setUnread] = useState(0);
  const windowFocused = useRef(true);

  // Track focus for unread message count
  useEffect(() => {
    const onFocus = () => {
      windowFocused.current = true;
      setUnread(0);
    };
    const onBlur = () => {
      windowFocused.current = false;
    };

    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  // Auto-scroll when messages update
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
    if (!windowFocused.current) setUnread((u) => u + 1);
  }, [messages]);

  if (!room) {
    return (
      <div className="text-center text-slate-500 p-6">
        Select or create a room to start chatting.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[72vh] bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 rounded-2xl p-4 shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">
        <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          #{room}
        </div>
        <div className="text-sm text-slate-500">
          👥 {users.length} {users.length === 1 ? "user" : "users"}
        </div>
      </div>

      {/* Messages list */}
      <div
        ref={listRef}
        className="flex-1 overflow-auto p-3 space-y-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-inner"
      >
        {messages.length > 0 ? (
          messages.map((msg) => (
            <Message key={msg.id} message={msg} myUsername={username} />
          ))
        ) : (
          <div className="text-center text-slate-400 italic">
            No messages yet — start the conversation!
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <div>Tip: Use **bold** or _italic_ in your messages</div>
        <button
          onClick={leaveRoom}
          className="px-3 py-1 rounded-md bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition-all"
        >
          Leave Room
        </button>
      </div>

      {/* Message Input */}
      <div className="mt-2">
        <MessageInput
          onSend={async (text) => {
            if (!text || !text.trim()) return;
            try {
              await sendMessage(text);
            } catch (err) {
              console.error("Send error:", err);
            }
          }}
        />
      </div>
    </div>
  );
}
