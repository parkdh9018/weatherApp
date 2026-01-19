import { WeatherIcon } from "./WeatherIcon";

interface TomorrowWeatherProps {
  tomorrowMinMax: { min: number; max: number };
  tomorrowForecasts?: Array<{
    time: Date;
    temperature: number;
    icon: string;
    description: string;
  }>;
}

export function TomorrowWeather({
  tomorrowMinMax,
  tomorrowForecasts,
}: TomorrowWeatherProps) {
  return (
    <div className="bg-white rounded-2xl p-4">
      <div className="text-sm text-gray-500 mb-3">
        내일{" "}
        {(() => {
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          return tomorrow.toLocaleDateString("ko-KR", {
            month: "2-digit",
            day: "2-digit",
          });
        })()}
      </div>
      <div className="mb-3">
        <div className="text-base mb-2">
          최저{" "}
          <span className="font-semibold">
            {Math.round(tomorrowMinMax.min)}°
          </span>{" "}
          / 최고{" "}
          <span className="font-semibold">
            {Math.round(tomorrowMinMax.max)}°
          </span>
        </div>
        {tomorrowForecasts && tomorrowForecasts.length >= 2 && (
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-1">
              <span className="text-gray-600 ">오전</span>
              <WeatherIcon
                icon={tomorrowForecasts[0].icon}
                description={tomorrowForecasts[0].description}
                size="sm"
              />
              <span className="font-medium font-semibold">
                {Math.round(tomorrowForecasts[0].temperature)}°
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-600">오후</span>
              <WeatherIcon
                icon={tomorrowForecasts[1].icon}
                description={tomorrowForecasts[1].description}
                size="sm"
              />
              <span className="font-medium font-semibold">
                {Math.round(tomorrowForecasts[1].temperature)}°
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
