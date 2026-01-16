import { useMutation } from "@tanstack/react-query";
import { useCityStore } from "@/shared/model";
import { getCurrentLocation } from "../lib/getCurrentLocation";
import { geocodingApi } from "@/entities/weather/api/geocodingApi";
import { formatKakaoAddress } from "@/shared/lib/formatAddress";

export const useCurrentLocation = () => {
  const setSelectedCoords = useCityStore((state) => state.setSelectedCoords);

  return useMutation({
    mutationFn: async () => {
      const coords = await getCurrentLocation();
      const addressObj = await geocodingApi.getAddressFromCoords(
        coords.lat,
        coords.lon
      );

      if (!addressObj) {
        throw new Error("주소 정보를 가져올 수 없습니다.");
      }

      const address = formatKakaoAddress(
        addressObj.region_1depth_name,
        addressObj.region_2depth_name,
        addressObj.region_3depth_name
      );
      return { ...coords, address };
    },
    onSuccess: ({ lat, lon, address }) => {
      setSelectedCoords({ lat, lon }, address);
    },
  });
};
