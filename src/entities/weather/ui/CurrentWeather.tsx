import { CurrentLocationButton } from "@/features/current-location";
import { FavoriteButton } from "@/features/toggle-favorite";
import type { WeatherData, HourlyForecast } from "../model/type";
import { WeatherDetail } from "./WeatherDetail";
import { WeatherIcon } from "./WeatherIcon";

interface CurrentWeatherProps {
  weather: WeatherData;
  isLoading?: boolean;
  minMaxTemp?: { min: number; max: number };
  hourlyForecast?: HourlyForecast[];
  coords?: { lat: number; lon: number };
}

export function CurrentWeather({
  weather,
  isLoading,
  minMaxTemp,
  hourlyForecast,
  coords,
}: CurrentWeatherProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-12 bg-gray-200 rounded w-1/2"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          {/* 즐겨찾기 버튼 */}
          {coords && weather.city && (
            <FavoriteButton address={weather.city} coords={coords} />
          )}
          <h2 className="text-3xl font-bold">{weather.city}</h2>
          <CurrentLocationButton />
        </div>
        <WeatherIcon
          icon={weather.icon}
          description={weather.description}
          size="lg"
        />
      </div>

      <div className="mb-4">
        <p className="text-5xl font-bold">{weather.temperature}°C</p>
        <p className="text-gray-600">체감 온도: {weather.feelsLike}°C</p>

        {/* 당일 최저/최고 기온 */}
        {minMaxTemp && (
          <p className="text-gray-600 mt-1">
            최저 {minMaxTemp.min}°C / 최고 {minMaxTemp.max}°C
          </p>
        )}

        <p className="text-lg text-gray-700 mt-2 capitalize">
          {weather.description}
        </p>
      </div>

      {/* 시간대별 예보 */}
      {hourlyForecast && hourlyForecast.length > 0 && (
        <div className="mb-4 pb-4 border-b">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            시간대별 예보
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {hourlyForecast.map((forecast, index) => (
              <div
                key={index}
                className="flex flex-col items-center min-w-[60px] text-center"
              >
                <p className="text-xs text-gray-600">
                  {forecast.time.getHours()}시
                </p>
                <WeatherIcon
                  icon={forecast.icon}
                  description={forecast.description}
                  size="sm"
                />
                <p className="text-sm font-semibold">
                  {forecast.temperature}°C
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 상세 정보 */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
        <WeatherDetail label="습도" value={weather.humidity} unit="%" />
        <WeatherDetail label="풍속" value={weather.windSpeed} unit="m/s" />
      </div>

      {/* 업데이트 시간 */}
      <div className="mt-4 text-xs text-gray-500 text-right">
        업데이트: {weather.timestamp.toLocaleTimeString("ko-KR")}
      </div>
    </div>
  );
}
