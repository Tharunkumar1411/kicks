import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      // Add item to cart with full product details
      addToCart: (product) => {
        const { cartItems } = get();
        const existingItemIndex = cartItems.findIndex(
          (item) =>
            item.productId === product.productId &&
            item.size === product.size &&
            item.color === product.color
        );

        if (existingItemIndex !== -1) {
          // Item exists, increase quantity
          const updatedItems = [...cartItems];
          updatedItems[existingItemIndex].quantity += 1;
          set({ cartItems: updatedItems });
        } else {
          // New item, add to cart
          set({
            cartItems: [...cartItems, { ...product, quantity: 1 }]
          });
        }
      },

      // Remove item from cart
      removeFromCart: (productId, size, color) => {
        const { cartItems } = get();
        set({
          cartItems: cartItems.filter(
            (item) =>
              !(item.productId === productId &&
                item.size === size &&
                item.color === color)
          ),
        });
      },

      // Update item quantity
      updateQuantity: (productId, size, color, quantity) => {
        const { cartItems } = get();
        const updatedItems = cartItems.map((item) =>
          item.productId === productId &&
          item.size === size &&
          item.color === color
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        );
        set({ cartItems: updatedItems });
      },

      // Check if product exists in cart
      isInCart: (productId, size, color) => {
        const { cartItems } = get();
        return cartItems.some(
          (item) =>
            item.productId === productId &&
            item.size === size &&
            item.color === color
        );
      },

      // Check if product exists in cart (any size/color)
      isProductInCart: (productId) => {
        const { cartItems } = get();
        return cartItems.some((item) => item.productId === productId);
      },

      // Get total items count
      getTotalItems: () => {
        const { cartItems } = get();
        return cartItems.reduce((total, item) => total + item.quantity, 0);
      },

      // Get cart total price
      getCartTotal: () => {
        const { cartItems } = get();
        return cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      // Clear cart
      clearCart: () => {
        set({ cartItems: [] });
      },
    }),
    {
      name: "cart-storage",
      getStorage: () => sessionStorage,
    },
  ),
);

export default useCartStore;
