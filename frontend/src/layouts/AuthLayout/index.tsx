import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { USER_ROUTES } from "../../routes/constants";

const AuthLayout = () => {
  const user = useAppSelector((state) => state.app.user);

  if (user) return <Navigate to={USER_ROUTES.home} />;

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-16">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
