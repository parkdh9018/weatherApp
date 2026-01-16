import type { WeatherApiResponse, ForecastApiResponse } from "../model/type";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const weatherApi = {
  getCurrentWeatherByCoords: async (
    lat: number,
    lon: number
  ): Promise<WeatherApiResponse> => {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
    );

    if (!response.ok) {
      throw new Error("날씨 정보를 가져오는데 실패했습니다");
    }

    return response.json();
  },

  getForecastByCoords: async (
    lat: number,
    lon: number
  ): Promise<ForecastApiResponse> => {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
    );

    if (!response.ok) {
      throw new Error("예보 정보를 가져오는데 실패했습니다");
    }

    return response.json();
  },
};
