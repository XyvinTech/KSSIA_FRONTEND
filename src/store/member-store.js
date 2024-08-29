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
  addMembers: async (data) => {
    await createMember(data);
  },
  fetchPaymentByUser: async (id) => {
    const allData = await getPaymentByUserId(id);
    set({ payments: allData?.data || [] });
  },
  
  fetchsubscriptionByUser: async (id) => {
    const allData = await getSubscriptionsByUserId(id);
    set({ payments: allData?.data || [] });
  },

  fetchUserById: async (id) => {
    const allData = await getUserById(id);
    set({ member: allData?.data || [] });
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
