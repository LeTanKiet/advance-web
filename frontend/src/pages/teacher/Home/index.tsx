import ClassList from "../../../components/ClassList";
import { useAppSelector } from "../../../hooks/redux";

const Home = () => {
  const user = useAppSelector((state) => state.app.user)!;

  return (
    <div>
      <h1 className="text-center">
        Hello {user.email}, choose a course to teach
      </h1>
      <ClassList />
    </div>
  );
};

export default Home;
