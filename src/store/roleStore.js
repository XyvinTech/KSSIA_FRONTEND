import { create } from "zustand";
import {
  createRole,
  deleteRole,
  editRole,
  fetchListofRoleById,
  fetchRole,
} from "../api/role-api";

const useRoleStore = create((set) => ({
  roles: [],
  singleRole: [],
  totalCount: 0,
  addRole: async (data) => {
    await createRole(data);
  },
  getRoles: async (filter) => {
    const response = await fetchRole(filter);
    set({ roles: response.data || [] });
    set({ totalCount: response?.totalCount || 0 });
  },

  getRoleById: async (id) => {
    const response = await fetchListofRoleById(id);
    set({ singleRole: response.data || [] });
  },
  updateRole: async (id, data) => {
    await editRole(id, data);
  },
  deleteRoles: async (id) => {
    await deleteRole(id);
  },
}));

export { useRoleStore };
