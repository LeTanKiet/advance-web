import { Link } from "react-router-dom";
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
    <div className="min-w-[240px]">
      {MENUS.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="px-4 py-3 hover:bg-slate-100 hover:cursor-pointer rounded-md text-[#000] no-underline block"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default SideBar;
