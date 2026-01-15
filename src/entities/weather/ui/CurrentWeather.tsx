import type { WeatherData } from "../model/type";
import { WeatherDetail } from "./WeatherDetail";
import { WeatherIcon } from "./WeatherIcon";

interface CurrentWeatherProps {
  weather: WeatherData;
  isLoading?: boolean;
}

export function CurrentWeather({ weather, isLoading }: CurrentWeatherProps) {
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
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-3xl font-bold">{weather.city}</h2>
          <p className="text-gray-600">{weather.country}</p>
        </div>
        <WeatherIcon
          icon={weather.icon}
          description={weather.description}
          size="lg"
        />
      </div>

      {/* 온도 정보 */}
      <div className="mb-4">
        <p className="text-5xl font-bold">{weather.temperature}°C</p>
        <p className="text-gray-600">체감 온도: {weather.feelsLike}°C</p>
        <p className="text-lg text-gray-700 mt-2 capitalize">
          {weather.description}
        </p>
      </div>

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
