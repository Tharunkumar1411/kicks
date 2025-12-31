import axios from "axios";
import { auth } from "../firebase";
import { BASEURL } from "./endpoint";

const axiosInstance = axios.create({
  baseURL: BASEURL, // <-- set your API base URL
  timeout: 15000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // Allow skipping auth per request
    if (config.withAuth === false) {
      return config;
    }

    const user = auth.currentUser;

    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      // Optional: logout / redirect / clear store
      // await auth.signOut();
      // useUserStore.getState().clearUserDetails();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
