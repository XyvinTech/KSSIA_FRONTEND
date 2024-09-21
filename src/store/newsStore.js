import { create } from "zustand";
import {
  addNews,
  deleteNews,
  editNews,
  getNews,
  getNewsById,
} from "../api/news-api";

const useNewsStore = create((set) => ({
  news: [],
  singleNews: [],
  totalCount: 0,
  fetchNews: async () => {
    const allData = await getNews();
    set({ news: allData?.data || [] });
    set({ totalCount: allData?.totalCount || 0 });
  },
  addNewses: async (data) => {
    await addNews(data);
  },
  updateNews: async (id, data) => {
    await editNews(id, data);
  },
  fetchNewsById: async (id) => {
    const allData = await getNewsById(id);

    set({ singleNews: allData?.data });
  },
  deleteNews: async (id) => {
    await deleteNews(id);
  },
}));

export { useNewsStore };
