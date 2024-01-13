import axiosClient from "../axiosClient";

const PREFIX = "/notifications";

const notificationApi = {
  getAll: (classId: number, studentId: string): Promise<any> => {
    return axiosClient.get(
      `${PREFIX}?classId=${classId}&studentId=${studentId || ""}`
    );
  },
};

export default notificationApi;
