import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { PUBLIC_ROUTES } from "./constants";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";

const PrivateRoutes = () => {
  const user = useAppSelector((state) => state.app.user);

  if (!user) return <Navigate to={PUBLIC_ROUTES.signIn} />;

  let RoutesComp = null;

  switch (user?.role) {
    case "user":
      RoutesComp = UserRoutes;
      break;
    case "admin":
      RoutesComp = AdminRoutes;
      break;
    default:
      RoutesComp = () => (
        <>
          <UserRoutes />
          <AdminRoutes />
        </>
      );
  }

  return <RoutesComp />;
};

export default PrivateRoutes;
