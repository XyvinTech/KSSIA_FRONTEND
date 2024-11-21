import { create } from "zustand";
import {
  createMember,
  deleteUser,
  getPaymentByUserId,
  getSubscriptionsByUserId,
  getUserById,
  suspendUser,
  updateSubscription,
  updateUser,
} from "../api/members-api";

const useMemberStore = create((set) => ({
  payments: [],
  member: [],
  loadings: false,
  payment: [],
  totalCount: 0,
  memberStatus: "",
  refreshMembers: false,
  setStatus: (newStatus) => set({ memberStatus: newStatus }), 
  addMembers: async (data) => {
    await createMember(data);
  },
  fetchPaymentByUser: async (id,filter) => {
    const allData = await getPaymentByUserId(id,filter);
    set({ payments: allData?.data || [] });
    set({ totalCount: allData?.totalCount || 0 });
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
  subscription: async (id, data) => {
    await updateSubscription(id,data);
  },
  setRefreshMember: () =>
    set((state) => ({ refreshMembers: !state.refreshMembers })),
}));

export { useMemberStore };
