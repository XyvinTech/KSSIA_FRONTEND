import { create } from "zustand";
import { addRequirement, deleteRequirement } from "../api/requirementapi";

const useRequirementStore = create((set) => ({
  createRequirement: async (data) => {
    await addRequirement(data);
  },
  deleteRequiremnts: async (id) => {
    await deleteRequirement(id);
  },

}));

export default useRequirementStore;
