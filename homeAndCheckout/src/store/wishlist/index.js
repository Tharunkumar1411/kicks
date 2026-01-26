import { create } from "zustand";
import { persist } from "zustand/middleware";

const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlistItems: [],

      // Add item to wishlist
      addToWishlist: (product) => {
        const { wishlistItems } = get();
        const exists = wishlistItems.some(
          (item) => item.productId === product.productId
        );

        if (!exists) {
          set({
            wishlistItems: [...wishlistItems, product],
          });
        }
      },

      // Remove item from wishlist
      removeFromWishlist: (productId) => {
        const { wishlistItems } = get();
        set({
          wishlistItems: wishlistItems.filter(
            (item) => item.productId !== productId
          ),
        });
      },

      // Toggle wishlist
      toggleWishlist: (product) => {
        const { wishlistItems, addToWishlist, removeFromWishlist } = get();
        const exists = wishlistItems.some(
          (item) => item.productId === product.productId
        );

        if (exists) {
          removeFromWishlist(product.productId);
        } else {
          addToWishlist(product);
        }
      },

      // Check if product is in wishlist
      isInWishlist: (productId) => {
        const { wishlistItems } = get();
        return wishlistItems.some((item) => item.productId === productId);
      },

      // Clear wishlist
      clearWishlist: () => {
        set({ wishlistItems: [] });
      },
    }),
    {
      name: "wishlist-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useWishlistStore;
