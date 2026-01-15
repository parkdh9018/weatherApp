import { useQuery } from "@tanstack/react-query";
import { geocodingApi } from "../api/geocodingApi";
import { weatherApi } from "../api/weatherApi";
import { transformWeatherData } from "./weatherMapper";

export const useWeatherByCoords = (lat: number, lon: number) => {
  return useQuery({
    queryKey: ["weather", "coords", lat, lon],
    queryFn: async () => {
      const data = await weatherApi.getCurrentWeatherByCoords(lat, lon);
      return transformWeatherData(data);
    },
    enabled: !!(lat && lon),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

export const useCoordinatesByCity = (cityName: string) => {
  return useQuery({
    queryKey: ["coordinates", cityName],
    queryFn: async () => await geocodingApi.getCoordsByAddress(cityName),
    enabled: !!cityName && cityName.length > 0,
    staleTime: 30 * 60 * 1000, // 30분 (좌표는 자주 변하지 않음)
    retry: 2,
  });
};

export const useWeatherByCity = (cityName: string) => {
  return useQuery({
    queryKey: ["weather", "by-city", cityName],
    queryFn: async () => {
      // 1단계: 좌표 가져오기
      const coords = await geocodingApi.getCoordsByAddress(cityName);

      // 2단계: 날씨 가져오기
      const weatherData = await weatherApi.getCurrentWeatherByCoords(
        coords.lat,
        coords.lon
      );

      return transformWeatherData(weatherData);
    },
    enabled: !!cityName && cityName.length > 0,
    staleTime: 0,
    retry: 2,
  });
};
