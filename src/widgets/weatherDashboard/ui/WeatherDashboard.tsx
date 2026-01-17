import { CurrentWeather } from "@/entities/weather";
import {
  useWeatherByCity,
  useWeatherByCoords,
  useForecastByCoords,
} from "@/entities/weather/model/useWeather";
import { useCityStore } from "@/shared/model";

export function WeatherDashboard() {
  const selectedAddress = useCityStore((state) => state.selectedAddress);
  const selectedCoords = useCityStore((state) => state.selectedCoords);

  // 주소로 조회 (날씨 + 예보 함께)
  const {
    data: weatherDataByCity,
    isLoading: loadingCity,
    error: errorCity,
  } = useWeatherByCity(selectedAddress || "");

  // 좌표로 조회 (카카오 주소 사용)
  const {
    data: weatherByCoords,
    isLoading: loadingCoords,
    error: errorCoords,
  } = useWeatherByCoords(
    selectedCoords?.lat || 0,
    selectedCoords?.lon || 0,
    selectedAddress || ""
  );

  // 예보 데이터 (좌표가 있을 때만)
  const { data: forecastByCoords } = useForecastByCoords(
    selectedCoords?.lat || 0,
    selectedCoords?.lon || 0
  );

  // 좌표가 있으면 좌표 기반, 없으면 도시 기반
  // TODO : 구조가 보기 어려움 리팩토링 필요
  const weather = selectedCoords ? weatherByCoords : weatherDataByCity?.weather;
  const forecast = selectedCoords
    ? forecastByCoords
    : weatherDataByCity?.forecast;
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
            <CurrentWeather
              weather={weather}
              isLoading={isLoading}
              minMaxTemp={forecast?.minMax}
              hourlyForecast={forecast?.hourly}
              coords={selectedCoords || weatherDataByCity?.coords}
            />
          )}
        </div>
      </div>
    </div>
  );
}
