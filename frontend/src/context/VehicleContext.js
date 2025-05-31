import { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  const { token, isLoggedIn } = useContext(AuthContext);

  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     const loadVehicles = async () => {
  //       if (!token) {
  //         setLoading(false);
  //         return;
  //       }

  //       try {
  //         const cachedSelectedId = await SecureStore.getItemAsync(
  //           "selectedVehicleId"
  //         );

  //         const response = await axios.get(
  // "https://electracar.onrender.com/api/vehicles/me",
  //           {
  //             headers: { Authorization: `Bearer ${token}` },
  //           }
  //         );

  //         const fetchedVehicles = response.data;
  //         setVehicles(fetchedVehicles);

  //         if (cachedSelectedId) {
  //           const cachedVehicle = fetchedVehicles.find(
  //             (v) => v.id.toString() === cachedSelectedId
  //           );
  //           if (cachedVehicle) {
  //             setSelectedVehicle(cachedVehicle);
  //           } else {
  //             const backendSelected = fetchedVehicles.find((v) => v.selected);
  //             if (backendSelected) {
  //               setSelectedVehicle(backendSelected);
  //               await SecureStore.setItemAsync(
  //                 "selectedVehicleId",
  //                 backendSelected.id.toString()
  //               );
  //             }
  //           }
  //         } else {
  //           const backendSelected = fetchedVehicles.find((v) => v.selected);
  //           if (backendSelected) {
  //             setSelectedVehicle(backendSelected);
  //             await SecureStore.setItemAsync(
  //               "selectedVehicleId",
  //               backendSelected.id.toString()
  //             );
  //           }
  //         }
  //       } catch (error) {
  //         console.error("Failed to load vehicles", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     loadVehicles();
  //   }, [token]);

  useEffect(() => {
    const loadVehicles = async () => {
      if (!token || !isLoggedIn) {
        setVehicles([]);
        setSelectedVehicle(null);
        setLoading(false);
        return;
      }

      try {
        const cachedSelectedId = await SecureStore.getItemAsync(
          "selectedVehicleId"
        );

        const response = await axios.get(
          "https://electracar.onrender.com/api/vehicles/me",
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
        if (error.response?.status === 403) {
          console.warn("403: Token invalid or user is not authorized.");
        } else {
          console.error("Failed to load vehicles", error);
        }
      } finally {
        setLoading(false);
      }
    };

    loadVehicles();
  }, [token, isLoggedIn]);

  const addVehicle = (newVehicle) => {
    setVehicles((prev) => [...prev, newVehicle]);
  };

  const selectVehicle = async (vehicle) => {
    setSelectedVehicle(vehicle);
    await SecureStore.setItemAsync("selectedVehicleId", vehicle.id.toString());

    // Optionally update backend selection here
    try {
      await axios.put(
        `https://electracar.onrender.com/api/vehicles/select/${vehicle.id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Failed to update selected vehicle on backend", error);
    }
  };

  /////////// delete vehicle API
  const deleteVehicle = async (vehicleId) => {
    try {
      const response = await axios.delete(
        `https://electracar.onrender.com/api/vehicles/${vehicleId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data.message); // should say "deleted"

      // Remove from state
      setVehicles((prevVehicles) =>
        prevVehicles.filter((v) => v.id !== vehicleId)
      );

      // If deleted vehicle was selected, clear it
      if (selectedVehicle?.id === vehicleId) {
        setSelectedVehicle(null);
        await SecureStore.deleteItemAsync("selectedVehicleId");
      }
    } catch (error) {
      console.error("Failed to delete vehicle", error);
      throw error; // let UI screen decide how to alert
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
        deleteVehicle,
        loading,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};
