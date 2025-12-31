import { axiosInstance } from "../utils/client";
import { HOME } from "../utils/endpoint";

export const getHomeDetails = async () => {
  const response = await axiosInstance().get(HOME.GET_HOME_DETAILS);
  return response.data[0];
};

export const getProductDetails = async (productId) => {
  const response = await axiosInstance().get(
    HOME.GET_PRODUCT_DETAILS(productId)
  );
  return response.data;
};
