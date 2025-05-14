import { FacebookAuthProvider, GoogleAuthProvider, OAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        return credential;
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("check error::", error)
    });
}

export const handleAppleAuth = async() => {
  const provider = new OAuthProvider('apple.com');
  return signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    const credential = OAuthProvider.credentialFromResult(result);
    return credential
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = OAuthProvider.credentialFromError(error);
    console.log("error::", error)

  });
}


export const handleFbAuth = () => {
  const provider = new FacebookAuthProvider();

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
    console.log("error::", error)
  });
}


export const handleLoginAuth = async(email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export const handleRegisterAuth = async (email, password, displayName = "") => {
  return await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Update the display name
      return updateProfile(userCredential.user, {
        displayName: displayName
      }).then(() => {
        return userCredential;
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // Handle errors here
    });
}