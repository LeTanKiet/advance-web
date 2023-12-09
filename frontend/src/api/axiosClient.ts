import axios from "axios";
import { SERVER_URL } from "../utils/constants";

const axiosClient = axios.create({
  baseURL: `${SERVER_URL}`,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  withCredentials: true,
});

axiosClient.interceptors.response.use((response) => response.data);

export default axiosClient;
