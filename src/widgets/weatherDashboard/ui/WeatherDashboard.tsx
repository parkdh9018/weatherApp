import { CurrentCity } from "@/entities/current-city/ui/CurrentCity";

export function WeatherDashboard() {
  return (
    <div className="space-y-6">
      {/* 현재 날씨 (entity) */}
      {/* <WeatherCard weather={mockWeather} /> */}
      {/* 추가 정보 영역 */}
      <div className="flex flex-col gap-4 p-4">
        <CurrentCity />
        {/* 시간별 예보 */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-2">시간별 예보</h3>
          <p className="text-gray-500">준비 중...</p>
        </div>

        {/* 주간 예보 */}
        {/* <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-2">주간 예보</h3>
          <p className="text-gray-500">준비 중...</p>
        </div> */}
      </div>
    </div>
  );
}
