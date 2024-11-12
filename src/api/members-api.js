import { toast } from "react-toastify";
import axiosInstance from "./axios-interceptor";

export const createMember = async (memberData) => {
  try {
    const response = await axiosInstance.post("/admin/users", memberData);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getPaymentByUserId = async (id, filter) => {
  try {
    const response = await axiosInstance.get(`/payments/user/${id}`, {
      params: filter,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
export const getSubscriptionsByUserId = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/payments/user/${id}/subscriptions`
    );
    return response.data;
  } catch (error) {
    return null;
  }
};
export const getUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`/admin/users/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};
export const updateUser = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/admin/users/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const suspendUser = async (id) => {
  try {
    const response = await axiosInstance.put(`/admin/users/suspend/${id}`);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`/admin/users/${id}`);

    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
  }
};
export const getSingleUser = async (id) => {
  try {
    const response = await axiosInstance.get(`/user/qr/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getDwld = async () => {
  try {
    const response = await axiosInstance.get(`/admin/download-users`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getDwldProduct = async () => {
  try {
    const response = await axiosInstance.get(`/products/download-products`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateSubscription = async (id, data) => {
  try {
    const response = await axiosInstance.put(
      `/user/subscription/${id}`,
      data
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const addMembersBulk = async (data) => {
  try {
    const response = await axiosInstance.post("/admin/users/bulk", data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
