/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";
import { auth } from "./firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set persistence
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        // New sign-in will be persisted with session persistence
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
          setUser(authUser);
          setLoading(false);
        });
        return unsubscribe;
      })
      .catch((error) => {
        console.error(error.code, error.message);
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
