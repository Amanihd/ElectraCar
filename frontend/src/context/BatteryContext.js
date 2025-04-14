// context/BatteryContext.js
import React, { createContext, useState } from "react";

export const BatteryContext = createContext();

export const BatteryProvider = ({ children }) => {
  const [batteryLevel, setBatteryLevel] = useState(50); // Default 50%

  return (
    <BatteryContext.Provider value={{ batteryLevel, setBatteryLevel }}>
      {children}
    </BatteryContext.Provider>
  );
};
