import { create } from "zustand";
import {
  addPromotion,
  deletePromotion,
  editPromotion,
  getPromotion,
  getPromotionById,
} from "../api/promotion-api";

const usePromotionStore = create((set) => ({
  promotions: [],totalCount:0,

  fetchPromotion: async (type,filter) => {
    const allData = await getPromotion(type,filter);
    set({ promotions: allData?.data || [] });
    set({ totalCount: allData?.totalCount || 0 });
  },
  addPromotions: async (data) => {
    await addPromotion(data);
  },
  deletePromotions: async (id) => {
    await deletePromotion(id);
  },
  fetchPromotionById: async (type, id) => {
    const allData = await getPromotionById(type, id);
    set({ promotions: allData?.data || [] });
  },
  updatePromotion: async (id, data) => {
    await editPromotion(id, data);
  },
}));

export { usePromotionStore };
