import { useMutation } from "@tanstack/react-query";
import { useCityStore } from "@/shared/model";
import { getCurrentLocation } from "../lib/getCurrentLocation";

export const useCurrentLocation = () => {
  const setSelectedCoords = useCityStore((state) => state.setSelectedCoords);

  return useMutation({
    mutationFn: getCurrentLocation,
    onSuccess: (coords) => {
      setSelectedCoords(coords);
    },
  });
};
