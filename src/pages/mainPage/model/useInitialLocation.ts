import { useEffect } from "react";
import { useCityStore } from "@/shared/model";
import { getCurrentLocation } from "@/features/current-location";
import { geocodingApi } from "@/entities/weather/api/geocodingApi";
import { formatKakaoAddress } from "@/shared/lib/formatAddress";
import { toast } from "react-toastify";

export function useInitialLocation() {
  const isInitialized = useCityStore((state) => state.isInitialized);
  const setLocationData = useCityStore((state) => state.setLocationData);
  const setInitialized = useCityStore((state) => state.setInitialized);

  useEffect(() => {
    // 이미 초기화되었으면 실행하지 않음
    if (isInitialized) return;

    // 자동으로 현재 위치 가져오기
    getCurrentLocation()
      .then(async (coords) => {
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

        setLocationData(address, coords);
      })
      .catch((error) => {
        console.error("자동 위치 가져오기 실패:", error);
        toast.error(
          "위치 정보를 가져올 수 없어 기본 위치(서울)로 설정되었습니다.",
        );
        // 실패해도 초기화 플래그 설정 (무한 재시도 방지)
        setInitialized();
        setLocationData("서울특별시", { lat: 37.55, lon: 126.99 });
      });
  }, [isInitialized, setLocationData, setInitialized]);
}
