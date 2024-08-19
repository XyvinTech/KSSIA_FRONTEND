import { create } from "zustand";
import {
  addPromotion,
  deletePromotion,
  getPromotion,
} from "../api/promotion-api";

const usePromotionStore = create((set) => ({
  promotions: [],

  fetchPromotion: async () => {
    const allData = await getPromotion();
    set({ promotions: allData?.data || [] });
  },
  addPromotions: async (data) => {
    await addPromotion(data);
  },
  deletePromotions: async (id) => {
    await deletePromotion(id);
  },
}));

export { usePromotionStore };
