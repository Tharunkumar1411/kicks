import { create } from "zustand";

const useCheckoutStore = create((set, get) => ({
  checkoutItems: [],

  // Set items for checkout (from cart)
  setCheckoutItems: (items) => {
    set({ checkoutItems: items });
  },

  // Set single item for checkout (from Buy Now)
  setSingleCheckoutItem: (item) => {
    set({ checkoutItems: [item] });
  },

  // Clear checkout items
  clearCheckout: () => {
    set({ checkoutItems: [] });
  },

  // Get total items
  getTotalItems: () => {
    const { checkoutItems } = get();
    return checkoutItems.reduce((total, item) => total + item.quantity, 0);
  },

  // Get checkout total
  getCheckoutTotal: () => {
    const { checkoutItems } = get();
    return checkoutItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
}));

export default useCheckoutStore;
