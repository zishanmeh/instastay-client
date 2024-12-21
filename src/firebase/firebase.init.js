// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvr3p00gcI8XbqWZx-AJbKxxkEtZx3z4M",
  authDomain: "instastay-ba699.firebaseapp.com",
  projectId: "instastay-ba699",
  storageBucket: "instastay-ba699.firebasestorage.app",
  messagingSenderId: "489590260949",
  appId: "1:489590260949:web:64ec16dab3b6575b624e5c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
