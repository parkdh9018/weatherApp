import { CurrentWeather, HourlyForecast } from "@/entities/weather";
import {
  useWeatherByCoords,
  useForecastByCoords,
} from "@/entities/weather/model/useWeather";
import { useCityStore } from "@/app/store";

export function WeatherDashboard() {
  const selectedAddress = useCityStore((state) => state.selectedAddress);
  const selectedCoords = useCityStore((state) => state.selectedCoords);

  // 현재 날씨 데이터
  const {
    data: weather,
    isLoading,
    error,
    refetch: refetchWeather,
  } = useWeatherByCoords(
    selectedCoords.lat,
    selectedCoords.lon,
    selectedAddress,
  );

  // 예보 데이터
  const { data: forecast, refetch: refetchForecast } = useForecastByCoords(
    selectedCoords.lat,
    selectedCoords.lon,
  );

  // 새로고침 핸들러
  const handleRefresh = async () => {
    await Promise.all([refetchWeather(), refetchForecast()]);
  };

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        날씨 정보를 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center">
      <div className="w-full max-w-4xl">
        {weather && selectedCoords && (
          <>
            <CurrentWeather
              weather={weather}
              isLoading={isLoading}
              todayMinMax={forecast?.today}
              tomorrowMinMax={forecast?.tomorrow}
              coords={selectedCoords}
              tomorrowForecasts={forecast?.tomorrowMorningAfternoon}
              onRefresh={handleRefresh}
            />
            {forecast?.hourly && <HourlyForecast forecasts={forecast.hourly} />}
          </>
        )}
      </div>
    </div>
  );
}
