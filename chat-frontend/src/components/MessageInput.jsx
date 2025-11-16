// src/components/MessageInput.jsx
import React, { useState } from 'react';

export default function MessageInput({ onSend }) {
  const [text, setText] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    try {
      await onSend(t);
      setText('');
    } catch (err) {
      console.error('send failed', err);
    }
  };

  return (
    <form onSubmit={submit} className="mt-2">
  <div className="flex gap-3 items-center">
    <input
      value={text}
      onChange={(e)=>setText(e.target.value)}
      className="flex-1 p-3 rounded-full border border-slate-200 bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
      placeholder="Write a message..."/>
    <button className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow">Send</button>
  </div>
</form>
  );
}
