import React, { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  const { token } = useContext(AuthContext); // Get token here

  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVehicles = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const cachedSelectedId = await SecureStore.getItemAsync(
          "selectedVehicleId"
        );

        const response = await axios.get(
          "https://d650-91-186-254-248.ngrok-free.app/api/vehicles/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const fetchedVehicles = response.data;
        setVehicles(fetchedVehicles);

        if (cachedSelectedId) {
          const cachedVehicle = fetchedVehicles.find(
            (v) => v.id.toString() === cachedSelectedId
          );
          if (cachedVehicle) {
            setSelectedVehicle(cachedVehicle);
          } else {
            const backendSelected = fetchedVehicles.find((v) => v.selected);
            if (backendSelected) {
              setSelectedVehicle(backendSelected);
              await SecureStore.setItemAsync(
                "selectedVehicleId",
                backendSelected.id.toString()
              );
            }
          }
        } else {
          const backendSelected = fetchedVehicles.find((v) => v.selected);
          if (backendSelected) {
            setSelectedVehicle(backendSelected);
            await SecureStore.setItemAsync(
              "selectedVehicleId",
              backendSelected.id.toString()
            );
          }
        }
      } catch (error) {
        console.error("Failed to load vehicles", error);
      } finally {
        setLoading(false);
      }
    };

    loadVehicles();
  }, [token]);

  const addVehicle = (newVehicle) => {
    setVehicles((prev) => [...prev, newVehicle]);
  };

  const selectVehicle = async (vehicle) => {
    setSelectedVehicle(vehicle);
    await SecureStore.setItemAsync("selectedVehicleId", vehicle.id.toString());

    // Optionally update backend selection here
    try {
      await axios.put(
        `https://d650-91-186-254-248.ngrok-free.app/api/vehicles/select/${vehicle.id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Failed to update selected vehicle on backend", error);
    }
  };

  return (
    <VehicleContext.Provider
      value={{
        vehicles,
        setVehicles,
        selectedVehicle,
        setSelectedVehicle: selectVehicle,
        addVehicle,
        loading,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};
