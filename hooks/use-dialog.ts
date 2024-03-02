import { create } from "zustand";

type DialogType = "createBoard" | null;

interface Store {
  type: DialogType;
  isOpen: boolean;
  onOpen: (type: DialogType, data?: any) => void;
  onClose: () => void;
  data?: any;
}

const useDialog = create<Store>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type: DialogType, data?: any) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null }),
  data: undefined,
}));

export default useDialog;
