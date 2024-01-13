import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import SideBar from "./SideBar";

const DefaultLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex gap-4 flex-1">
        <SideBar />
        <div className="flex-1 pr-4 pt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
