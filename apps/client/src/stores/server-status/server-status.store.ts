import { create } from "zustand";

type TStatus = "up" | "down";

type TServerStatusStore = {
  serverStatus: TStatus;
  setServerStatus: (newStatus: TStatus) => void;
};

const useServerStatusStore = create<TServerStatusStore>((set, _get) => ({
  serverStatus: "down",
  setServerStatus: (newStatus) => {
    set({ serverStatus: newStatus });
  },
}));

export { useServerStatusStore };
