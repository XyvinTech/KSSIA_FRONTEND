import { create } from "zustand";
import { getAdminById } from "../api/admin-api";

const useAdminStore = create((set) => ({
  singleAdmin: [],

  fetchAdminById: async () => {
    const response = await getAdminById();
    console.log("response admin:", response);
    
    set({ singleAdmin: response.data || [] });
  },
}));

export { useAdminStore };
