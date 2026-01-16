import { Header } from "@/widgets/header";
import { WeatherDashboard } from "@/widgets/weatherDashboard";
import { useEffect } from "react";
import { useCityStore } from "@/shared/model";
import { getCurrentLocation } from "@/features/current-location";
import { geocodingApi } from "@/entities/weather/api/geocodingApi";
import { formatKakaoAddress } from "@/shared/lib/formatAddress";

export function MainPage() {
  const isInitialized = useCityStore((state) => state.isInitialized);
  const setSelectedCoords = useCityStore((state) => state.setSelectedCoords);
  const setInitialized = useCityStore((state) => state.setInitialized);

  useEffect(() => {
    // 이미 초기화되었으면 실행하지 않음
    if (isInitialized) return;

    // 자동으로 현재 위치 가져오기
    getCurrentLocation()
      .then(async (coords) => {
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

        setSelectedCoords(coords, address);
      })
      .catch((error) => {
        console.error("자동 위치 가져오기 실패:", error);
        // 실패해도 초기화 플래그 설정 (무한 재시도 방지)
        setInitialized();
      });
  }, [isInitialized, setSelectedCoords, setInitialized]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <WeatherDashboard />
    </div>
  );
}
