// storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const VEHICLE_KEY = 'user_vehicles';
const ACTIVE_KEY = 'active_vehicle';

export const saveVehicle = async (vehicle) => {
  const existing = await AsyncStorage.getItem(VEHICLE_KEY);
  const list = existing ? JSON.parse(existing) : [];
  const updated = [...list, vehicle];
  await AsyncStorage.setItem(VEHICLE_KEY, JSON.stringify(updated));
};

export const getVehicles = async () => {
  const data = await AsyncStorage.getItem(VEHICLE_KEY);
  return data ? JSON.parse(data) : [];
};

export const setActiveVehicle = async (vehicle) => {
  await AsyncStorage.setItem(ACTIVE_KEY, JSON.stringify(vehicle));
};

export const getActiveVehicle = async () => {
  const data = await AsyncStorage.getItem(ACTIVE_KEY);
  return data ? JSON.parse(data) : null;
};

