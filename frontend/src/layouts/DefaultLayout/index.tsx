import { Outlet } from "react-router-dom";
import Header from "../../components/Header";

const DefaultLayout = () => {
  return (
    <div className="p-10">
      <Header />
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
