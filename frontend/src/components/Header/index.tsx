import { Link, useLocation } from "react-router-dom";
import CreateButton from "./CreateButton";
import Profile from "./Profile";
import { useAppSelector } from "../../hooks/redux";
import { Role } from "../../utils/enum";

const Header = () => {
  const user = useAppSelector((state) => state.app.user);
  const { pathname } = useLocation();

  return (
    <div
      className="flex justify-between p-4"
      style={{
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Link
        to="/"
        className="flex items-center gap-2  no-underline text-[#3c4043]"
      >
        <img
          src="https://www.gstatic.com/classroom/logo_square_rounded.svg"
          alt=""
          className="w-10 h-10 object-cover"
        />
        <span className="text-[24px]">Classroom</span>
      </Link>

      <div className="flex gap-2 items-center">
        {user?.role !== Role.ADMIN &&
          (pathname === "/" || pathname.includes("classes")) && (
            <CreateButton
              hasCreate={pathname === "/" && user?.role === Role.TEACHER}
              hasJoin={pathname === "/"}
              hasInvitation={pathname !== "/"}
            />
          )}

        <Profile />
      </div>
    </div>
  );
};

export default Header;
