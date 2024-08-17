import axios from "axios";
import CONSTANTS from "../constants";
const axiosInstance = axios.create({
  baseURL: CONSTANTS.BASE_URL
//   baseURL: "https://support.acuteangle.io/"
});
axiosInstance.interceptors.request.use(
  config => {
    const token = 'qwertyuiolkjhgfdsdfghjklkjhgfdfghjk';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;