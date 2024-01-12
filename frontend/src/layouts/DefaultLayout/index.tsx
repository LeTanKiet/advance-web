import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import SideBar from "./SideBar";

const DefaultLayout = () => {
  return (
    <div className="p-10">
      <Header />

      <div className="flex gap-4">
        <SideBar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
