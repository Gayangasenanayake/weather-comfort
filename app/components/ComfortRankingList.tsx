"use client";

import { ComfortRanking } from "../types/weather";


interface ComfortRankingListProps {
  rankings: ComfortRanking[];
  isLoading: boolean;
}

export default function ComfortRankingList({ rankings, isLoading }: ComfortRankingListProps) {
  const getMedalEmoji = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `${index + 1}.`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-gradient-to-r from-green-400 to-emerald-500";
    if (score >= 60) return "bg-gradient-to-r from-blue-400 to-cyan-500";
    if (score >= 40) return "bg-gradient-to-r from-yellow-400 to-orange-500";
    return "bg-gradient-to-r from-orange-500 to-red-500";
  };

  if (isLoading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
          <span className="ml-3 text-gray-500">Loading rankings...</span>
        </div>
      </div>
    );
  }

  if (!rankings || rankings.length === 0) {
    return (
      <div className="card">
        <div className="text-center py-8">
          <p className="text-gray-500">No comfort rankings available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">🏆</span>
        <h2 className="text-xl font-semibold text-gray-800">Comfort City Rankings</h2>
        <span className="text-sm text-gray-400 ml-auto">{rankings.length} cities ranked</span>
      </div>
      
      <div className="space-y-3">
        {rankings.map((item, index) => (
          <div 
            key={item.city}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            {/* Rank Number */}
            <div className="w-10 text-center font-bold text-gray-400 text-sm">
              {getMedalEmoji(index)}
            </div>
            
            {/* City Name */}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 truncate">{item.city}</p>
            </div>
            
            {/* Score with Progress Bar */}
            <div className="flex-1 max-w-[200px]">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getProgressColor(item.score)} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${Math.min(100, item.score)}%` }}
                  />
                </div>
                <span className={`text-sm font-bold ${getScoreColor(item.score)} min-w-[40px] text-right`}>
                  {Math.round(item.score)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between text-xs text-gray-400">
        <span>🥇 Top 3</span>
        <span>Score range: {Math.round(rankings[rankings.length - 1]?.score || 0)} - {Math.round(rankings[0]?.score || 0)}</span>
      </div>
    </div>
  );
}