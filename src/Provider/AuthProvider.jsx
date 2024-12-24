import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";
import axios from "axios";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   Update user
  const updateUserProfile = (updatedData) => {
    setLoading(true);
    return updateProfile(auth.currentUser, updatedData);
  };

  // Sign in user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //   Logout
  const logOut = () => {
    setLoading(true);
    signOut(auth);
  };

  //   On auth state change

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        const user = { email: currentUser.email };
        axios
          .post("http://localhost:3000/jwt", user, { withCredentials: true })
          .then((res) => {
            console.log(res.data);
            setLoading(false);
          });
      } else {
        axios
          .post("http://localhost:3000/logout", {}, { withCredentials: true })
          .then((res) => {
            setLoading(false);
            console.log(res.data);
          });
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    createNewUser,
    updateUserProfile,
    signInUser,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
