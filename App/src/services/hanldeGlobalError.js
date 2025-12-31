import { toast } from "react-toastify";

export const handleGlobalError = (error) => {
  // Firebase errors
  console.log("Global error handler:", error);
  if (error?.source === "firebase") {
    toast.error(firebaseErrorMap(error.code));
    return;
  }

  // Axios errors
  if (error?.response) {
    toast.error(error.response.data?.message || "Server error");
    return;
  }

  // Fallback
  toast.error(error.message || "Something went wrong");
};

const firebaseErrorMap = (code) => {
  const map = {
    "auth/email-already-in-use": "Email already registered",
    "auth/invalid-email": "Invalid email address",
    "auth/weak-password": "Password is too weak",
  };

  return map[code] || "Authentication failed";
};
