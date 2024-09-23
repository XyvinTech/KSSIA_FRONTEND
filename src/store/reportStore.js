import { create } from "zustand";
import { getReport } from "../api/report-api";

const useReportStore = create((set) => ({
  reports: [],

  fetchReport: async (type) => {
    const allData = await getReport(type);
    set({ reports: allData?.data || [] });
  },
}));

export { useReportStore };
