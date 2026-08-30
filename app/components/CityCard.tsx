// components/CityCard.tsx
"use client";

import { CityWeather } from "../types/weather";


interface CityCardProps {
  city: CityWeather;
  onClick: () => void;
  isAuthenticated: boolean;
}

export default function CityCard({ city, onClick, isAuthenticated }: CityCardProps) {
  const getWeatherIcon = (status: string) => {
    const statusLower = status?.toLowerCase() || '';
    if (statusLower.includes('clear')) return '☀️';
    if (statusLower.includes('cloud')) return '☁️';
    if (statusLower.includes('rain')) return '🌧️';
    if (statusLower.includes('snow')) return '❄️';
    if (statusLower.includes('mist') || statusLower.includes('fog')) return '🌫️';
    if (statusLower.includes('thunder')) return '⛈️';
    return '🌤️';
  };

  const getStatusColor = (status: string) => {
    const statusLower = status?.toLowerCase() || '';
    if (statusLower.includes('clear')) return 'text-yellow-500';
    if (statusLower.includes('cloud')) return 'text-gray-500';
    if (statusLower.includes('rain')) return 'text-blue-500';
    if (statusLower.includes('snow')) return 'text-blue-300';
    if (statusLower.includes('mist') || statusLower.includes('fog')) return 'text-gray-400';
    if (statusLower.includes('thunder')) return 'text-purple-500';
    return 'text-gray-600';
  };

  const temp = parseFloat(city.Temp);
  const getTempColor = (temp: number) => {
    if (temp > 30) return 'text-red-500';
    if (temp > 20) return 'text-orange-500';
    if (temp > 10) return 'text-yellow-500';
    if (temp > 0) return 'text-blue-400';
    return 'text-blue-600';
  };

  return (
    <div
      onClick={onClick}
      className={`card cursor-pointer transition-all duration-300 ${
        isAuthenticated 
          ? 'hover:scale-105 hover:shadow-2xl' 
          : 'hover:shadow-lg opacity-75'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{city.CityName}</h3>
          <p className="text-xs text-gray-400">Code: {city.CityCode}</p>
        </div>
        <span className="text-3xl">{getWeatherIcon(city.Status)}</span>
      </div>

      <div className="text-center my-4">
        <p className={`text-4xl font-bold ${getTempColor(temp)}`}>
          {city.Temp}°C
        </p>
        <p className={`text-sm font-medium mt-1 ${getStatusColor(city.Status)}`}>
          {city.Status}
        </p>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {isAuthenticated ? 'Click for details' : '🔒 Login required'}
          </span>
          <span className={`${isAuthenticated ? 'text-indigo-600' : 'text-gray-400'}`}>
            {isAuthenticated ? '→' : '🔒'}
          </span>
        </div>
      </div>
    </div>
  );
}