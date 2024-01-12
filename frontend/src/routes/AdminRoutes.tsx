import { RouteObject } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../pages/admin/Home";
import { ADMIN_ROUTES } from "./constants";
import ManageClass from "../pages/admin/ManageClass";
import ManageStudent from "../pages/admin/ManageStudent";

const adminRoutes: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [
      {
        element: <Home />,
        path: ADMIN_ROUTES.home,
      },
      {
        element: <ManageClass />,
        path: ADMIN_ROUTES.manageClass,
      },
      {
        element: <ManageStudent />,
        path: ADMIN_ROUTES.manageStudent,
      },
    ],
  },
];

export default adminRoutes;
