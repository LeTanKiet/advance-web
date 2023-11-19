import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div className="p-10">
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
