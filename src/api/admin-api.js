import axios from "axios";
import { toast } from "react-toastify";

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
