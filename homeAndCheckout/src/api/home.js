import { axiosInstance } from "../utils/client";
import { HOME } from "../utils/endpoint";
import { retryRequest, showSuccessToast } from "../utils/errorHandler";

/**
 * Fetch home page details with error handling and retry logic
 */
export const getHomeDetails = async () => {
  try {
    const response = await retryRequest(
      () => axiosInstance().get(HOME.GET_HOME_DETAILS),
      2 // retry twice on failure
    );
    return response.data[0];
  } catch (error) {
    // Error is already handled by axios interceptor
    // Just re-throw for component to handle loading state
    throw error;
  }
};

/**
 * Fetch product details by ID with error handling
 */
export const getProductDetails = async (productId) => {
  try {
    if (!productId) {
      throw new Error('Product ID is required');
    }

    const response = await axiosInstance().get(
      HOME.GET_PRODUCT_DETAILS(productId)
    );
    return response.data;
  } catch (error) {
    // Error is already handled by axios interceptor
    throw error;
  }
};

/**
 * Example: Add to cart with success notification
 */
export const addToCartAPI = async (productData) => {
  try {
    const response = await axiosInstance().post('/api/cart/add', productData);

    // Show success notification
    showSuccessToast('Product added to cart successfully!');

    return response.data;
  } catch (error) {
    // Error is already handled by axios interceptor
    throw error;
  }
};
