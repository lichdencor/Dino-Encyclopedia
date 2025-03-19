import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { firebaseAuth } from "../../lib/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const register = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const logout = async () => {
    await signOut(firebaseAuth);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
