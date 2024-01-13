import { useMutation } from "@tanstack/react-query";
import { Dropdown, Image } from "antd";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../../api/authApi";
import { useAppDispatch } from "../../../hooks/redux";
import { appActions } from "../../../redux/app/slice";
import { PUBLIC_ROUTES, USER_ROUTES } from "../../../routes/constants";

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      dispatch(appActions.setUser(null));
      navigate(PUBLIC_ROUTES.signIn);
    },
  });

  const handleLogout = () => {
    mutate();
  };

  const items = [
    {
      label: <Link to={USER_ROUTES.profile} className="inline-block min-w-[80px]">Profile</Link>,
      key: "0",
    },
    {
      label: <span onClick={handleLogout} className="inline-block min-w-[80px]" >Logout</span>,
      key: "1",
    },
  ];

  return (
    <Dropdown
      menu={{ items: items as any }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <Image
        width={40}
        src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
        className="rounded-[50%] cursor-pointer hover:opacity-60"
        preview={false}
      />
    </Dropdown>
  );
};

export default Profile;
