import { RouteObject } from "react-router-dom";
import Home from "../pages/user/Home";
import { USER_ROUTES } from "./constants";
import LandingPage from "../pages/user/LandingPage";
import DefaultLayout from "../layouts/DefaultLayout";
import ClassDetail from "../pages/user/ClassDetail";

const userRoutes: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [
      {
        element: <Home />,
        path: USER_ROUTES.home,
      },
      {
        element: <LandingPage />,
        path: USER_ROUTES.landingPage,
      },
      {
        element: <ClassDetail />,
        path: USER_ROUTES.classDetail,
      },
    ],
  },
];

export default userRoutes;
