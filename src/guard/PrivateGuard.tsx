import { Navigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";

export const PrivateGuard = ({
  children,
  isAuthenticated,
}: {
  children: JSX.Element;
  isAuthenticated: boolean;
}) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};
