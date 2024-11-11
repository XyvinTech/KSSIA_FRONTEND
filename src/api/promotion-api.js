import { toast } from "react-toastify";
import axiosInstance from "./axios-interceptor";

export const getPromotion = async (type, filter) => {
  try {
    const response = await axiosInstance.get(`/promotions/${type}`, {
      params: filter,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const addPromotion = async (data) => {
  try {
    const response = await axiosInstance.post("/promotions", data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getPromotionById = async (type, id) => {
  try {
    const response = await axiosInstance.get(`/promotions/${type}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deletePromotion = async (id) => {
  try {
    const response = await axiosInstance.delete(`/promotions/${id}`);

    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
  }
};
export const editPromotion = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/promotions/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
