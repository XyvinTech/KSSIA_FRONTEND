import { toast } from "react-toastify";
import axiosInstance from "./axios-interceptor";

export const getPayment = async (filter) => {
  try {
    const response = await axiosInstance.get(`/payments`, {
      params: filter,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const addPayment = async (data) => {
  try {
    const response = await axiosInstance.post("/payments", data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getPaymentById = async (id) => {
  try {
    const response = await axiosInstance.get(`/payments/user/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getSubById = async (id) => {
  try {
    const response = await axiosInstance.get(`/payments/parent-subscription/${id}`);
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
    const response = await axiosInstance.put(`/payments/update/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const editPaymentSub = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/payments/parent-subscription/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
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
    throw error.response.data;
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
export const addParentSub = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/payments/parent-subscription",
      data
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getParentSub = async () => {
  try {
    const response = await axiosInstance.get(`/payments/parent-subscription`);
    return response.data;
  } catch (error) {
    return null;
  }
};
