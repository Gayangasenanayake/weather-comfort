"use client";

import { useState, useEffect } from "react";
import { useAuth } from "./components/AuthProvider";
import { CityWeather, ComfortRanking, WeatherResponse } from "./types/weather";
import LoginPrompt from "./components/LoginPrompt";
import WeatherDashboard from "./components/WeatherDashboard";
import ComfortRankingList from "./components/ComfortRankingList";
import CityCard from "./components/CityCard";


export default function Home() {
  const { user, loading, mfaRequired } = useAuth();
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [cities, setCities] = useState<CityWeather[]>([]);
  const [comfortRankings, setComfortRankings] = useState<ComfortRanking[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRankingLoading, setIsRankingLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    if (user && !mfaRequired) {
      fetchComfortRankings();
    }
  }, [user, mfaRequired]);

  const fetchCities = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/cities`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch cities");
      }
      const data = await response.json();
      setCities(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch cities");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchComfortRankings = async () => {
    setIsRankingLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/weather/sorted-by-comfort`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch comfort rankings");
      }
      const data = await response.json();
      setComfortRankings(data.data || []);
    } catch (err) {
      console.error("Error fetching comfort rankings:", err);
    } finally {
      setIsRankingLoading(false);
    }
  };

  const fetchWeather = async (cityCode: string) => {
    if (!user || mfaRequired) {
      setShowLoginPrompt(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/weather/city/${encodeURIComponent(cityCode)}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data.data);
      setSelectedCity(cityCode);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch weather data");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      const foundCity = cities.find(city => 
        city.CityName.toLowerCase().includes(searchInput.toLowerCase())
      );
      if (foundCity) {
        fetchWeather(foundCity.CityCode);
      } else {
        setError("City not found. Please try another name.");
      }
    }
  };

  const handleCityClick = (cityCode: string) => {
    fetchWeather(cityCode);
  };

  const handleBack = () => {
    setWeatherData(null);
    setSelectedCity(null);
    setShowLoginPrompt(false);
  };

  const handleLoginRedirect = () => {
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (showLoginPrompt) {
    return (
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={handleBack}
          className="mb-6 inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Cities
        </button>
        <LoginPrompt onLogin={handleLoginRedirect} />
      </div>
    );
  }

  if (weatherData && user && !mfaRequired) {
    return (
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={handleBack}
          className="mb-6 inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Cities
        </button>
        <WeatherDashboard data={weatherData} user={user} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🌤️ Weather Comfort Explorer</h1>
        <p className="text-gray-500">Discover comfort scores for cities around the world</p>
        {(!user || mfaRequired) && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-md mx-auto">
            <p className="text-sm text-yellow-700">
              🔒 Please <a href="/login" className="font-semibold text-yellow-800 underline hover:text-yellow-900">login</a> to view detailed weather data
            </p>
          </div>
        )}
      </div>

      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for a city..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
          />
        </form>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6 max-w-2xl mx-auto">
          {error}
        </div>
      )}

      

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading cities...</p>
          </div>
        </div>
      ) : cities.length > 0 ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Popular Cities</h2>
            <span className="text-sm text-gray-500">{cities.length} cities available</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cities.map((city) => (
              <CityCard
                key={city.CityCode}
                city={city}
                onClick={() => handleCityClick(city.CityCode)}
                isAuthenticated={!!user && !mfaRequired}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-12">
          <p>No cities available. Please check your connection.</p>
        </div>
      )}

      {user && !mfaRequired && (
        <div className="m-8">
          <ComfortRankingList 
            rankings={comfortRankings}
            isLoading={isRankingLoading}
          />
        </div>
      )}

    </div>
  );
}