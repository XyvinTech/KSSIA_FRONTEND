import axiosInstance from "./axios-interceptor";

export const getUsers = async (filter) => {
    try {
      const response = await axiosInstance.get("/admin/users", {
        params: filter,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };