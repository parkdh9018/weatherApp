import type { WeatherApiResponse, WeatherData } from "./type";

export const transformWeatherData = (
  data: WeatherApiResponse,
  customAddress: string
): WeatherData => {
  return {
    city: customAddress || data.name, // 카카오 주소 우선 사용
    country: data.sys.country,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    description: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 10) / 10,
    icon: data.weather[0].icon,
    timestamp: new Date(),
  };
};
