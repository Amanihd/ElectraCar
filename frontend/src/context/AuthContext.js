

import * as SecureStore from "expo-secure-store";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // prevent flashing logout

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("token");
        if (storedToken) {
          setToken(storedToken);
          const res = await axios.get("https://b0ab-2a01-9700-40a8-1c00-e448-6fcf-ad5c-860.ngrok-free.app/api/user/me", {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          setUser(res.data);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log("Session restore failed", error);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    setIsLoggedIn(true);
    await SecureStore.setItemAsync("token", jwtToken);
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
    await SecureStore.deleteItemAsync("token");
  };

  const updateUser = (newUserData) => {
    setUser(newUserData);
  };

  if (loading) return null; // or splash screen

  return (
    <AuthContext.Provider
      value={{ user, token, isLoggedIn, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
