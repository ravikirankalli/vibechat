// src/App.jsx
import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import Login from './components/Login';
import RoomsList from './components/RoomsList';
import ChatWindow from './components/ChatWindow';
import './index.css';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export default function App() {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [roomUsers, setRoomUsers] = useState([]);

  useEffect(() => {
    const s = io(SOCKET_URL);
    setSocket(s);

    s.on('rooms_list', (list) => setRooms(list));
    s.on('new_message', (message) => {
      setMessages(prev => [...prev, message]);
    });
    s.on('room_users', (users) => setRoomUsers(users));

    return () => { s.disconnect(); };
  }, []);

  // ask server to set username
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

  const handleCreateRoom = (roomName) => {
    return new Promise((resolve, reject) => {
      if (!socket) return reject('No socket');
      socket.emit('create_room', roomName, (res) => {
        if (res.success) resolve(res.room);
        else reject(res.error);
      });
    });
  };

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

  const handleSendMessage = (text) => {
    return new Promise((resolve, reject) => {
      if (!socket) return reject('No socket');
      socket.emit('send_message', text, (res) => {
        if (res.success) resolve();
        else reject(res.error);
      });
    });
  };

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
            <div className="md:col-span-1">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
                <div className="mb-4 text-sm">Signed in as <strong>{username}</strong></div>
                <RoomsList
                  rooms={rooms}
                  createRoom={handleCreateRoom}
                  joinRoom={handleJoinRoom}
                  currentRoom={currentRoom}
                />
              </div>
            </div>
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
