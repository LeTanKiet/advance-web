import { RouteObject } from "react-router-dom";
import Home from "../pages/admin/Home";
import { ADMIN_ROUTES } from "./constants";
import DefaultLayout from "../layouts/DefaultLayout";

const adminRoutes: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [
      {
        element: <Home />,
        path: ADMIN_ROUTES.home,
      },
    ],
  },
];

export default adminRoutes;
