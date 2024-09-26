import { create } from "zustand";
import { getUsers } from "../api/dropDown-api";
import { fetchRole } from "../api/role-api";

const useDropDownStore = create((set) => ({
  users: [],
  roles: [],
  fetchUsers: async (filter) => {
    const allData = await getUsers(filter);
    set({ users: allData?.data || [] });
  },
  fetchRoles: async () => {
    const allData = await fetchRole();
    set({ roles: allData?.data || [] });
  },
}));

export { useDropDownStore };
