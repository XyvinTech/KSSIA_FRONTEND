import axiosInstance from "./axios-interceptor";

export const getReport = async (filter) => {
  try {
    const response = await axiosInstance.get(`/report`, {
      params: filter,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
export const deleteReport = async (id) => {
  try {
    const response = await axiosInstance.delete(`/report/${id}`);

    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
  }
};
export const getReportById = async (id) => {
  try {
    const response = await axiosInstance.get(`/report/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
