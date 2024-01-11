import { RouteObject } from "react-router-dom";
import Home from "../pages/teacher/Home";
import { TEACHER_ROUTES } from "./constants";
import DefaultLayout from "../layouts/DefaultLayout";
import ClassDetail from "../pages/teacher/ClassDetail";

const teacherRoutes: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [
      {
        element: <Home />,
        path: TEACHER_ROUTES.home,
      },
      {
        element: <ClassDetail />,
        path: TEACHER_ROUTES.classDetail,
      },
    ],
  },
];

export default teacherRoutes;
