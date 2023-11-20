import Profile from "../../../components/Profile";
import { useAppSelector } from "../../../hooks/redux";

const Home = () => {
  const user = useAppSelector((state) => state.app.user)!;

  return (
    <div>
      <h1 className="text-center">
        Hello {user.username}, welcome to home page
      </h1>
      <Profile />
    </div>
  );
};

export default Home;
