import React, { createContext, useState } from "react";

export const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]); // All added vehicles
  const [selectedVehicle, setSelectedVehicle] = useState(null); // Currently selected one

  const addVehicle = (vehicle) => {
    setVehicles((prev) => [...prev, { ...vehicle, id: Date.now() }]);
  };

  const deleteVehicle = (id) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));

    // If deleted vehicle is currently selected, reset selection
    if (selectedVehicle?.id === id) {
      setSelectedVehicle(null);
    }
  };

  return (
    <VehicleContext.Provider
      value={{
        vehicles,
        selectedVehicle,
        setSelectedVehicle,
        addVehicle,
        deleteVehicle,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};
