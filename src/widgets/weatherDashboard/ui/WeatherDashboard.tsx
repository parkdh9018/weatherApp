import { CurrentWeather } from "@/entities/weather";
import {
  useWeatherByCoords,
  useForecastByCoords,
} from "@/entities/weather/model/useWeather";
import { useCityStore } from "@/shared/model";

export function WeatherDashboard() {
  const selectedAddress = useCityStore((state) => state.selectedAddress);
  const selectedCoords = useCityStore((state) => state.selectedCoords);

  // 현재 날씨 데이터
  const {
    data: weather,
    isLoading,
    error,
  } = useWeatherByCoords(
    selectedCoords.lat,
    selectedCoords.lon,
    selectedAddress,
  );

  // 예보 데이터
  const { data: forecast } = useForecastByCoords(
    selectedCoords.lat,
    selectedCoords.lon,
  );

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        날씨 정보를 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 p-4">
        <div className="space-y-6">
          {weather && selectedCoords && (
            <CurrentWeather
              weather={weather}
              isLoading={isLoading}
              minMaxTemp={forecast?.minMax}
              hourlyForecast={forecast?.hourly}
              coords={selectedCoords}
            />
          )}
        </div>
      </div>
    </div>
  );
}
