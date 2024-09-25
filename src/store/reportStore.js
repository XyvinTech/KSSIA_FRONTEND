import { create } from "zustand";
import { getReport } from "../api/report-api";

const useReportStore = create((set) => ({
  reports: [],
totalCount: 0,
  fetchReport: async (filter) => {
    const allData = await getReport(filter);
    set({ reports: allData?.data || [] });
    set({ totalCount: allData?.totalCount || 0 });
  },
}));

export { useReportStore };
