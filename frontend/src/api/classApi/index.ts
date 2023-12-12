import { TClass } from "./../../types/class";
import axiosClient from "../axiosClient";

const PREFIX = "/classes";

const classApi = {
  getAll: (): Promise<TClass[]> => axiosClient.get(`${PREFIX}`),
  create: (body: TClass): Promise<TClass[]> =>
    axiosClient.post(`${PREFIX}`, body),
  joinClass: (body: any) => axiosClient.post(`${PREFIX}/join`, body),
};

export default classApi;
