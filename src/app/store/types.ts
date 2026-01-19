export interface CityStore {
  selectedAddress: string;
  selectedCoords: { lat: number; lon: number };
  isInitialized: boolean;
  setSelectedAddress: (address: string) => void;
  setSelectedCoords: (coords: { lat: number; lon: number }) => void;
  setLocationData: (
    address: string,
    coords: { lat: number; lon: number },
  ) => void;
  setInitialized: () => void;
}
