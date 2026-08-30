interface WeatherDetailsProps {
  comfortFactors: {
    temperature_factor: number;
    humidity_factor: number;
    wind_factor: number;
    weather_condition_factor: number;
    extremes_penalty: number;
  };
}

export default function WeatherDetails({ comfortFactors }: WeatherDetailsProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Detailed Comfort Analytics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="metric-card">
          <p className="text-sm text-gray-500">Temperature Factor</p>
          <p className="text-2xl font-bold text-gray-800">{Math.round(comfortFactors.temperature_factor)}%</p>
          <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
            <div 
              className="h-full bg-blue-500 rounded-full" 
              style={{ width: `${Math.min(100, comfortFactors.temperature_factor)}%` }}
            />
          </div>
        </div>
        
        <div className="metric-card">
          <p className="text-sm text-gray-500">Humidity Factor</p>
          <p className="text-2xl font-bold text-gray-800">{Math.round(comfortFactors.humidity_factor)}%</p>
          <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
            <div 
              className="h-full bg-cyan-500 rounded-full" 
              style={{ width: `${Math.min(100, comfortFactors.humidity_factor)}%` }}
            />
          </div>
        </div>
        
        <div className="metric-card">
          <p className="text-sm text-gray-500">Wind Factor</p>
          <p className="text-2xl font-bold text-gray-800">{Math.round(comfortFactors.wind_factor)}%</p>
          <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
            <div 
              className="h-full bg-green-500 rounded-full" 
              style={{ width: `${Math.min(100, comfortFactors.wind_factor)}%` }}
            />
          </div>
        </div>
        
        <div className="metric-card">
          <p className="text-sm text-gray-500">Condition Factor</p>
          <p className="text-2xl font-bold text-gray-800">{Math.round(comfortFactors.weather_condition_factor)}%</p>
          <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
            <div 
              className="h-full bg-purple-500 rounded-full" 
              style={{ width: `${Math.min(100, comfortFactors.weather_condition_factor)}%` }}
            />
          </div>
        </div>
      </div>
      
      {comfortFactors.extremes_penalty > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-700 font-medium">
            ⚠️ Extremes Penalty: -{Math.round(comfortFactors.extremes_penalty)} points
          </p>
        </div>
      )}
    </div>
  );
}