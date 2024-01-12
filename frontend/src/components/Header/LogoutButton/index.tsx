import { Button } from "antd";
import { useAppDispatch } from "../../../hooks/redux";
import { appActions } from "../../../redux/app/slice";
import { useMutation } from "@tanstack/react-query";
import authApi from "../../../api/authApi";
import { useNavigate } from "react-router-dom";
import { PUBLIC_ROUTES } from "../../../routes/constants";

const LogoutButton = () => {
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

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
