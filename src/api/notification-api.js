import { toast } from "react-toastify";
import axiosInstance from "./axios-interceptor";

export const getNotification = async (filter) => {
  try {
    const response = await axiosInstance.get("/notification/in-app", {
      params: filter,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
export const getSingleNotification = async (id) => {
  try {
    const response = await axiosInstance.get(`/notification/in-app/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};
export const addAppNotification = async (data) => {
  try {
    const response = await axiosInstance.post("/notification/in-app", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const addEmailNotification = async (data) => {
  try {
    const response = await axiosInstance.post("/notification/email", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const deleteNotification = async (id) => {
  try {
    const response = await axiosInstance.delete(`/notification/in-app/${id}`);

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
