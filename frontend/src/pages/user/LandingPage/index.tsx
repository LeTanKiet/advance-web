import { Link } from "react-router-dom";
import { USER_ROUTES } from "../../../routes/constants";
import { Button } from "antd";

const LandingPage = () => {
  return (
    <div>
      Welcome to landing page
      <Link to={USER_ROUTES.home} className="ml-8">
        <Button type="primary">Home page</Button>
      </Link>
    </div>
  );
};

export default LandingPage;
