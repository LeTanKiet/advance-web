import { RouteObject, useRoutes } from "react-router-dom";
import NotFound from "../pages/NotFound";
import AuthLayout from "../layouts/AuthLayout";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import { PUBLIC_ROUTES } from "./constants";

const publicRoutes: RouteObject[] = [
  {
    element: <NotFound />,
    path: "*",
  },
  {
    element: <AuthLayout />,
    children: [
      { element: <SignIn />, path: PUBLIC_ROUTES.signIn },
      { element: <SignUp />, path: PUBLIC_ROUTES.signUp },
    ],
  },
];

const PublicRoutes = () => {
  const element = useRoutes(publicRoutes);
  return element;
};

export default PublicRoutes;
