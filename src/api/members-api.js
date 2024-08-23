import axiosInstance from "./axios-interceptor";

export const createMember = async (memberData) => {
  try {
    const response = await axiosInstance.post("/members", memberData);
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};
