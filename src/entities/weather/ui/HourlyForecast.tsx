import type { HourlyForecast as HourlyForecastType } from "../model/type";
import { WeatherIcon } from "./WeatherIcon";

interface HourlyForecastProps {
  forecasts: HourlyForecastType[];
}

export function HourlyForecast({ forecasts }: HourlyForecastProps) {
  if (!forecasts || forecasts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white py-4 rounded-2xl mb-4">
      <div className="px-4 mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-700">시간대별 날씨</h2>
      </div>
      <div className="overflow-x-auto">
        <div className="flex justify-between px-4 pb-2">
          {forecasts.slice(0, 24).map((forecast, index) => {
            const hour = forecast.time.getHours();
            const isNow = index === 0;
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <p className="text-xs text-gray-500 mb-2">
                  {isNow ? "지금" : `${hour}시`}
                </p>
                <WeatherIcon
                  icon={forecast.icon}
                  description={forecast.description}
                  size="sm"
                />
                <p className="text-sm font-semibold mt-2">
                  {Math.round(forecast.temperature)}°
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
