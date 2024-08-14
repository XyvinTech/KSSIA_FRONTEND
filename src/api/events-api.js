import axiosInstance from "./axios-interceptor";

export const createMember = async (eventData) => {
    try {
      const response = await axiosInstance.post("/events", eventData);
      return response.data; 
    } catch (error) {
      console.error('Error caught:', error);
    }
  };