import { useAppSelector } from "../../../hooks/redux";
import LogoutButton from "../../../components/LogoutButton";
import Profile from "../../../components/Profile";
import { Link } from "react-router-dom";
import { USER_ROUTES } from "../../../routes/constants";
import { Button } from "antd";

const Home = () => {
  const user = useAppSelector((state) => state.app.user)!;

  return (
    <div>
      <h1>Hello {user.username}</h1>
      <Profile />
      <LogoutButton />
      <Link to={USER_ROUTES.landingPage} className="ml-8">
        <Button type="primary">Landing Page</Button>
      </Link>
    </div>
  );
};

export default Home;
