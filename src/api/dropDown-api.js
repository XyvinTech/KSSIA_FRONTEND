import axiosInstance from "./axios-interceptor";

export const getUsers = async () => {
    try {
      const response = await axiosInstance.get("/admin/users");
      return response.data;
    } catch (error) {
      throw error;
    }
  };