import type { WeatherApiResponse, WeatherData } from "./type";

export const transformWeatherData = (data: WeatherApiResponse): WeatherData => {
  return {
    city: data.name,
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
