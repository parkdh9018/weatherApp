import { CurrentWeather } from "@/entities/weather";
import { useWeatherByCity } from "@/entities/weather/model/useWeather";

export function WeatherDashboard() {
  const { data: weather, isLoading, error } = useWeatherByCity("복정동");

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
          {weather && (
            <CurrentWeather weather={weather} isLoading={isLoading} />
          )}
        </div>
      </div>
    </div>
  );
}
