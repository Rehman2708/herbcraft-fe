import { create } from "zustand";

interface IProductStore {
  gettingProducts: boolean;
  getProducts: () => void;
}

const useProductStore = create<IProductStore>((set) => ({
  gettingProducts: false,
  getProducts: () => {
    set((state) => ({ gettingProducts: !state.gettingProducts }));
  },
}));

export default useProductStore;
