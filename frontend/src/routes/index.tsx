import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

const AppRoutes = () => {
  return (
    <>
      <PublicRoutes />
      <PrivateRoutes />
    </>
  );
};

export default AppRoutes;
