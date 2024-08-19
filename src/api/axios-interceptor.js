import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1"
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