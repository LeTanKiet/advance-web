import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import {
  ADMIN_ROUTES,
  TEACHER_ROUTES,
  USER_ROUTES,
} from "../../routes/constants";
import { Role } from "../../utils/enum";
import {
  BankOutlined,
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

const ADMIN_MENUS = [
  {
    label: "Classes",
    to: ADMIN_ROUTES.manageClass,
    icon: <BankOutlined style={{ fontSize: 24 }} />,
  },
  {
    label: "Students",
    to: ADMIN_ROUTES.manageStudent,
    icon: <TeamOutlined style={{ fontSize: 24 }} />,
  },
  {
    label: "Profile",
    to: ADMIN_ROUTES.profile,
    icon: <UserOutlined style={{ fontSize: 24 }} />,
  },
];

const USER_MENUS = [
  {
    label: "Home",
    to: USER_ROUTES.home,
    icon: <HomeOutlined style={{ fontSize: 24 }} />,
  },
  {
    label: "Profile",
    to: USER_ROUTES.profile,
    icon: <UserOutlined style={{ fontSize: 24 }} />,
  },
];

const TEACHER_MENUS = [
  {
    label: "Home",
    to: TEACHER_ROUTES.home,
    icon: <HomeOutlined style={{ fontSize: 24 }} />,
  },
  {
    label: "Profile",
    to: TEACHER_ROUTES.profile,
    icon: <UserOutlined style={{ fontSize: 24 }} />,
  },
];

const SideBar = () => {
  const user = useAppSelector((state) => state.app.user);

  let items: any = [];

  switch (user?.role) {
    case Role.STUDENT: {
      items = USER_MENUS;
      break;
    }
    case Role.TEACHER: {
      items = TEACHER_MENUS;
      break;
    }
    case Role.ADMIN: {
      items = ADMIN_MENUS;
      break;
    }
  }

  return (
    <div
      className="min-w-[240px] flex flex-col gap-2 pt-4"
      style={{
        borderRight: "1px solid #e0e0e0",
      }}
    >
      {items.map((item: any) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `px-4 py-3 ${
              isActive ? "bg-gray-100" : ""
            } hover:bg-gray-100 hover:cursor-pointer rounded-md text-[#000] no-underline flex gap-2 items-center font-medium`
          }
          style={{
            borderTopRightRadius: 28,
            borderBottomRightRadius: 28,
          }}
        >
          {item.icon}
          {item.label}
        </NavLink>
      ))}
    </div>
  );
};

export default SideBar;
