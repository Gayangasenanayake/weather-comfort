// app/api/weather/route.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-in-production"
);

// This is a proxy to your backend API
const BACKEND_API_URL = process.env.BACKEND_API_URL;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const city = searchParams.get("city");

    if (!city) {
      return NextResponse.json(
        { error: "City parameter is required" },
        { status: 400 }
      );
    }

    // Check authentication
    const token = request.cookies.get("token")?.value;
    let isAuthenticated = false;
    let user = null;

    if (token) {
      try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        isAuthenticated = true;
        user = {
          email: payload.email,
          name: payload.name,
        };
      } catch (error) {
        // Token invalid, serve limited data
      }
    }

    // Forward request to your backend API
    const response = await fetch(
      `${BACKEND_API_URL}/weather?city=${encodeURIComponent(city)}`,
      {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch weather data from backend");
    }

    const data = await response.json();

    // Return the data from your backend
    return NextResponse.json({
      weather: {
        city: data.city_name || data.city,
        country: data.country,
        temperature: data.temperature,
        feelsLike: data.raw_weather_data?.main?.feels_like || data.temperature,
        humidity: data.humidity,
        windSpeed: data.wind_speed,
        condition: data.weather_condition,
        conditionCode: data.raw_weather_data?.weather?.[0]?.id || 0,
        icon: data.raw_weather_data?.weather?.[0]?.icon || "",
        timestamp: data.raw_weather_data?.dt || Date.now(),
      },
      comfort: {
        score: data.comfort_index?.score || 0,
        category: data.comfort_index?.interpretation || "",
        ...(isAuthenticated && {
          factors: {
            temperatureFactor: data.comfort_index?.factors?.temperature_factor || 0,
            humidityFactor: data.comfort_index?.factors?.humidity_factor || 0,
            windFactor: data.comfort_index?.factors?.wind_factor || 0,
            conditionFactor: data.comfort_index?.factors?.weather_condition_factor || 0,
            extremesPenalty: data.comfort_index?.factors?.extremes_penalty || 0,
          },
          recommendations: data.comfort_index?.recommendations || [],
        }),
      },
      isAuthenticated,
      user,
    });
  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}