import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { PUBLIC_ROUTES, USER_ROUTES } from "../../routes/constants";

const AuthLayout = () => {
  const user = useAppSelector((state) => state.app.user);
  const { pathname } = useLocation();

  if (user && !Object.values(PUBLIC_ROUTES).includes(pathname))
    return <Navigate to={USER_ROUTES.home} />;

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-16">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
