import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

export default function Login({ setUsername, socket }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (isRegister) => {
    setError("");

    try {
      let userCred;

      if (isRegister) {
        userCred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        userCred = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }

      const username = email.split("@")[0];

      // 🔥 Set username in socket
      socket.emit("set_username", username, (res) => {
        if (!res.success) {
          setError(res.error);
          return;
        }

        setUsername(username);
        navigate("/");
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Login to VibeChat 🔐
        </h2>

        {error && (
          <div className="text-red-300 bg-red-500/20 p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={() => handleLogin(false)}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-xl mb-3"
        >
          Login
        </button>

        <button
          onClick={() => handleLogin(true)}
          className="w-full bg-green-400 hover:bg-green-500 text-black font-semibold py-3 rounded-xl"
        >
          Register
        </button>
      </div>
    </div>
  );
}
