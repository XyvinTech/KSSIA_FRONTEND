import { toast } from "react-toastify";
import axiosInstance from "./axios-interceptor";

export const addProduct = async (data) => {
  try {
    const response = await axiosInstance.post("/products", data, {
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
export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/products/${id}`);

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const editProduct = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/products/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
