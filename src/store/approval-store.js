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
  approvalByUser: [],
  fetchApproval: async (filter) => {
    const allData = await getApproval(filter);
    set({ approvals: allData?.data || [] });
    set({ totalCount: allData?.totalCount || 0 });
  },
  fetchApprovalByUser: async (id,filter) => {
    const allData = await getApprovalById(id,filter);
    set({ approvalByUser: allData?.data || [] });
    set({ totalCount: allData?.totalCount || 0 });
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
