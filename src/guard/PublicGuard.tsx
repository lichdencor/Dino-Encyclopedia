import { Navigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";

export const PublicGuard = ({
  children,
  isAuthenticated,
}: {
  children: JSX.Element;
  isAuthenticated: boolean;
}) => {
  // Si no está autenticado o es guest, mostrar el contenido
  // Si está autenticado, redirigir a la landing page
  return !isAuthenticated ? children : <Navigate to="/" replace />;
}; 