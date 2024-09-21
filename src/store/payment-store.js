import { create } from "zustand";
import {
  addPayment,
  deletePayment,
  editPayment,
  editSubscription,
  getPayment,
  getPaymentById,
  patchPayment,
} from "../api/payment-api";

const usePaymentStore = create((set) => ({
  payments: [],
  payment: [],
  loadings: false,
  fetchPayment: async () => {
    const allData = await getPayment();
    set({ payments: allData?.data || [] });
  },
  addPayments: async (data) => {
    await addPayment(data);
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
  patchPayments: async (id, data) => {
    await patchPayment(id, data);
  },
}));

export { usePaymentStore };
