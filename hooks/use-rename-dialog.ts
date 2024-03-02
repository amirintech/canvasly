import { create } from "zustand";

const defaultState = { id: "", name: "" };

interface Store {
  state: typeof defaultState;
  onOpen: (id: string, name: string) => void;
  onClose: () => void;
  isOpen: boolean;
  name: string;
  setName: (name: string) => void;
}

const useRenameDialog = create<Store>((set) => ({
  state: defaultState,
  onOpen: (id, name) => set({ state: { id, name }, name, isOpen: true }),
  onClose: () => set({ state: defaultState, name: "", isOpen: false }),
  isOpen: false,
  name: "",
  setName: (name) => set({ name }),
}));

export default useRenameDialog;
