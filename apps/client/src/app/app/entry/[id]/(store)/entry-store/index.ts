import { create } from "zustand";

type TState = "up to date" | "waiting" | "saving" | "error";

type TEntryStore = {
    entryId: string | null;
    entryTitle: string | null
    getEntryId: () => string | null;
    setEntryId: (entryId: string) => void;
    state: TState;
    setState: (state: TState) => void;
    getState: () => TState;
    setTitle: (title: string) => void
};

export const useEntryStore = create<TEntryStore>((set, get) => ({
    entryId: null,
    entryTitle: null,
    getEntryId: () => get().entryId,
    setEntryId: (entryId: string) => {
        set({ entryId });
    },
    state: "up to date",
    getState: () => get().state,
    setState: (state: TState) => {
        set({ state });
    },
    setTitle: (title: string | null) => { set({ entryTitle: title }) }
}));
