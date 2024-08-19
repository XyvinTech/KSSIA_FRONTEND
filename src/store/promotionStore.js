import { create } from "zustand";
import {
  addPromotion,
  deletePromotion,
  editPromotion,
  getPromotion,
  getPromotionById,
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
  fetchPromotionById: async (id) => {
    const allData = await getPromotionById(id);
    set({ promotions: allData?.data || [] });
  },
  updatePromotion: async (id, data) => {
    await editPromotion(id, data);
  },
}));

export { usePromotionStore };
