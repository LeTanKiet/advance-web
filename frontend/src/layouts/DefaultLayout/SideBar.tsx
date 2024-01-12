import { Link, NavLink } from "react-router-dom";
import { ADMIN_ROUTES } from "../../routes/constants";

const MENUS = [
  {
    label: "Classes",
    to: ADMIN_ROUTES.manageClass,
  },
  {
    label: "Students",
    to: ADMIN_ROUTES.manageStudent,
  },
];

const SideBar = () => {
  return (
    <div className="min-w-[240px] flex flex-col gap-2">
      {MENUS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `px-4 py-3 ${
              isActive ? "bg-gray-100" : ""
            } hover:bg-gray-100 hover:cursor-pointer rounded-md text-[#000] no-underline block`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  );
};

export default SideBar;
