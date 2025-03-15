import { toast } from "react-toastify";
import axiosInstance from "./axios-interceptor";

export const updatefile = async (data) => {
  try {
    const response = await axiosInstance.put(`/files/upload`, data)
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
