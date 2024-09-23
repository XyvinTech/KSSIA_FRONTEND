import { create } from "zustand";
import {
  createMember,
  deleteUser,
  getPaymentByUserId,
  getSubscriptionsByUserId,
  getUserById,
  suspendUser,
  updateUser,
} from "../api/members-api";

const useMemberStore = create((set) => ({
  payments: [],
  member: [],
  loadings: false,
  payment: [],
  addMembers: async (data) => {
    await createMember(data);
  },
  fetchPaymentByUser: async (id) => {
    const allData = await getPaymentByUserId(id);
    set({ payments: allData?.data || [] });
  },

  fetchUserById: async (id) => {
    set({ loadings: true });
    const allData = await getUserById(id);
    set({ member: allData?.data || [] });
    set({ loadings: false });
  },
  editUser: async (id, data) => {
    await updateUser(id, data);
  },
  suspend: async (id) => {
    await suspendUser(id);
  },
  deleteUsers: async (id) => {
    await deleteUser(id);
  },
}));

export { useMemberStore };
