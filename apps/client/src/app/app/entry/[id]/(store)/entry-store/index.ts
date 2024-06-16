import { create } from "zustand";

type TState = "up to date" | "waiting" | "saving" | "error";

type TEntryStore = {
  entryId: string | null;
  getEntryId: () => string | null;
  setEntryId: (entryId: string) => void;
  state: TState;
  setState: (state: TState) => void;
  getState: () => TState;
};

export const useEntryStore = create<TEntryStore>((set, get) => ({
  entryId: null,
  getEntryId: () => get().entryId,
  setEntryId: (entryId) => {
    set({ entryId });
  },
  state: "up to date",
  getState: () => get().state,
  setState: (state) => {
    set({ state });
  },
}));
