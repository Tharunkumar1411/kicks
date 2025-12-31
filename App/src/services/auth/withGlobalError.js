import { handleGlobalError } from "../hanldeGlobalError";

export const withGlobalError = (fn) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      handleGlobalError(error);
    }
  };
};
