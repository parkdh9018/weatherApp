export interface CityStore {
  selectedCity: string | null;
  selectedCoords: { lat: number; lon: number } | null;
  isInitialized: boolean;
  setSelectedCity: (city: string) => void;
  setSelectedCoords: (coords: { lat: number; lon: number }) => void;
  setInitialized: () => void;
}
