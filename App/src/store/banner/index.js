import { create } from "zustand";

const useBannerStore = create((set, get) => ({
  bannerData: null,
  isBannerVisible: false,
  isLoading: false,
  error: null,

  // Set banner data from API
  setBannerData: (data) => {
    set({
      bannerData: data,
      isBannerVisible: data?.isActive || false,
      isLoading: false,
      error: null,
    });
  },

  // Toggle banner visibility (user can close it)
  closeBanner: () => {
    set({ isBannerVisible: false });
  },

  // Set loading state
  setLoading: (isLoading) => {
    set({ isLoading });
  },

  // Set error state
  setError: (error) => {
    set({ error, isLoading: false });
  },

  // Reset banner state
  resetBanner: () => {
    set({
      bannerData: null,
      isBannerVisible: false,
      isLoading: false,
      error: null,
    });
  },
}));

export default useBannerStore;
