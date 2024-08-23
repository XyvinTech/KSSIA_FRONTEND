import { create } from "zustand";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProductById,
} from "../api/product-api";

const useProductsStore = create((set) => ({
  products: [],

  addProducts: async (data) => {
    await addProduct(data);
  },
  deleteProducts: async (id) => {
    await deleteProduct(id);
  },
  fetchProductById: async (id) => {
    const allData = await getProductById(id);
    set({ products: allData?.data || [] });
  },
  updateProduct: async (id, data) => {
    await editProduct(id, data);
  },
}));

export { useProductsStore };
