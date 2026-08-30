// components/WeatherCard.tsx
import { WeatherResponse } from "../types/weather";

export default function WeatherCard({ data }: { data: WeatherResponse }) {
  const getWeatherIcon = (iconCode?: string) => {
    if (iconCode) {
      return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    }
    const condition = data.weather_condition?.toLowerCase() || '';
    if (condition.includes('clear')) return 'https://openweathermap.org/img/wn/01d@2x.png';
    if (condition.includes('cloud')) return 'https://openweathermap.org/img/wn/04d@2x.png';
    if (condition.includes('rain')) return 'https://openweathermap.org/img/wn/10d@2x.png';
    if (condition.includes('snow')) return 'https://openweathermap.org/img/wn/13d@2x.png';
    if (condition.includes('thunder')) return 'https://openweathermap.org/img/wn/11d@2x.png';
    if (condition.includes('mist') || condition.includes('fog')) return 'https://openweathermap.org/img/wn/50d@2x.png';
    return 'https://openweathermap.org/img/wn/03d@2x.png';
  };

  const getRankingColor = (ranking?: number) => {
    if (!ranking) return '';
    if (ranking <= 3) return 'from-yellow-400 to-orange-500';
    if (ranking <= 5) return 'from-gray-300 to-gray-400';
    if (ranking <= 10) return 'from-amber-600 to-amber-700';
    return 'from-indigo-500 to-purple-500';
  };

  const getRankingEmoji = (ranking?: number) => {
    if (!ranking) return '';
    if (ranking <= 3) return '🥇';
    if (ranking <= 5) return '🥈';
    if (ranking <= 10) return '🥉';
    return '🏅';
  };

  const iconUrl = getWeatherIcon(data.raw_weather_data?.weather?.[0]?.icon);
  const rankingColor = getRankingColor(data.ranking);
  const rankingEmoji = getRankingEmoji(data.ranking);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 py-2">
      {/* Weather Icon */}
      <div className="relative">
        <img
          src={iconUrl}
          alt={data.weather_condition}
          className="w-20 h-20"
        />
        {/* {data.ranking && (
          <div className="absolute -top-2 -right-2 text-2xl">
            {rankingEmoji}
          </div>
        )} */}
      </div>
      
      {/* Weather Condition */}
      <p className="text-gray-600 capitalize text-center text-sm font-medium">
        {data.weather_condition || 'N/A'}
      </p>
      
      {/* Ranking Display */}
      {data.ranking && (
        <div className="mt-1 text-center">
          <div className={`bg-gradient-to-r ${rankingColor} text-white px-4 py-1.5 rounded-lg shadow-md inline-block`}>
            <div className="flex items-center gap-2">
              {/* <span className="text-xs font-medium opacity-80">RANK</span> */}
            {rankingEmoji}
              <span className="text-xs font-medium opacity-80">RANK</span>
              <span className="text-2xl font-bold">#{data.ranking}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}