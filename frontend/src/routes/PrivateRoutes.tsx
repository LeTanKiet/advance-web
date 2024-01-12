import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet, RouteObject, useLocation } from "react-router-dom";
import authApi from "../api/authApi";
import { useAppSelector } from "../hooks/redux";
import { Role } from "../utils/enum";
import adminRoutes from "./AdminRoutes";
import teacherRoutes from "./TeacherRoutes";
import userRoutes from "./UserRoutes";
import { PUBLIC_ROUTES } from "./constants";

const ProtectedLayout = () => {
  const { pathname } = useLocation();

  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: authApi.fetchCurrentUser,
  });

  if (!isLoading && !data && !Object.values(PUBLIC_ROUTES).includes(pathname))
    return <Navigate to={PUBLIC_ROUTES.signIn} />;

  return <Outlet />;
};

function PrivateRoutes() {
  const user = useAppSelector((state) => state.app.user);

  let routes: RouteObject[] = [];

  switch (user?.role) {
    case Role.STUDENT:
      routes = userRoutes;
      break;
    case Role.TEACHER:
      routes = teacherRoutes;
      break;
    case Role.ADMIN:
      routes = adminRoutes;
      break;
    default:
      routes = [...userRoutes, ...teacherRoutes];
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
