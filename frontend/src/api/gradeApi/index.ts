import axiosClient from "../axiosClient";

const PREFIX = "/grades";

const gradeApi = {
  getAll: (classId: number, studentId?: string): Promise<any> =>
    axiosClient.get(
      `${PREFIX}?classId=${classId}&studentId=${studentId || ""}`
    ),
  create: (body: any): Promise<any> => axiosClient.post(`${PREFIX}`, body),
  updateScore: (studentId: number, body: any): Promise<any> =>
    axiosClient.put(`${PREFIX}/${studentId}`, body),

  update: (classId: number, body: any): Promise<any> =>
    axiosClient.put(`${PREFIX}/grade/${classId}`, body),
  delete: (studentId: number, gradeName: string): Promise<any> =>
    axiosClient.delete(
      `${PREFIX}?studentId=${studentId || ""}&gradeName=${gradeName}`
    ),

  requestReview: (studentId: string): Promise<any> =>
    axiosClient.post(`${PREFIX}/review/${studentId}`),

  finalize: (classId: number, gradeName: string): Promise<any> =>
    axiosClient.post(`${PREFIX}/finalize/${classId}?gradeName=${gradeName}`),
};

export default gradeApi;
