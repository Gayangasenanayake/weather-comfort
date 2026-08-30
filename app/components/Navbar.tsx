// components/Navbar.tsx
"use client";

import { useAuth } from "./AuthProvider";
import Link from "next/link";

export default function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-white/20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          WeatherComfort
        </Link>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-gray-700 hidden sm:inline">
                Welcome, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-200 text-sm font-medium"
              >
                Login
              </Link>
              {/* <Link
                href="/register"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm font-medium"
              >
                Register
              </Link> */}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}