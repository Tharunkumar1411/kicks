import { USER } from "../../utils/endpoint";
import axiosInstance from "../../utils/client";

export const getUserDetails = async (userId) => {
  const response = await axiosInstance.get(USER.GET_USER_DETAILS(userId));
  return response.data;
};
