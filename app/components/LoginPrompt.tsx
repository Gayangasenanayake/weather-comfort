// components/LoginPrompt.tsx
"use client";

import Link from "next/link";

interface LoginPromptProps {
  onLogin: () => void;
}

export default function LoginPrompt({ onLogin }: LoginPromptProps) {
  return (
    <div className="max-w-md mx-auto">
      <div className="card text-center">
        <div className="mb-6">
          <span className="text-6xl">🔒</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Authentication Required
        </h2>
        <p className="text-gray-600 mb-6">
          You need to be logged in to view detailed weather data and comfort scores for cities.
        </p>
        <div className="space-y-3">
          <button
            onClick={onLogin}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
          >
            Login Now
          </button>
        </div>
      </div>
    </div>
  );
}