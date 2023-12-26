import { LoginProps, SignUpProps } from "../../types/auth";
import axiosClient from "../axiosClient";

const PREFIX = "/auth";

const authApi = {
  signUp: (data: SignUpProps) => axiosClient.post(`${PREFIX}/sign-up`, data),
  login: (data: LoginProps) => axiosClient.post(`${PREFIX}/login`, data),
  updateProfile: (data: unknown) =>
    axiosClient.patch(`${PREFIX}/profile`, data),
  fetchCurrentUser: () => axiosClient.get(`${PREFIX}/me`),
  logout: () => axiosClient.post(`${PREFIX}/logout`),
};

export default authApi;
