import { toast } from "react-toastify";
import axiosInstance from "./axios-interceptor";

export const getApprovalById = async (id) => {
  try {
    const response = await axiosInstance.get(`/requirements/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getSingleApproval = async (id) => {
  try {
    const response = await axiosInstance.get(`/requirements/single/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getApproval = async (filter) => {
  try {
    const response = await axiosInstance.get(`/requirements/admin`, {
      params: filter,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
export const patchApproval = async (id, data) => {
  try {
    const response = await axiosInstance.patch(
      `/requirements/${id}/status`,
      data
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
