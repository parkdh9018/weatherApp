import { useWeatherByCoords, useForecastByCoords } from "../model/useWeather";
import { WeatherIcon } from "./WeatherIcon";

interface WeatherSummaryProps {
  lat: number;
  lon: number;
  address: string;
}

export function WeatherSummary({ lat, lon, address }: WeatherSummaryProps) {
  const { data: weatherData, isLoading: isWeatherLoading } = useWeatherByCoords(
    lat,
    lon,
    address,
  );
  const { data: forecastData, isLoading: isForecastLoading } =
    useForecastByCoords(lat, lon);

  if (isWeatherLoading || isForecastLoading) {
    return <div className="text-sm text-gray-400">로딩중...</div>;
  }

  return (
    <div className="flex items-center gap-4">
      {weatherData && (
        <div className="flex items-center gap-2">
          <WeatherIcon
            icon={weatherData.icon}
            description={weatherData.description}
            size="md"
          />
          <span className="text-2xl font-bold">{weatherData.temperature}°</span>
        </div>
      )}
      {forecastData?.today && (
        <div className="text-sm text-gray-600">
          <div>최고 {forecastData.today.max}°</div>
          <div>최저 {forecastData.today.min}°</div>
        </div>
      )}
    </div>
  );
}
