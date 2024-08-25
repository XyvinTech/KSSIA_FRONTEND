import { create } from "zustand";
import { getPaymentByUserId } from "../api/members-api";

const useMemberStore = create((set) => ({
  payments: [],

  fetchPaymentByUser: async (id) => {
    const allData = await getPaymentByUserId(id);
    set({ payments: allData?.data || [] });
  },
}));

export { useMemberStore };
