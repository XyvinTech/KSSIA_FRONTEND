import { toast } from "react-toastify";
import axiosInstance from "./axios-interceptor";

export const getPayment = async () => {
  try {
    const response = await axiosInstance.get(`/payments`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const addPayment = async (data) => {
  try {
    const response = await axiosInstance.post("/payments", data, {
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
export const getPaymentById = async (id) => {
  try {
    const response = await axiosInstance.get(`/payments/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deletePayment = async (id) => {
  try {
    const response = await axiosInstance.delete(`/payments/${id}`);
    
    return response.data;
  } catch (error) {
  console.error(error.response.data.message);
  }
};
export const editPayment = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/payments/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const editSubscription = async (id, data) => {
  try {
    const response = await axiosInstance.put(
      `/payments/${id}/subscription`,
      data
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const patchPayment = async (id, data) => {
  try {
    const response = await axiosInstance.patch(`/payments/${id}/status`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "An error occurred");
    throw error;
  }
};
