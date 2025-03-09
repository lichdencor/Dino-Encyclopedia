import { Navigate, Route } from "react-router-dom";
import { RoutesWithNotFound } from "../components/RoutesWithNotFound/RoutesWithNotFound";
import { AppRoutes } from "../models";

export const PrivateRouter = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={AppRoutes.private.dashboard} />} />
      {/* <Route path={AppRoutes.private.dashboard} element={<Dashboard />} /> */}
    </RoutesWithNotFound>
  );
};
