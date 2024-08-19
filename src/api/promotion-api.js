import { toast } from "react-toastify";
import axiosInstance from "./axios-interceptor";

export const getPromotion = async () => {
  try {
    const response = await axiosInstance.get("/promotions");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addPromotion = async (data) => {
  try {
    const response = await axiosInstance.post("/promotions", data, {
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
export const getPromotionById = async (id) => {
  try {
    const response = await axiosInstance.get(`/promotions/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deletePromotion = async (id) => {
  try {
    const response = await axiosInstance.delete(`/promotions/${id}`);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const editPromotion = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/promotions/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};