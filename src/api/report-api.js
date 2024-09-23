import axiosInstance from "./axios-interceptor";

export const getReport = async () => {
  try {
    const response = await axiosInstance.get(`/report`);
    return response.data;
  } catch (error) {
    return null;
  }
};
