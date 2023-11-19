import { RouteObject, useRoutes } from "react-router-dom";
import Home from "../pages/user/Home";
import { USER_ROUTES } from "./constants";

const userRoutes: RouteObject[] = [
  {
    element: <Home />,
    path: USER_ROUTES.home,
  },
];

const UserRoutes = () => {
  const element = useRoutes(userRoutes);
  return element;
};

export default UserRoutes;
