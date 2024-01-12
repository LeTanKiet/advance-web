import { useEffect } from "react";
import AppRoutes from "./routes";
import { useQuery } from "@tanstack/react-query";
import authApi from "./api/authApi";
import { useAppDispatch } from "./hooks/redux";
import { appActions } from "./redux/app/slice";
import { NotificationContext } from "./contexts/notification";
import { notification } from "antd";

function App() {
  const dispatch = useAppDispatch();
  const [apiNotification, contextHolder] = notification.useNotification();

  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: authApi.fetchCurrentUser,
  });

  useEffect(() => {
    if (data) {
      dispatch(appActions.setUser(data));
    }
  }, [data, dispatch]);

  return (
    <NotificationContext.Provider value={apiNotification}>
      {contextHolder}
      <AppRoutes />
    </NotificationContext.Provider>
  );
}

export default App;
