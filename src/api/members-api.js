import { toast } from "react-toastify";
import axiosInstance from "./axios-interceptor";

export const createMember = async (memberData) => {
  try {
    const response = await axiosInstance.post("/admin/users", memberData);
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};
export const getPaymentByUserId = async (id) => {
  try {
    const response = await axiosInstance.get(`/payments/user/${id}`);
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
    toast.error(error.response.data.message);
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
