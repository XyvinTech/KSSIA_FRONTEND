import { create } from "zustand";
import { deleteReport, getReport, getReportById } from "../api/report-api";

const useReportStore = create((set) => ({
  reports: [],
  totalCount: 0,
  report: [],
  fetchReport: async (filter) => {
    const allData = await getReport(filter);
    set({ reports: allData?.data || [] });
    set({ totalCount: allData?.totalCount || 0 });
  },
  fetchReportById: async (id) => {
    const allData = await getReportById(id);
    set({ report: allData?.data });
  },
  deleteReports: async (id) => {
    await deleteReport(id);
  },
}));

export { useReportStore };
