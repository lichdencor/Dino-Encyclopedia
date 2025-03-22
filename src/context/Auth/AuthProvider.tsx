import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { firebaseAuth } from "../../lib";
import { supabase } from "../../lib";
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
    console.log("Usuario logueado correctamente");
  };

  const register = async (email: string, password: string) => {
    const { user } = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password,
    );

    if (user) {
      const { error } = await supabase.from("profiles").insert([
        {
          email: user.email, // Solo el email y created_at, Supabase se encargará del id autoincremental
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error("Error al crear perfil en Supabase:", error.message);
      } else {
        console.log("Perfil de usuario registrado en Supabase");
      }
    }
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
