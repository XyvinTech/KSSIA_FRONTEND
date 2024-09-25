import { create } from "zustand";
import {
  createAdmin,
  deleteAdmin,
  editAdmin,
  getAdminById,
  getAllAdmin,
  getSingleAdmin,
} from "../api/admin-api";

const useAdminStore = create((set) => ({
  singleAdmin: [],
  admins: [],
  admin: [],
  loadings: false,
  totalCount : 0,
  fetchAdminById: async () => {
    const response = await getAdminById();
    set({ singleAdmin: response.data || [] });
  },
  fetchAdmins: async (filter) => {
    const response = await getAllAdmin(filter);
    set({ admins: response.data || [] });
    set ({ totalCount : response?.totalCount || 0 })
  },
  addAdmin: async (data) => {
    await createAdmin(data);
  },
  fetchSingleAdmin: async (id) => {
    set({ loadings: true });
    const allData = await getSingleAdmin(id);
    set({ admin: allData?.data || [] });
    set({ loadings: false });
  },
  updateAdmin: async (id, data) => {
    await editAdmin(id, data);
  },
  deleteAdmins: async (id) => {
    await deleteAdmin(id);
  },
}));

export { useAdminStore };
