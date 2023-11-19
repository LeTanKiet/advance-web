import { RouteObject, useRoutes } from "react-router-dom";
import Home from "../pages/admin/Home";
import { ADMIN_ROUTES } from "./constants";

const adminRoutes: RouteObject[] = [
  {
    element: <Home />,
    path: ADMIN_ROUTES.home,
  },
];

const AdminRoutes = () => {
  const element = useRoutes(adminRoutes);
  return element;
};

export default AdminRoutes;
