import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import type { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, session } = useAuth();

  if (!user || !session) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;