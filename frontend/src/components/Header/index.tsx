import { Menu } from "antd";
import LogoutButton from "../LogoutButton";
import { Link, useLocation } from "react-router-dom";
import { USER_ROUTES } from "../../routes/constants";

const Header = () => {
  const { pathname } = useLocation();

  const menus = [
    {
      key: USER_ROUTES.home,
      label: <Link to={USER_ROUTES.home}>Home</Link>,
    },
    {
      key: USER_ROUTES.landingPage,
      label: <Link to={USER_ROUTES.landingPage}>Landing page</Link>,
    },
  ];
  return (
    <div className="flex justify-between mb-10">
      <Menu mode="horizontal" defaultSelectedKeys={[pathname]} items={menus} />

      <LogoutButton />
    </div>
  );
};

export default Header;
