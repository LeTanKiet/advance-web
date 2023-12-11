import ClassList from "../../../components/ClassList";
import Profile from "../../../components/Profile";
import { useAppSelector } from "../../../hooks/redux";

const Home = () => {
  const user = useAppSelector((state) => state.app.user)!;

  return (
    <div>
      {/* <h1 className="text-center">Hello {user.email}, welcome to home page</h1> */}
      <h1 className="text-center">
        Hello {user.email}, choose a course to learn
      </h1>
      <ClassList />
    </div>
  );
};

export default Home;
