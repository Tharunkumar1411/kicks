import { AUTH } from "../../utils/endpoint";
import axios from "axios";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase";
import { showErrorToast, showSuccessToast } from "../../utils/errorHandler";

export const createUser = async (payload) => {
  return await axios.post(AUTH.REGISTER_USER, payload).then((response) => {
    return response.data;
  });
};

export const handleGoogleAuth = async () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      return credential;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log("check error::", error);
    });
};

export const handleAppleAuth = async () => {
  const provider = new OAuthProvider("apple.com");
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const credential = OAuthProvider.credentialFromResult(result);
      return credential;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = OAuthProvider.credentialFromError(error);
      console.log("error::", error);
    });
};

export const handleFbAuth = async () => {
  const provider = new FacebookAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const credential = OAuthProvider.credentialFromResult(result);
    return credential;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential_1 = OAuthProvider.credentialFromError(error);
    console.log("error::", error);
  }
};

export const handleLoginAuth = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const handleRegisterAuth = async (email, password, displayName = "") => {
  return await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      updateProfile(userCredential.user, {
        displayName: displayName,
      });

      return userCredential;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // Handle errors here
    });
};

export const handleLogout = async () => {
  try {
    await signOut(auth);
    showSuccessToast("User signed out successfully");
  } catch (error) {
    showErrorToast("Sign out failed");
  }
};
