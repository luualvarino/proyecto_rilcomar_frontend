import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role }: { role: "admin" | "client" }) => {
  const user = JSON.parse(localStorage.getItem("usuario") || "null");

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (role === "admin" && !user.esAdmin) {
    return <Navigate to="/" replace />;
  }

  if (role === "client" && user.esAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
