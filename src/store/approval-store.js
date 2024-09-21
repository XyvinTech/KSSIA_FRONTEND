import { create } from "zustand";
import {
  getApproval,
  getApprovalById,
  getSingleApproval,
  patchApproval,
} from "../api/approval-api";

const useApprovalStore = create((set) => ({
  approvals: [],
  approval: [],
  totalCount: 0,
  fetchApproval: async () => {
    const allData = await getApproval();
    set({ approvals: allData?.data || [] });
    set({ totalCount: allData?.totalCount || 0 });
  },
  fetchApprovalByUser: async (id) => {
    const allData = await getApprovalById(id);
    set({ approvals: allData?.data || [] });
  },
  fetchApprovalById: async (id) => {
    const allData = await getSingleApproval(id);
    set({ approval: allData?.data || [] });
  },
  patchApprovals: async (id, data) => {
    await patchApproval(id, data);
  },
}));

export { useApprovalStore };
