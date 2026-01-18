import { create } from "zustand";
import type { CityStore } from "./types";

export const useCityStore = create<CityStore>((set) => ({
  selectedAddress: "서울특별시",
  selectedCoords: { lat: 0, lon: 0 },
  isInitialized: false,

  setSelectedAddress: (address: string) =>
    set({
      selectedAddress: address,
      isInitialized: true,
    }),

  setSelectedCoords: (coords: { lat: number; lon: number }) =>
    set({
      selectedCoords: coords,
      isInitialized: true,
    }),
  setLocationData: (address: string, coords: { lat: number; lon: number }) =>
    set({
      selectedAddress: address,
      selectedCoords: coords,
      isInitialized: true,
    }),
  setInitialized: () => set({ isInitialized: true }),
}));
