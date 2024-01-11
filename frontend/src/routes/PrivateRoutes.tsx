import { Navigate, Outlet, RouteObject, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { PUBLIC_ROUTES } from "./constants";
import teacherRoutes from "./TeacherRoutes";
import userRoutes from "./UserRoutes";
import { Role } from "../utils/enum";
import { useQuery } from "@tanstack/react-query";
import authApi from "../api/authApi";

const ProtectedLayout = () => {
  const user = useAppSelector((state) => state.app.user);
  console.log("🚀 ~ ProtectedLayout ~ user:", user);
  const { pathname } = useLocation();

  const { isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: authApi.fetchCurrentUser,
  });

  if (!user && !Object.values(PUBLIC_ROUTES).includes(pathname))
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
