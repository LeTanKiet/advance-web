import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import SideBar from "./SideBar";
import { useAppSelector } from "../../hooks/redux";
import { Role } from "../../utils/enum";

const DefaultLayout = () => {
  const user = useAppSelector((state) => state.app.user);

  return (
    <div className="p-10">
      <Header />

      <div className="flex gap-4">
        {user?.role === Role.ADMIN && <SideBar />}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
