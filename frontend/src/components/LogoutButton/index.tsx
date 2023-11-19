import { Button } from "antd";
import { useAppDispatch } from "../../hooks/redux";
import { appActions } from "../../redux/app/slice";

const LogoutButton = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(appActions.setUser(null));
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
