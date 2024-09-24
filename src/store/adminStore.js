import { create } from "zustand";
import { getAdminById, getAllAdmin } from "../api/admin-api";

const useAdminStore = create((set) => ({
  singleAdmin: [],
  admins: [],
  fetchAdminById: async () => {
    const response = await getAdminById();
    set({ singleAdmin: response.data || [] });
  },
  fetchAdmins: async () => {
    const response = await getAllAdmin();
    set({ admins: response.data || [] });
  },
}));

export { useAdminStore };
