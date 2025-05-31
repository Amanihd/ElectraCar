
import fetch from "node-fetch";
import fs from "fs";

const fetchStations = async () => {
  const response = await fetch(
    "https://api.openchargemap.io/v3/poi/?output=json&countrycode=JO&maxresults=100&key=a164f27a-d27a-456a-a7fe-0fd483025c3f"
  );
  const data = await response.json();

  const filteredData = data.map((station, index) => ({
    id: index + 1,
    title: station.AddressInfo.Title,
    address: station.AddressInfo.AddressLine1,
    latitude: station.AddressInfo.Latitude,
    longitude: station.AddressInfo.Longitude,
    cost: station.UsageCost || null,
    amenities: station.MetadataValues || [], //like wifi ,cafe,..
    plugType:
      station.Connections?.map((conn) => conn.ConnectionType?.Title) || [], //connection is an array of pluges
    plugScore: station.UserComments?.[0]?.Rating || null, //rating
    parking: station.NumberOfPoints || null,
    isFast: station.Connections?.some((conn) => conn.PowerKW >= 22),
    numConnections: station.Connections?.length || 0, //number of pluges
    isAvailable: station.StatusType?.IsOperational ?? null,
  }));

  //fs -> file system it is a library in node.js
  fs.writeFileSync("./stations.json", JSON.stringify(filteredData, null, 2));
  console.log("Data saved to stations.json");
};

fetchStations();
