// src/routes/PrivateRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import React from "react";

export const PrivateRoute = ({ children }: { children: React.JSX.Element }) => {
    const { user, authReady } = useAuth();

  // Wait until Firebase finishes initializing
  if (!authReady) {
    return (
      <div className="text-center mt-20 text-lg font-medium">
        Loading authentication...
      </div>
    );
  }

  // Redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Allow access if user is authenticated
  return children;
};
