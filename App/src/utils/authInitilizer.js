import { onAuthStateChanged } from "firebase/auth";
import useUserStore from "../store/user";
import { auth } from "../firebase";

let isAuthInitialized = false;

export const initAuthListener = () => {
  if (isAuthInitialized) return;
  isAuthInitialized = true;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      useUserStore.getState().setUserDetails({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      });
    } else {
      useUserStore.getState().clearUserDetails();
    }
  });
};
