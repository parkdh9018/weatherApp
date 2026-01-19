import { CurrentLocationButton } from "@/features/current-location";
import { FavoriteButton } from "@/features/toggle-favorite";
import type { WeatherData } from "../model/type";
import { WeatherIcon } from "./WeatherIcon";
import { InfoCard } from "./InfoCard";

interface CurrentWeatherProps {
  weather: WeatherData;
  isLoading: boolean;
  todayMinMax?: { min: number; max: number };
  tomorrowMinMax?: { min: number; max: number };
  coords: { lat: number; lon: number };
}

export function CurrentWeather({
  weather,
  isLoading,
  todayMinMax,
  tomorrowMinMax,
  coords,
}: CurrentWeatherProps) {
  if (isLoading) {
    return (
      <div className="bg-white">
        <div className="animate-pulse p-4 space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-16 bg-gray-200 rounded w-1/2"></div>
          <div className="grid grid-cols-3 gap-2">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const currentTime = new Date().toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="from-blue-50 to-white">
      {/* 헤더 - 지역명 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between rounded-2xl mb-3 mt-2">
        <div className="flex items-center gap-2">
          {coords && weather.city && (
            <FavoriteButton address={weather.city} coords={coords} />
          )}
          <h1 className="text-lg font-bold">{weather.city}</h1>
          <CurrentLocationButton />
        </div>
      </div>

      <div className="bg-white rounded-2xl mb-4">
        {/* 메인 온도 섹션 */}
        <div className="px-4 py-6">
          <div className="flex items-start justify-between">
            {/* 왼쪽: 현재 온도 */}
            <div>
              <div className="flex items-start">
                <WeatherIcon
                  icon={weather.icon}
                  description={weather.description}
                  size="lg"
                />
                <span className="text-6xl font-light ml-2">
                  {Math.round(weather.temperature)}°
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-600 space-y-1">
                <p>
                  체감{" "}
                  <span className="font-medium">
                    {Math.round(weather.feelsLike)}°
                  </span>
                </p>
                {todayMinMax && (
                  <p>
                    최저{Math.round(todayMinMax.min)}° 최고
                    {Math.round(todayMinMax.max)}°
                  </p>
                )}
              </div>
            </div>

            {/* 오른쪽: 내일 최저/최고 기온 */}
            {tomorrowMinMax && (
              <div className="text-right">
                <div className="text-sm text-gray-500">내일</div>
                <div className="mt-1">
                  <span className="text-2xl font-medium text-red-500">
                    {Math.round(tomorrowMinMax.max)}°
                  </span>
                  <span className="text-gray-400 mx-1">/</span>
                  <span className="text-2xl font-medium text-blue-500">
                    {Math.round(tomorrowMinMax.min)}°
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 정보 카드 그리드 */}
        <div className="px-4 pb-4">
          <div className="grid grid-cols-3 gap-2">
            <InfoCard label="습도">
              <div className="text-2xl font-bold">{weather.humidity}%</div>
            </InfoCard>

            <InfoCard label="풍속">
              <div className="text-2xl font-bold">
                {weather.windSpeed}
                <span className="text-sm font-normal">m/s</span>
              </div>
            </InfoCard>

            <InfoCard label="날씨">
              <div className="text-sm font-medium capitalize">
                {weather.description}
              </div>
            </InfoCard>
          </div>
        </div>
        {/* 업데이트 시간 */}
        <div className="px-4 py-2 text-xs text-gray-500 text-right">
          업데이트 {currentTime}
        </div>
      </div>

      {/* 상세 정보 */}
      <div className="bg-white px-4 py-3 rounded-2xl mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">상세 정보</h2>
        <div className="space-y-2">
          <div className="flex justify-between items-center py-1.5 border-b">
            <span className="text-sm text-gray-600">습도</span>
            <span className="text-sm font-medium">{weather.humidity}%</span>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b">
            <span className="text-sm text-gray-600">풍속</span>
            <span className="text-sm font-medium">{weather.windSpeed}m/s</span>
          </div>
          <div className="flex justify-between items-center py-1.5">
            <span className="text-sm text-gray-600">체감온도</span>
            <span className="text-sm font-medium">
              {Math.round(weather.feelsLike)}°C
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
