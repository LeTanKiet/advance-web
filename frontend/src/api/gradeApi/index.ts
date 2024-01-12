import axiosClient from "../axiosClient";

const PREFIX = "/grades";

const gradeApi = {
  getAll: (classId: number): Promise<any> =>
    axiosClient.get(`${PREFIX}?classId=${classId}`),
  create: (body: any): Promise<any> => axiosClient.post(`${PREFIX}`, body),
  update: (classId: number, body: any): Promise<any> =>
    axiosClient.put(`${PREFIX}/${classId}`, body),
  delete: (classId: number): Promise<any> =>
    axiosClient.delete(`${PREFIX}/${classId}`),
};

export default gradeApi;
