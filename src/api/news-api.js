import { toast } from "react-toastify";
import axiosInstance from "./axios-interceptor";

export const getNews = async (filter) => {
  try {
    const response = await axiosInstance.get("/news", {
      params: filter,
    });
    return response.data;
  } catch (error) {
    return null;
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
    const response = await axiosInstance.post("/news", data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const deleteNews = async (id) => {
  try {
    const response = await axiosInstance.delete(`/news/${id}`);
    
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
  }
};
