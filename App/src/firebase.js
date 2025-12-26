import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDRbxZDbkiFuXw8mXjRw-ZEWfF_EVXxZkc',
  authDomain: 'kicks-a8401.firebaseapp.com',
  projectId: 'kicks-a8401',
  storageBucket: 'kicks-a8401.firebasestorage.app',
  messagingSenderId: '125881819557',
  appId: '1:125881819557:web:0f334d6d49ec5569b1884c',
  measurementId: 'G-1E0TY751PE',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export default firebaseApp;
