import { TUser } from "../../types/auth";
import axiosClient from "../axiosClient";

const PREFIX = "/users";

const userApi = {
  getAll: (classId?: number): Promise<TUser[]> =>
    axiosClient.get(`${PREFIX}?classId=${classId || ""}`),

  getById: (userId: number): Promise<TUser> =>
    axiosClient.get(`${PREFIX}/${userId}`),

  updateUser: (userId: number, body: any): Promise<TUser> =>
    axiosClient.put(`${PREFIX}/${userId}`, body),
};

export default userApi;
