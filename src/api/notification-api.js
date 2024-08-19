import { toast } from "react-toastify";
import axiosInstance from "./axios-interceptor";

export const getNotification = async () => {
  try {
    const response = await axiosInstance.get("/notification/in-app");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addAppNotification = async (data) => {
  try {
    const response = await axiosInstance.post("/notification/in-app", data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const addEmailNotification = async (data) => {
    try {
      const response = await axiosInstance.post("/notification/email", data);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
