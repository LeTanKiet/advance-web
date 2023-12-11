import CreateButton from "./CreateButton";
import LogoutButton from "./LogoutButton";

const Header = () => {
  // const { pathname } = useLocation();

  // const menus = [
  //   {
  //     key: USER_ROUTES.home,
  //     label: <Link to={USER_ROUTES.home}>Home</Link>,
  //   },
  //   {
  //     key: USER_ROUTES.landingPage,
  //     label: <Link to={USER_ROUTES.landingPage}>Landing page</Link>,
  //   },
  // ];

  return (
    <div className="flex justify-between mb-10">
      <div></div>
      {/* <Menu mode="horizontal" defaultSelectedKeys={[pathname]} items={menus} /> */}

      <div className="flex gap-2 items-center">
        <CreateButton />
        <LogoutButton />
      </div>
    </div>
  );
};

export default Header;
