// src/store/useMockAuthStore.js

import { useState } from "react";

// Hook pattern for frontend development only (mocked)
const useMockAuthStore = () => {
  const [user, setUserState] = useState(null);

  const mockUser = {
    name: "John Doe",
    email: "johndoe@example.com",
  };

  const signUp = (firstName, lastName, email, password) => {
    console.log("Mock signUp called");
    const fullName = `${firstName} ${lastName}`;
    const newUser = { name: fullName, email };
    setUserState(newUser);
  };

  const signIn = (email, password) => {
    console.log("Mock signIn called");
    if (email === "johndoe@example.com" && password === "password123") {
      setUserState(mockUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    console.log("Mock logout called");
    setUserState(null);
  };

  return {
    user,
    signUp,
    signIn,
    logout,
  };
};

export default useMockAuthStore;
