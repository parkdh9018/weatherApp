import type {
  WeatherApiResponse,
  WeatherData,
  ForecastApiResponse,
  HourlyForecast,
} from "./type";

export const transformWeatherData = (
  data: WeatherApiResponse,
  customAddress: string,
): WeatherData => {
  return {
    city: customAddress || data.name, // 카카오 주소 우선 사용
    country: data.sys.country,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    description: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 10) / 10,
    pressure: data.main.pressure,
    icon: data.weather[0].icon,
    timestamp: new Date(),
  };
};

/**
 * Forecast 데이터에서 당일 최저/최고 기온 추출
 */
export const getTodayMinMaxTemp = (
  data: ForecastApiResponse,
): { min: number; max: number } => {
  const today = new Date();
  const todayDateString = today.toISOString().split("T")[0]; // YYYY-MM-DD

  const todayForecasts = data.list.filter((item) => {
    const itemDate = new Date(item.dt * 1000);
    const itemDateString = itemDate.toISOString().split("T")[0];
    return itemDateString === todayDateString;
  });

  if (todayForecasts.length === 0) {
    return { min: 0, max: 0 };
  }

  // temp, temp_min, temp_max 모두 고려
  const allTemps = todayForecasts.flatMap((item) => [
    item.main.temp,
    item.main.temp_min,
    item.main.temp_max,
  ]);

  return {
    min: Math.round(Math.min(...allTemps) * 10) / 10,
    max: Math.round(Math.max(...allTemps) * 10) / 10,
  };
};

/**
 * Forecast 데이터에서 내일 최저/최고 기온 추출
 */
export const getTomorrowMinMaxTemp = (
  data: ForecastApiResponse,
): { min: number; max: number } => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDateString = tomorrow.toISOString().split("T")[0]; // YYYY-MM-DD

  const tomorrowForecasts = data.list.filter((item) => {
    const itemDate = new Date(item.dt * 1000);
    const itemDateString = itemDate.toISOString().split("T")[0];
    return itemDateString === tomorrowDateString;
  });

  if (tomorrowForecasts.length === 0) {
    return { min: 0, max: 0 };
  }

  // temp, temp_min, temp_max 모두 고려
  const allTemps = tomorrowForecasts.flatMap((item) => [
    item.main.temp,
    item.main.temp_min,
    item.main.temp_max,
  ]);

  return {
    min: Math.round(Math.min(...allTemps) * 10) / 10,
    max: Math.round(Math.max(...allTemps) * 10) / 10,
  };
};

/**
 * Forecast 데이터에서 시간대별 예보 추출 (다음 24시간)
 */
export const getHourlyForecast = (
  data: ForecastApiResponse,
): HourlyForecast[] => {
  const now = new Date();
  const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  return data.list
    .filter((item) => {
      const itemTime = new Date(item.dt * 1000);
      return itemTime >= now && itemTime <= next24Hours;
    })
    .slice(0, 8)
    .map((item) => ({
      time: new Date(item.dt * 1000),
      temperature: Math.round(item.main.temp * 10) / 10,
      icon: item.weather[0].icon,
      description: item.weather[0].description,
    }));
};

/**
 * 내일의 오전(9시), 오후(15시) 날씨 추출
 */
export const getTomorrowMorningAfternoon = (
  data: ForecastApiResponse,
): HourlyForecast[] => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDateString = tomorrow.toISOString().split("T")[0];

  const tomorrowForecasts = data.list.filter((item) => {
    const itemDate = new Date(item.dt * 1000);
    const itemDateString = itemDate.toISOString().split("T")[0];
    return itemDateString === tomorrowDateString;
  });

  // 오전 9시, 오후 3시 데이터 찾기
  const morning = tomorrowForecasts.find((item) => {
    const hour = new Date(item.dt * 1000).getHours();
    return hour === 9;
  });

  const afternoon = tomorrowForecasts.find((item) => {
    const hour = new Date(item.dt * 1000).getHours();
    return hour === 15;
  });

  const result: HourlyForecast[] = [];

  if (morning) {
    result.push({
      time: new Date(morning.dt * 1000),
      temperature: Math.round(morning.main.temp * 10) / 10,
      icon: morning.weather[0].icon,
      description: morning.weather[0].description,
    });
  }

  if (afternoon) {
    result.push({
      time: new Date(afternoon.dt * 1000),
      temperature: Math.round(afternoon.main.temp * 10) / 10,
      icon: afternoon.weather[0].icon,
      description: afternoon.weather[0].description,
    });
  }

  return result;
};
