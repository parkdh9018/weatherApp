export interface CityStore {
  selectedAddress: string | null;
  selectedCoords: { lat: number; lon: number } | null;
  isInitialized: boolean;
  setSelectedAddress: (address: string) => void;
  setSelectedCoords: (
    coords: { lat: number; lon: number },
    address?: string
  ) => void;
  setInitialized: () => void;
}
