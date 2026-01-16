import { create } from "zustand";
import type { CityStore } from "./types";

export const useCityStore = create<CityStore>((set) => ({
  selectedCity: null,
  selectedCoords: null,
  isInitialized: false,

  setSelectedCity: (city: string) =>
    set({
      selectedCity: city,
      selectedCoords: null, // 도시 선택 시 좌표 초기화
      isInitialized: true,
    }),

  setSelectedCoords: (coords: { lat: number; lon: number }) =>
    set({
      selectedCoords: coords,
      selectedCity: null, // 좌표 선택 시 도시 초기화
      isInitialized: true,
    }),

  setInitialized: () => set({ isInitialized: true }),
}));
