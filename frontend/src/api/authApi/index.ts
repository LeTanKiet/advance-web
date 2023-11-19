import { LoginProps, SignUpProps } from "../../types/auth";
import axiosClient from "../axiosClient";

const PREFIX = "/auth";

const authApi = {
  signUp: (data: SignUpProps) => axiosClient.post(`${PREFIX}/register`, data),
  login: (data: LoginProps) => axiosClient.post(`${PREFIX}/login`, data),
  updateProfile: (data: any, options: any) =>
    axiosClient.put(`${PREFIX}/profile`, data, options),
};

export default authApi;
