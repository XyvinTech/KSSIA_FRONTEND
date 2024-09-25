import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "./axios-interceptor";

const baseURL = "http://43.205.89.79/api/v1/";
export const getLogin = async (datas) => {
  try {
    const response = await axios.post(`${baseURL}auth/login`, datas);

    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
  }
};
export const getAdminById = async () => {
  try {
    const response = await axiosInstance.get(`/auth`);
    console.log("response admin", response);
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};
export const getAllAdmin = async () => {
  try {
    const response = await axiosInstance.get(`/auth/all`);
    return response.data;
  } catch (error) {
    return null;
  }
};
export const createAdmin = async (data) => {
  try {
    const response = await axiosInstance.post(`/auth`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getSingleAdmin = async (id) => {
  try {
    const response = await axiosInstance.get(`/auth/admin/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const editAdmin = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/auth/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const deleteAdmin = async (id) => {
  try {
    const response = await axiosInstance.delete(`/auth/${id}`);

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};