import { useCoordinatesByCity } from "@/entities/weather/model/useWeather";

export function WeatherDashboard() {
  const { data: coordinates, error } = useCoordinatesByCity("서울");

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        좌표 정보를 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 p-4">
        <div className="space-y-6">
          {coordinates && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Coordinates</h2>
              <p>Latitude: {coordinates.lat}</p>
              <p>Longitude: {coordinates.lon}</p>
            </div>
          )}
          {/* {weather && (
            <CurrentWeather weather={weather} isLoading={isLoading} />
          )} */}
        </div>
      </div>
    </div>
  );
}
