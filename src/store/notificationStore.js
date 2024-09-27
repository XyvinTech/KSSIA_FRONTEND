import { create } from "zustand";
import { addAppNotification, addEmailNotification, deleteNotification, getNotification } from "../api/notification-api";

const useNotificationStore = create((set) => ({
  notifications: [],
totalCount: 0,
  fetchNotification: async (filter) => {
    const allData = await getNotification(filter);
    set({ notifications: allData?.data || [] });
    set({ totalCount: allData?.totalCount || 0 });
  },
  addAppNotifications: async (data) => {
    await addAppNotification(data);
  },
  addEmailNotifications: async (data) => {
    await addEmailNotification(data);
  },
  deleteNotifications: async (id) => {
    await deleteNotification(id);
  },
}));

export { useNotificationStore };
