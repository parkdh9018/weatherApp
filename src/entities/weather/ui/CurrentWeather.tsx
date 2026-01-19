import { CurrentLocationButton } from "@/features/current-location";
import { FavoriteButton } from "@/features/toggle-favorite";
import { RefreshButton } from "@/features/refresh-weather";
import type { WeatherData } from "../model/type";
import { WeatherIcon } from "./WeatherIcon";
import { InfoCard } from "./InfoCard";
import { formatAddressDisplay } from "@/shared/lib/formatAddress";
import { TomorrowWeather } from "./TomorrowWeather";

interface CurrentWeatherProps {
  weather: WeatherData;
  isLoading: boolean;
  todayMinMax?: { min: number; max: number };
  tomorrowMinMax?: { min: number; max: number };
  coords: { lat: number; lon: number };
  tomorrowForecasts?: Array<{
    time: Date;
    temperature: number;
    icon: string;
    description: string;
  }>;
  onRefresh?: () => Promise<void>;
}

export function CurrentWeather({
  weather,
  isLoading,
  todayMinMax,
  tomorrowMinMax,
  coords,
  tomorrowForecasts,
  onRefresh,
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
          <h1 className="text-lg font-bold">
            {formatAddressDisplay(weather.city)}
          </h1>
          <CurrentLocationButton />
        </div>
      </div>

      {/* 오늘/내일 날씨 카드 */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* 현재(오늘) 날씨 */}
        <div className="bg-white rounded-2xl p-4">
          <div className="text-sm text-gray-500 mb-3">
            현재{" "}
            {new Date().toLocaleDateString("ko-KR", {
              month: "2-digit",
              day: "2-digit",
            })}
          </div>
          <div className="flex items-start mb-3">
            <WeatherIcon
              icon={weather.icon}
              description={weather.description}
              size="md"
            />
            <span className="text-5xl font-light ml-1">
              {Math.round(weather.temperature)}°
            </span>
          </div>
          <div className="text-sm text-gray-600">
            <p className="mb-1">{weather.description}</p>
            {todayMinMax && (
              <p className="text-xs">
                최저
                <span className="font-medium font-semibold">
                  {Math.round(todayMinMax.min)}°
                </span>{" "}
                최고
                <span className="font-medium font-semibold">
                  {Math.round(todayMinMax.max)}°
                </span>
              </p>
            )}
          </div>
        </div>

        {/* 내일 날씨 */}
        {tomorrowMinMax && (
          <TomorrowWeather
            tomorrowMinMax={tomorrowMinMax}
            tomorrowForecasts={tomorrowForecasts}
          />
        )}
      </div>

      {/* 정보 카드 그리드 */}
      <div className="bg-white rounded-2xl mb-4 py-4">
        <div className="px-4 pb-4">
          <div className="grid grid-cols-2 gap-2">
            <InfoCard label="습도">
              <div className="text-2xl font-bold">{weather.humidity}%</div>
            </InfoCard>

            <InfoCard label="풍속">
              <div className="text-2xl font-bold">
                {weather.windSpeed}
                <span className="text-sm font-normal">m/s</span>
              </div>
            </InfoCard>

            <InfoCard label="체감온도">
              <div className="text-2xl font-bold">
                {Math.round(weather.feelsLike)}
                <span className="text-sm font-normal">°</span>
              </div>
            </InfoCard>

            <InfoCard label="기압">
              <div className="text-2xl font-bold">
                {weather.pressure}
                <span className="text-sm font-normal">hPa</span>
              </div>
            </InfoCard>
          </div>
        </div>
        {/* 업데이트 시간 */}
        <div className="px-4 py-2 flex items-center justify-end gap-2 text-xs text-gray-500">
          <span>업데이트 {currentTime}</span>
          {onRefresh && <RefreshButton onRefresh={onRefresh} />}
        </div>
      </div>
    </div>
  );
}
