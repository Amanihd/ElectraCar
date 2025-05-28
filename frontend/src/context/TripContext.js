import { createContext, useState, useEffect, useContext } from "react";
import { UserLocationContext } from "./UserLocationContext";

export const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const { userLocation } = useContext(UserLocationContext);

  const [start, setStart] = useState(userLocation || null);
  const [destination, setDestination] = useState(null);
  const [tripName, setTripName] = useState("");

  useEffect(() => {
    if (userLocation) {
      setStart(userLocation);
    }
  }, [userLocation]);

  return (
    <TripContext.Provider
      value={{
        start,
        setStart,
        destination,
        setDestination,
        tripName,
        setTripName,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};
