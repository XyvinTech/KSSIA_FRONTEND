import axiosInstance from "./axios-interceptor";

export const addRequirement = async (data) => {
  try {
    const response = await axiosInstance.post(`/requirements`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteRequirement = async (id) => {
  try {
    const response = await axiosInstance.delete(`/requirements/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
