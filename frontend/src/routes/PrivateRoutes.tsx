import { Navigate, Outlet, RouteObject, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { PUBLIC_ROUTES } from "./constants";
import adminRoutes from "./AdminRoutes";
import userRoutes from "./UserRoutes";
import { Role } from "../utils/enum";

const ProtectedLayout = () => {
  const user = useAppSelector((state) => state.app.user);
  const { pathname } = useLocation();

  if (!user && !Object.values(PUBLIC_ROUTES).includes(pathname))
    return <Navigate to={PUBLIC_ROUTES.signIn} />;

  return <Outlet />;
};

function PrivateRoutes() {
  const user = useAppSelector((state) => state.app.user);

  let routes: RouteObject[] = [];

  switch (user?.role) {
    case Role.USER:
      routes = userRoutes;
      break;
    case Role.ADMIN:
      routes = adminRoutes;
      break;
    default:
      routes = [...userRoutes, ...adminRoutes];
  }

  routes = [
    {
      element: <ProtectedLayout />,
      children: routes,
    },
  ];

  return routes;
}

export default PrivateRoutes;
