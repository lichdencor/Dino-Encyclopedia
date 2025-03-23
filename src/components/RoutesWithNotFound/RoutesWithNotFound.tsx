import { ReactNode } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
interface Props {
  children: ReactNode;
}

export const RoutesWithNotFound = ({ children }: Props) => {
  const navigate = useNavigate();
  return (
    <Routes>
      {children}
      <Route path="*" element={<Navigate to="/404" />} />
      <Route path="/404" element={<h1>Página no encontrada,<button onClick={() => {navigate("/")}}>
      ← Volver al home</button></h1>} />
    </Routes>
  );
};
