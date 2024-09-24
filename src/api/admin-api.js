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
    const response = await axiosInstance.get(`/auth`);
    return response.data;
  } catch (error) {
    return null;
  }
};