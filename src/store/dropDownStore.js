import { create } from "zustand";
import { getUsers } from "../api/dropDown-api";

const useDropDownStore = create((set) => ({
  users: [],

  fetchUsers: async () => {
    const allData = await getUsers();
    set({ users: allData?.data || [] });
  },
}));

export { useDropDownStore };
