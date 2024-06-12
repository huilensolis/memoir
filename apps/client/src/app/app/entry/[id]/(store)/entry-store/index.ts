import { create } from "zustand";

type TState = "up to date" | "waiting" | "saving" | "error";

type TEntryStore = {
  entryId: string | null;
  setEntryId: (entryId: string) => void;
  state: TState;
  setState: (state: TState) => void;
};

export const useEntryStore = create<TEntryStore>((set, get) => ({
  entryId: null,
  setEntryId: (entryId) => {
    set({ entryId });
  },
  state: "up to date",
  setState: (state) => {
    set({ state });
  },
}));
