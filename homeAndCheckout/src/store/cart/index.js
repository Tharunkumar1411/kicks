import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      setCartItems: (details) => {
        set((state) => ({
            cartItems: [...state.cartItems, details],
        }));
      }
    }),
    {
      name: "home-storage",
      getStorage: () => sessionStorage,
    }
  )
);

export default useCartStore;