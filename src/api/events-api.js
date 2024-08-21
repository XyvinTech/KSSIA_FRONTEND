import axiosInstance from "./axios-interceptor";

export const getEvents = async () => {
    try {
      const response = await axiosInstance.get("/events");
      return response.data; 
    } catch (error) {
      console.error('Error caught:', error);
    }
};

export const createEvent = async (eventData) => {
    try {
      const response = await axiosInstance.post("/events",eventData);
      return response.data; 
    } catch (error) {
      console.error('Error caught:', error);
    }
};

export const getEventById = async (id) => {
  try {
    const response = await axiosInstance.get(`/events/${id}`);
    return response.data; 
  } catch (error) {
    console.error('Error caught:', error);
  }
};

export const deleteEventById = async (id) => {
  try {
    const response = await axiosInstance.delete(`/events/${id}`);
    return response.data; 
  } catch (error) {
    console.error('Error caught:', error);
  }
};

export const updateEventById = async (id,data) => {
  try {
    const response = await axiosInstance.put(`/events/${id}`,data);
    return response.data; 
  } catch (error) {
    console.error('Error caught:', error);
  }
};