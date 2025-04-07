import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration with direct values
// In a production environment, these should be stored in environment variables
const firebaseConfig = {
  apiKey: "AIzaSyBkgvtXLH92T6SO8QuEEdaSbi08QQF2vJY",
  authDomain: "ids-project-597cc.firebaseapp.com",
  projectId: "ids-project-597cc",
  storageBucket: "ids-project-597cc.firebasestorage.app",
  messagingSenderId: "458873805582",
  appId: "1:458873805582:web:22f00877ba36a9ed17d55f",
  measurementId: "G-9VG2LS1YT1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
