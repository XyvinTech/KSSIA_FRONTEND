import { create } from "zustand";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProductById,
  patchProduct,
} from "../api/product-api";

const useProductsStore = create((set) => ({
  products: [],
  loadings: false,
  addProducts: async (data) => {
    await addProduct(data);
  },
  deleteProducts: async (id) => {
    await deleteProduct(id);
  },
  fetchProductById: async (id) => {
    set({ loadings: true });
    const allData = await getProductById(id);
    set({ products: allData?.data || [] });
    set({ loadings: false });
  },
  updateProduct: async (id, data) => {
    await editProduct(id, data);
  },
  patchProducts: async (id, data) => {
    await patchProduct(id, data);
  },
}));

export { useProductsStore };
