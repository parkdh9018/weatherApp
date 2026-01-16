import { create } from "zustand";
import type { CityStore } from "./types";

export const useCityStore = create<CityStore>((set) => ({
  selectedCity: "서울",

  setSelectedCity: (city: string) =>
    set({
      selectedCity: city,
    }),
}));
