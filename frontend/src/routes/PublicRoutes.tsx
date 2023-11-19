import { RouteObject } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import { PUBLIC_ROUTES } from "./constants";

const publicRoutes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      { element: <SignIn />, path: PUBLIC_ROUTES.signIn },
      { element: <SignUp />, path: PUBLIC_ROUTES.signUp },
    ],
  },
];

export default publicRoutes;
