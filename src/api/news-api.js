import { toast } from "react-toastify";
import axiosInstance from "./axios-interceptor";

export const getNews = async () => {
  try {
    const response = await axiosInstance.get("/news");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getNewsById = async (id) => {
  try {
    const response = await axiosInstance.get(`/news/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const editNews = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/news/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const addNews = async (data) => {
  try {
    const response = await axiosInstance.post("/news", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const deleteNews = async (id) => {
  try {
    const response = await axiosInstance.delete(`/news/${id}`);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
