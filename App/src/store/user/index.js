import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set, get) => ({
      userDetails: {},

      setUserDetails: (details) => {
        set({ userDetails: details });
      },

      clearUserDetails: () => {
        set({ userDetails: {} });
      },
    }),
    {
      name: "user-storage", // key in storage
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useUserStore;
