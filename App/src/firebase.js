import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-Z6QFZS2ePHbmeXBSrZrYv5j2Z8_DuT4",
  authDomain: "testing-19dfb.firebaseapp.com",
  projectId: "testing-19dfb",
  storageBucket: "testing-19dfb.appspot.com",
  messagingSenderId: "293134578251",
  appId: "1:293134578251:web:2291b4f19e32c4cdd313ce",
  measurementId: "G-9MLDD2NYTR",
  clientId: "293134578251-io8bq4450r3233qahqotki2hv28qsd67.apps.googleusercontent.com",
  scopes: [
    "email",
    "profile",
    "https://www.googleapis.com/auth/calendar"
],
discoveryDocs: [
"https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
]
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export default firebaseApp;