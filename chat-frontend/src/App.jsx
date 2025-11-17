// src/App.jsx
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Login from './components/Login';
import RoomsList from './components/RoomsList';
import ChatWindow from './components/ChatWindow';
import './index.css';

// Vercel backend URL 
const SOCKET_URL = "https://vibechat-innp.vercel.app";

export default function App() {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [roomUsers, setRoomUsers] = useState([]);

  // ✅ Correct WebSocket connection
  useEffect(() => {
    const s = io(SOCKET_URL, {
      path: "/api/socket",
      transports: ["websocket"],  // force WebSocket instead of polling
    });

    setSocket(s);

    // Listen to room list
    s.on('rooms_list', (list) => setRooms(list));

    // Listen to new messages
    s.on('new_message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    // Listen to users in the room
    s.on('room_users', (users) => setRoomUsers(users));

    return () => { 
      s.disconnect();
    };
  }, []);

  // Set username
  const handleSetUsername = (name) => {
    return new Promise((resolve, reject) => {
      if (!socket) return reject('No socket');

      socket.emit('set_username', name, (res) => {
        if (res.success) {
          setUsername(res.username);
          resolve(res.username);
        } else {
          reject(res.error);
        }
      });
    });
  };

  // Create room
  const handleCreateRoom = (roomName) => {
    return new Promise((resolve, reject) => {
      if (!socket) return reject('No socket');

      socket.emit('create_room', roomName, (res) => {
        if (res.success) resolve(res.room);
        else reject(res.error);
      });
    });
  };

  // Join room
  const handleJoinRoom = (roomName) => {
    return new Promise((resolve, reject) => {
      if (!socket) return reject('No socket');

      socket.emit('join_room', roomName, (res) => {
        if (res.success) {
          setCurrentRoom(res.room);
          setMessages(res.messages || []);
          resolve(res);
        } else {
          reject(res.error);
        }
      });
    });
  };

  // Send message
  const handleSendMessage = (text) => {
    return new Promise((resolve, reject) => {
      if (!socket) return reject('No socket');

      socket.emit('send_message', text, (res) => {
        if (res.success) resolve();
        else reject(res.error);
      });
    });
  };

  // Leave room
  const handleLeaveRoom = () => {
    if (!socket) return;

    socket.emit('leave_room', (res) => {
      if (res && res.success) {
        setCurrentRoom(null);
        setMessages([]);
        setRoomUsers([]);
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="max-w-6xl mx-auto p-6">
        
        {!username ? (
          <Login setUsername={handleSetUsername} />
        ) : (
          <div className="grid md:grid-cols-4 gap-4">
            
            {/* Rooms sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
                <div className="mb-4 text-sm">
                  Signed in as <strong>{username}</strong>
                </div>

                <RoomsList
                  rooms={rooms}
                  createRoom={handleCreateRoom}
                  joinRoom={handleJoinRoom}
                  currentRoom={currentRoom}
                />
              </div>
            </div>

            {/* Chat window */}
            <div className="md:col-span-3">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
                <ChatWindow
                  room={currentRoom}
                  messages={messages}
                  sendMessage={handleSendMessage}
                  leaveRoom={handleLeaveRoom}
                  users={roomUsers}
                />
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
