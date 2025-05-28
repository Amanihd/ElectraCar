
import { createContext, useState } from "react";

export const BatteryContext = createContext();

export const BatteryProvider = ({ children }) => {
  const [batteryLevel, setBatteryLevel] = useState(50); 

  return (
    <BatteryContext.Provider value={{ batteryLevel, setBatteryLevel }}>
      {children}
    </BatteryContext.Provider>
  );
};
