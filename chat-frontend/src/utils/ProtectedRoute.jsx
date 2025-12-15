
// src/utils/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ username, children }) {
  if (!username) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
