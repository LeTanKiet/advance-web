import { LoginProps, SignUpProps } from "../../types/auth";
import axiosClient from "../axiosClient";

const PREFIX = "/auth";

const authApi = {
  signUp: (data: SignUpProps) => axiosClient.post(`${PREFIX}/register`, data),
  login: (data: LoginProps) => axiosClient.post(`${PREFIX}/login`, data),
  updateProfile: (data: unknown) => axiosClient.put(`${PREFIX}/profile`, data),
  fetchCurrentUser: () => axiosClient.get(`${PREFIX}/me`),
};

export default authApi;
