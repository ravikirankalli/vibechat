# Vibechat
# 🗨️ VibeChat – Real-Time Chat Application  
A modern real-time chat application built using **React (Vite)** for the frontend and **Node.js + Express + Socket.io** for the backend.  
Users can create rooms, join rooms, and chat instantly with others.

---

 Features

 Frontend (React + Vite)
- Clean and responsive UI  
- Create/Delete chat rooms  
- Join rooms and start chatting  
- Real-time message updates  
- Light/Dark theme toggle  
- Manage chat backgrounds  
- Emoji + multimedia support (optional)  

 Backend (Node.js + Express + Socket.io)
- Real-time communication  
- Room-based chat  
- Join/leave room events  
- Message broadcasting  
- Fully custom backend (No Firebase)  

---

 Project Structure

vibechat/
│── chat-backend/ # Node.js + Express + Socket.io server
│ ├── server.js
│ ├── package.json
│ └── ...
│
│── chat-frontend/ # React + Vite frontend
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── ...
│
└── README.md


---

 Installation & Setup

 Clone the repository
```sh
git clone https://github.com/your-username/VibeChat.git
cd VibeChat
Backend Setup (Node.js)
Install dependencies:
cd chat-backend
npm install

Start the server:
npm start


By default the backend runs on:

http://localhost:5000

 Frontend Setup (React + Vite)
Install dependencies:
cd chat-frontend
npm install

Start the frontend:
npm run dev


Vite will open:

http://localhost:5173

🔌 Connecting Frontend & Backend

The frontend connects to the backend using:

import { io } from "socket.io-client";
const socket = io("http://localhost:5000");


Ensure both servers are running.
