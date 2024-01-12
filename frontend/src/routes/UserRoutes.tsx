import { RouteObject } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import ClassDetail from "../pages/user/ClassDetail";
import Home from "../pages/user/Home";
import { USER_ROUTES } from "./constants";
import UpdateProfile from "../pages/user/UpdateProfile";

const userRoutes: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [
      {
        element: <Home />,
        path: USER_ROUTES.home,
      },
      {
        element: <ClassDetail />,
        path: USER_ROUTES.classDetail,
      },
      {
        element: <UpdateProfile />,
        path: USER_ROUTES.profile,
      },
    ],
  },
];

export default userRoutes;
