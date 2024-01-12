import { RouteObject } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../pages/admin/Home";
import { ADMIN_ROUTES } from "./constants";
import ManageClass from "../pages/admin/ManageClass";
import ManageStudent from "../pages/admin/ManageStudent";
import UpdateProfile from "../pages/user/UpdateProfile";

const adminRoutes: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [
      {
        element: <ManageClass />,
        path: ADMIN_ROUTES.manageClass,
      },
      {
        element: <ManageStudent />,
        path: ADMIN_ROUTES.manageStudent,
      },
      {
        element: <UpdateProfile />,
        path: ADMIN_ROUTES.profile,
      },
    ],
  },
];

export default adminRoutes;
