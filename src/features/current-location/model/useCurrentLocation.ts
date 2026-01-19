import { useMutation } from "@tanstack/react-query";
import { useCityStore } from "@/app/store";
import { getCurrentLocation } from "../lib/getCurrentLocation";
import { geocodingApi } from "@/entities/weather/api/geocodingApi";
import { formatKakaoAddress } from "@/shared/lib/formatAddress";
import { toast } from "react-toastify";

export const useCurrentLocation = () => {
  const setSelectedAddress = useCityStore((state) => state.setSelectedAddress);
  const setSelectedCoords = useCityStore((state) => state.setSelectedCoords);

  return useMutation({
    mutationFn: async () => {
      const coords = await getCurrentLocation();
      const addressObj = await geocodingApi.getAddressFromCoords(
        coords.lat,
        coords.lon,
      );

      if (!addressObj) {
        throw new Error("주소 정보를 가져올 수 없습니다.");
      }

      const address = formatKakaoAddress(
        addressObj.region_1depth_name,
        addressObj.region_2depth_name,
        addressObj.region_3depth_name,
      );
      return { ...coords, address };
    },
    onSuccess: ({ lat, lon, address }) => {
      setSelectedAddress(address);
      setSelectedCoords({ lat, lon });
    },
    onError: () => {
      toast.error("현재 위치를 가져올 수 없습니다.");
    },
  });
};
