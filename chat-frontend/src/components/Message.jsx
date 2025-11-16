// src/components/Message.jsx
import React from 'react';
import DOMPurify from 'dompurify';

// small formatter that supports **bold**, _italic_, and transforms URLs into anchors
function formatText(text) {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  let html = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/_(.*?)_/g, '<em>$1</em>');
  html = html.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
  return DOMPurify.sanitize(html);
}

export default function Message({ message, myUsername }) {
  const time = new Date(message.timestamp).toLocaleTimeString();
  const isMine = message.username === myUsername;

  return (
    <div
      className={`max-w-[85%] p-3 rounded-2xl ${
        isMine
          ? 'ml-auto bg-blue-600 text-white'
          : 'bg-slate-100 text-slate-500 dark:bg-slate-800'
      }`}
    >
      <div className="flex items-baseline justify-between gap-2">
        <div className="text-xs font-semibold text-emerald-600">{message.username}</div>
        <div className="text-[11px] text-slate-300">{time}</div>
      </div>
      <div
        className="mt-1 text-sm"
        dangerouslySetInnerHTML={{ __html: formatText(message.text) }}
      />
    </div>
  );
}
