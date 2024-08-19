import { create } from "zustand";
import { addAppNotification, addEmailNotification, getNotification } from "../api/notification-api";

const useNotificationStore = create((set) => ({
  notifications: [],

  fetchNotification: async () => {
    const allData = await getNotification();
    set({ notifications: allData?.data || [] });
  },
  addAppNotifications: async (data) => {
    await addAppNotification(data);
  },
  addEmailNotifications: async (data) => {
    await addEmailNotification(data);
  },
}));

export { useNotificationStore };
