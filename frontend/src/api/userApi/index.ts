import { TUser } from "../../types/auth";
import axiosClient from "../axiosClient";

const PREFIX = "/users";

const userApi = {
  getAll: (classId: number): Promise<TUser[]> =>
    axiosClient.get(`${PREFIX}?classId=${classId}`),

  getById: (userId: number): Promise<TUser> =>
    axiosClient.get(`${PREFIX}/${userId}`),
};

export default userApi;
