import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ChatWindow from "../components/ChatWindow";

export default function ChatPage({ username, socket }) {
  const { room } = useParams();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.emit("join_room", room, (res) => {
      if (!res.success) {
        navigate("/rooms");
        return;
      }
      setMessages(res.messages || []);
    });

    socket.on("new_message", (msg) =>
      setMessages((prev) => [...prev, msg])
    );

    socket.on("room_users", setUsers);

    return () => {
      socket.off("new_message");
      socket.off("room_users");
    };
  }, [room, socket, navigate]);

  const sendMessage = (text) =>
    new Promise((resolve, reject) => {
      socket.emit("send_message", text, (res) =>
        res.success ? resolve() : reject()
      );
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 px-4 py-6">
      <ChatWindow
        room={room}
        messages={messages}
        users={users}
        username={username}
        sendMessage={sendMessage}
        leaveRoom={() => navigate("/rooms")}
      />
    </div>
  );
}
