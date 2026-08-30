// types/weather.ts
export interface CityWeather {
  CityCode: string;
  CityName: string;
  Temp: string;
  Status: string;
}

export interface CitiesResponse {
  success: boolean;
  total: number;
  data: CityWeather[];
}

export interface ComfortRanking {
  city: string;
  score: number;
}

export interface ComfortRankingResponse {
  success: boolean;
  data: ComfortRanking[];
}

export interface WeatherDetailResponse {
  success: boolean;
  data: {
    city_name: string;
    country: string;
    temperature: number;
    humidity: number;
    wind_speed: number;
    weather_condition: string;
    ranking?: number;
    comfort_index: {
      score: number;
      factors: {
        temperature_factor: number;
        humidity_factor: number;
        wind_factor: number;
        weather_condition_factor: number;
        extremes_penalty: number;
      };
      interpretation: string;
    };
    raw_weather_data: {
      weather: Array<{
        id: number;
        main: string;
        description: string;
        icon: string;
      }>;
      dt: number;
    };
  };
}

export interface WeatherResponse {
  city_name: string;
  country: string;
  temperature: number;
  humidity: number;
  wind_speed: number;
  weather_condition: string;
  ranking?: number;
  comfort_index: {
    score: number;
    factors: {
      temperature_factor: number;
      humidity_factor: number;
      wind_factor: number;
      weather_condition_factor: number;
      extremes_penalty: number;
    };
    interpretation: string;
  };
  raw_weather_data: {
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    dt: number;
  };
}