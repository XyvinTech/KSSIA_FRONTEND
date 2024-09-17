import { create } from "zustand";
import {
  cancelEvent,
  getEventById,
  getEventHistory,
  postponeEvent,
  updateEventById,
} from "../api/events-api";

const useEventStore = create((set) => ({
  events: [],
  loadings: false,
  fetchEventById: async (id) => {
    set({ loadings: true });
    const allData = await getEventById(id);
    set({ events: allData?.data || [] });
    set({ loadings: false });
  },
  updateEvent: async (id, data) => {
    await updateEventById(id, data);
  },
  postpone: async (id, data) => {
    await postponeEvent(id, data);
  },
  cancel: async (id) => {
    await cancelEvent(id);
  },
  eventHistory: async () => {
    const allData = await getEventHistory();
    set({ events: allData?.data || [] });
  },
}));

export { useEventStore };
