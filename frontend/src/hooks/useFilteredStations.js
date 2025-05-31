import { useEffect, useMemo } from "react";

export default function useFilteredStations(chargingStations, filterTypes) {
  useEffect(() => {
    console.log("Filter type changed:", filterTypes);
  }, [filterTypes]);

  return useMemo(() => {
    return chargingStations.filter((station) => {
      if (filterTypes.length === 0) return true;
      //return all stations

      return filterTypes.some((filter) => {
        //return station that at leaset Compatible with filters 
        if (filter === "available" && station.isAvailable) return true;
        if (filter === "2plus" && station.numConnections >= 2) return true;
        if (filter === "fast" && station.isFast) return true;
        if (filter === "parking" && station.parking >= 1) return true;

        if (
          filter.filter === "plugType" &&
          Array.isArray(station.plugType) &&
          filter.selectedPlugTypes &&
          filter.selectedPlugTypes.some((plug) =>
            station.plugType.includes(plug)
          )
          //return station that at leaset have one of plug type that user seleceted
        ) {
          return true;
        }

        return false;
      });
    });
  }, [chargingStations, filterTypes]);
}
