import axiosInstance from "./axios-interceptor";

export const getDashboard = async (month, year) => {
  try {
    const response = await axiosInstance.get(`/dashboard/statistics/${month}/${year}`);
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};
