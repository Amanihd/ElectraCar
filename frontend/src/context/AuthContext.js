{/*import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    // Check AsyncStorage on app load to simulate persistent login state
    const checkLoginState = async () => {
      try {
        const storedLoginState = await AsyncStorage.getItem("isLoggedIn");
        if (storedLoginState === "true") {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error reading login state from AsyncStorage", error);
      }
    };

    checkLoginState();
  }, []);

  const login = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "true"); // Store login state in AsyncStorage
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error storing login state", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("isLoggedIn"); // Remove login state from AsyncStorage
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error removing login state", error);
    }
  };

  // For testing, you can call login here:
  // login(); // Uncomment this line to simulate login at startup
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};*/}
// context/AuthContext.js

import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const savedUser = await AsyncStorage.getItem("user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error loading user from AsyncStorage", error);
      }
    };

    loadAuth();
  }, []);

  const login = async (userData) => {
    try {
      setUser(userData);
      setIsLoggedIn(true);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Login error", error);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      setIsLoggedIn(false);
      await AsyncStorage.removeItem("user");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const updateUser = async (newUserData) => {
    try {
      setUser(newUserData);
      await AsyncStorage.setItem("user", JSON.stringify(newUserData));
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
