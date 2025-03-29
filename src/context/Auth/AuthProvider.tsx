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
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      console.log("Usuario logueado correctamente");
      setAuthError(null); // Resetea error si fue exitoso
    } catch (error) {
      setAuthError("Error al iniciar sesión. Verifica tus credenciales.");
      console.error("Error de login:", error);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      if (user) {
        const { error } = await supabase.from("profiles").insert([
          {
            email: user.email,
            created_at: new Date().toISOString(),
          },
        ]);

        if (error) {
          throw new Error("Error al crear perfil en Supabase: " + error.message);
        } else {
          console.log("Perfil de usuario registrado en Supabase");
        }
      }

      setAuthError(null);
    } catch (error) {
      setAuthError("Error al registrar usuario.");
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await signOut(firebaseAuth);
      setAuthError(null);
    } catch (error) {
      setAuthError("Error al cerrar sesión.");
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, authError }}>
      {children}
      {authError && <p style={{ color: "red" }}>{authError}</p>}
    </AuthContext.Provider>
  );
};

