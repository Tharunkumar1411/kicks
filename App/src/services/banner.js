import axiosInstance from "../utils/client";
import { BANNER } from "../utils/endpoint";
import { retryRequest } from "../utils/errorHandler";

/**
 * Fetch offer banner data with error handling and retry logic
 * Banner data should include:
 * - isActive: boolean (backend flag to show/hide banner)
 * - message: string (promotional message)
 * - backgroundColor: string (optional, banner background color)
 * - textColor: string (optional, text color)
 * - link: string (optional, click destination)
 * - closeable: boolean (optional, can user close it)
 */
export const getOfferBanner = async () => {
  try {
    const response = await retryRequest(
      () => axiosInstance().get(BANNER.GET_OFFER_BANNER),
      2 // retry twice on failure
    );
    return response.data;
  } catch (error) {
    // Error is already handled by axios interceptor
    // Return null/default state if banner fetch fails (non-critical)
    console.warn("Failed to fetch offer banner:", error);
    return {
      isActive: false,
      message: "",
    };
  }
};
