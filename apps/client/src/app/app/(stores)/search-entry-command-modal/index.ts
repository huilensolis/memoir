import { create } from "zustand";

type TSearchEntryModalStore = {
  showModal: boolean;
  toggleModal: () => void;
};

export const useSearchEntryModalStore = create<TSearchEntryModalStore>(
  (set, get) => ({
    showModal: false,
    toggleModal: () => {
      set({ showModal: !get().showModal });
    },
  }),
);
