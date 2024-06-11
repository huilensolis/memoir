import { create } from "zustand";

type TAsideNavStore = {
  canDrawerOpen: boolean;
  closeDrawer: () => void;
  openDrawer: () => void;
};

export const useAsideNavStore = create<TAsideNavStore>((set, get) => ({
  canDrawerOpen: true,
  closeDrawer: () => {
    set({ canDrawerOpen: false });
  },
  openDrawer: () => {
    set({ canDrawerOpen: true });
  },
}));
