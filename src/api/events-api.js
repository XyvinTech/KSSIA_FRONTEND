import { toast } from "react-toastify";
import axiosInstance from "./axios-interceptor";

export const getEvents = async (filter) => {
  try {
    const response = await axiosInstance.get("/events", {
      params: filter, 
    });
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await axiosInstance.post("/events", eventData);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getEventById = async (id) => {
  try {
    const response = await axiosInstance.get(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};

export const deleteEventById = async (id) => {
  try {
    const response = await axiosInstance.delete(`/events/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};

export const updateEventById = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/events/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const postponeEvent = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/events/${id}/postpond`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    console.error("Error caught:", error);
  }
};
export const cancelEvent = async (id) => {
  try {
    const response = await axiosInstance.put(`/events/${id}/cancel`);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    console.error("Error caught:", error);
  }
};
export const getEventHistory = async (filter) => {
  try {
    const response = await axiosInstance.get("/events/get/history", {
      params: filter,
    });
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};
