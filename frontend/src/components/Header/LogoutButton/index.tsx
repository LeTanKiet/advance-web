import { Button } from "antd";
import { useAppDispatch } from "../../../hooks/redux";
import { appActions } from "../../../redux/app/slice";
import { useMutation } from "@tanstack/react-query";
import authApi from "../../../api/authApi";

const LogoutButton = () => {
  const dispatch = useAppDispatch();

  const { mutate } = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      dispatch(appActions.setUser(null));
    },
  });

  const handleLogout = () => {
    mutate();
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
