import { useRoutes } from "react-router-dom";
import publicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = () => {
  const element = useRoutes([...publicRoutes, ...PrivateRoutes()]);
  return element;
};

export default AppRoutes;
