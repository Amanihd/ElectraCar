import React, { createContext, useState } from "react";
export const UserLocationContext = createContext();


export const UserLocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);

  return (
    <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
      {children}
    </UserLocationContext.Provider>
  );
};
