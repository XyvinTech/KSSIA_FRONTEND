import { create } from "zustand";
import {
  cancelEvent,
  createEvent,
  getEventById,
  getEventHistory,
  postponeEvent,
  updateEventById,
} from "../api/events-api";

const useEventStore = create((set) => ({
  events: [],
  loadings: false,
  totalCount: 0,
  fetchEventById: async (id) => {
    set({ loadings: true });
    const allData = await getEventById(id);
    set({ events: allData?.data || [] });
    set({ loadings: false });
  },
  addEvent: async (data) => {
    await createEvent(data);
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
    set({ totalCount: allData?.totalCount || 0 });
  },
}));

export { useEventStore };
