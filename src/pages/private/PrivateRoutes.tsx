import { Navigate, Route } from "react-router-dom";
import { RoutesWithNotFound } from "../../components";
import { AppRoutes } from "../../models";
import { ImageUploader } from "../../components";

export const PrivateRouter = () => {
  return (
    <RoutesWithNotFound>
      {/* Redireccion a Upload si tiene acesso priavte */}
      <Route
        path="/"
        element={<Navigate to={AppRoutes.private.uploadGallery} />}
      />

      {/* Routa con upload */}
      <Route
        path={AppRoutes.private.uploadGallery}
        element={<ImageUploader />}
      />
    </RoutesWithNotFound>
  );
};
