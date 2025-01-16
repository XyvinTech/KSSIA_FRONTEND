import { create } from "zustand";
import {
  addParentSub,
  addPayment,
  deletePayment,
  editPayment,
  editSubscription,
  getParentSub,
  getPayment,
  getPaymentById,
  patchPayment,
} from "../api/payment-api";
import { getSubscriptionsByUserId } from "../api/members-api";

const usePaymentStore = create((set) => ({
  payments: [],
  payment: [],cards : [],
  loadings: false,
  totalCount: 0,
  refreshMember: false,
  fetchPayment: async (filter) => {
    const allData = await getPayment(filter);
    set({ payments: allData?.data || [] });
    set({ totalCount: allData?.totalCount || 0 });
  },
  fetchParentSub: async () => {
    const allData = await getParentSub();
    set({ payments: allData?.data || [] });
    set({ totalCount: allData?.totalCount || 0 });
  },
  addPayments: async (data) => {
    await addPayment(data);
  },
  addParentSubscription: async (data) => {
    await addParentSub(data);
  },
  deletePayments: async (id) => {
    await deletePayment(id);
  },
  fetchPaymentById: async (id) => {
    set({ loadings: true });
    const allData = await getPaymentById(id);
    set({ payment: allData?.data || [] });
    set({ loadings: false });
  },
 

  updatePayment: async (id, data) => {
    await editPayment(id, data);
  },
  changePayment: async (id, data) => {
   await editSubscription(id, data);
  },
  fetchsubscriptionByUser: async (id) => {
    const allData = await getSubscriptionsByUserId(id);
    set({ cards: allData?.data || [] });
  },
  patchPayments: async (id, data) => {
    await patchPayment(id, data);
  },
  setRefreshMember: () =>
    set((state) => ({ refreshMember: !state.refreshMember })),
}));

export { usePaymentStore };
