"use client";

import WeatherCard from "./WeatherCard";
import ComfortScoreCard from "./ComfortScoreCard";
import WeatherDetails from "./WeatherDetails";
import { WeatherResponse } from "../types/weather";

interface WeatherDashboardProps {
  data: WeatherResponse;
  user: any;
}

export default function WeatherDashboard({ data, user }: WeatherDashboardProps) {
  const isAuthenticated = !!user;

const getRankingBadge = (ranking?: number) => {
    if (!ranking) return null;
    if (ranking <= 3) {
      return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">🏆 Top {ranking}</span>;
    } else if (ranking <= 5) {
      return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">⭐ Rank #{ranking}</span>;
    } else {
      return <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">📊 Rank #{ranking}</span>;
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          {data.city_name}, {data.country}
        </h1>
        <p className="text-gray-500 mt-1">
          {data.raw_weather_data?.dt 
            ? new Date(data.raw_weather_data.dt * 1000).toLocaleString()
            : 'Current Weather'
          }
        </p>
        <div className="mt-2 inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Authenticated
        </div>
      </div>

      <div className="card">
        <ComfortScoreCard 
          score={data.comfort_index.score}
          category={data.comfort_index.interpretation}
          isAuthenticated={isAuthenticated}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <WeatherCard data={data} />
        </div>
        
        <div className="card">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Quick Overview</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="metric-card">
                <p className="text-sm text-gray-500">Temperature</p>
                <p className="text-2xl font-bold text-gray-800">{Math.round(data.temperature)}°C</p>
              </div>
              <div className="metric-card">
                <p className="text-sm text-gray-500">Humidity</p>
                <p className="text-2xl font-bold text-gray-800">{data.humidity}%</p>
              </div>
              <div className="metric-card">
                <p className="text-sm text-gray-500">Wind Speed</p>
                <p className="text-2xl font-bold text-gray-800">{Math.round(data.wind_speed)} km/h</p>
              </div>
              <div className="metric-card">
                <p className="text-sm text-gray-500">Condition</p>
                <p className="text-lg font-semibold text-gray-800 capitalize">{data.weather_condition}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isAuthenticated && data.comfort_index.factors ? (
        <div className="card">
          <WeatherDetails 
            comfortFactors={data.comfort_index.factors}
          />
        </div>
      ) : (
        <div className="card bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200">
          <div className="text-center py-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              🔒 Login for Full Analytics
            </h3>
            <p className="text-gray-600 mb-4">
              Sign in to access detailed comfort metrics and personalized recommendations.
            </p>
            <a
              href="/login"
              className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
            >
              Login Now
            </a>
          </div>
        </div>
      )}
    </div>
  );
}