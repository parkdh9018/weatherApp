import { create } from "zustand";
import type { CityStore } from "./types";

export const useCityStore = create<CityStore>((set) => ({
  selectedAddress: null,
  selectedCoords: null,
  isInitialized: false,

  setSelectedAddress: (address: string) =>
    set({
      selectedAddress: address,
      selectedCoords: null, // 주소 선택 시 좌표 초기화
      isInitialized: true,
    }),

  setSelectedCoords: (coords: { lat: number; lon: number }, address?: string) =>
    set({
      selectedCoords: coords,
      selectedAddress: address || null, // 카카오에서 받은 주소 저장
      isInitialized: true,
    }),

  setInitialized: () => set({ isInitialized: true }),
}));
