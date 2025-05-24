import { Navigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import { useAuth } from "../context";

export const PrivateGuard = ({
  children,
  isAuthenticated,
}: {
  children: JSX.Element;
  isAuthenticated: boolean;
}) => {
  const { isGuest } = useAuth();
  
  // Permitir acceso si está autenticado O si es un usuario guest
  return (isAuthenticated || isGuest) ? children : <Navigate to="/login" replace />;
};
