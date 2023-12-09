import { useEffect } from "react";
import AppRoutes from "./routes";
import { useQuery } from "@tanstack/react-query";
import authApi from "./api/authApi";
import { useAppDispatch } from "./hooks/redux";
import { appActions } from "./redux/app/slice";

function App() {
  const dispatch = useAppDispatch();
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: authApi.fetchCurrentUser,
  });

  useEffect(() => {
    if (data) {
      dispatch(appActions.setUser(data));
    }
  }, [data, dispatch]);

  return <AppRoutes />;
}

export default App;
