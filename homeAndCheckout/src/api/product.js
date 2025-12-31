import { axiosInstance } from "../utils/client";
import { CART, HOME } from "../utils/endpoint";

export const getProductList = async () => {
  const response = await axiosInstance().get(HOME.GET_PRODUCT_LIST);
  return response.data;
};

export const getFilterProperties = async () => {
  const response = await axiosInstance().get(HOME.GET_FILTER_PROPERTIES);
  return response.data;
};

export const updateCart = async (productId) => {
  const response = await axiosInstance().post(CART.UPDATE_CART, { productId });
  return response.data;
};
