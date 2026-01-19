import { useQuery } from "@tanstack/react-query";
import { geocodingApi } from "../api/geocodingApi";
import { weatherApi } from "../api/weatherApi";
import {
  transformWeatherData,
  getTodayMinMaxTemp,
  getTomorrowMinMaxTemp,
  getHourlyForecast,
  getTomorrowMorningAfternoon,
} from "./weatherMapper";

export const useWeatherByCoords = (
  lat: number,
  lon: number,
  customAddress: string,
) => {
  return useQuery({
    queryKey: ["weather", "coords", lat, lon],
    queryFn: async () => {
      const data = await weatherApi.getCurrentWeatherByCoords(lat, lon);
      return transformWeatherData(data, customAddress);
    },
    enabled: !!(lat && lon),
    staleTime: 5 * 60 * 1000, // 5분
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

export const useForecastByCoords = (lat: number, lon: number) => {
  return useQuery({
    queryKey: ["forecast", "coords", lat, lon],
    queryFn: async () => {
      const data = await weatherApi.getForecastByCoords(lat, lon);
      return {
        today: getTodayMinMaxTemp(data),
        tomorrow: getTomorrowMinMaxTemp(data),
        hourly: getHourlyForecast(data),
        tomorrowMorningAfternoon: getTomorrowMorningAfternoon(data),
      };
    },
    enabled: !!(lat && lon),
    staleTime: 30 * 60 * 1000, // 30분
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

export const useWeatherByCity = (cityName: string) => {
  return useQuery({
    queryKey: ["weather", "by-city", cityName],
    queryFn: async () => {
      // 1단계: 좌표 가져오기
      const coords = await geocodingApi.getCoordsByAddress(cityName);

      // 2단계: 날씨와 예보 병렬로 가져오기
      const [weatherData, forecastData] = await Promise.all([
        weatherApi.getCurrentWeatherByCoords(coords.lat, coords.lon),
        weatherApi.getForecastByCoords(coords.lat, coords.lon),
      ]);

      return {
        weather: transformWeatherData(weatherData, coords.address),
        forecast: {
          minMax: getTodayMinMaxTemp(forecastData),
          hourly: getHourlyForecast(forecastData),
        },
        coords: { lat: coords.lat, lon: coords.lon },
      };
    },
    enabled: !!cityName && cityName.length > 0,
    staleTime: 5 * 60 * 1000, // 5분
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};
