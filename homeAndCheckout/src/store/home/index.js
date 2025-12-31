import { create } from "zustand";
import { persist } from "zustand/middleware";

const useHomeStore = create((set, get) => ({
  homeDetails: {},
  productDetails: {},
  setHomeDetails: (details) => {
    set((state) => ({
      homeDetails: { ...state.homeDetails, ...details },
    }));
  },
  setProductDetails: (details) => {
    set((state) => ({
      productDetails: { ...state.productDetails, ...details },
    }));
  },
}));

export default useHomeStore;
