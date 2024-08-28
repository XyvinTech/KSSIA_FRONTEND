import { create } from "zustand";
import {
  createMember,
  getPaymentByUserId,
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
}));

export { useMemberStore };
