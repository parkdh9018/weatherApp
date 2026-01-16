import { CurrentWeather } from "@/entities/weather";
import {
  useWeatherByCity,
  useWeatherByCoords,
} from "@/entities/weather/model/useWeather";
import { useCityStore } from "@/shared/model";

export function WeatherDashboard() {
  const selectedCity = useCityStore((state) => state.selectedCity);
  const selectedCoords = useCityStore((state) => state.selectedCoords);

  // 도시 이름으로 조회
  const {
    data: weatherByCity,
    isLoading: loadingCity,
    error: errorCity,
  } = useWeatherByCity(selectedCity || "");

  // 좌표로 조회
  const {
    data: weatherByCoords,
    isLoading: loadingCoords,
    error: errorCoords,
  } = useWeatherByCoords(selectedCoords?.lat || 0, selectedCoords?.lon || 0);

  // 좌표가 있으면 좌표 기반, 없으면 도시 기반
  const weather = selectedCoords ? weatherByCoords : weatherByCity;
  const isLoading = selectedCoords ? loadingCoords : loadingCity;
  const error = selectedCoords ? errorCoords : errorCity;

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
