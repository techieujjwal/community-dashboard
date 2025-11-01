// src/routes/PrivateRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import React from "react";

interface PrivateRouteProps {
  children: React.JSX.Element;
  allowedRoles?: string[]; // e.g. ["admin"]
}

export const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const { user, authReady } = useAuth();

  if (!authReady) {
    return (
      <div className="text-center mt-20 text-lg font-medium">
        Loading authentication...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role || "member")) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
