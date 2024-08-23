import { create } from "zustand";
import { addPayment, deletePayment, editPayment, getPayment, getPaymentById, patchPayment } from "../api/payment-api";


const usePaymentStore = create((set) => ({
  payments: [],
payment: [],
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
    const allData = await getPaymentById(id);
    set({ payment: allData?.data || [] });
  },
  updatePayment: async (id, data) => {
    await editPayment(id, data);
  },
  patchPayments: async (id, data) => {
    await patchPayment(id, data);
  },
}));

export { usePaymentStore };
