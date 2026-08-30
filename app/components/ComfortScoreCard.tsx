interface ComfortScoreCardProps {
  score: number;
  category: string;
  isAuthenticated: boolean;
}

export default function ComfortScoreCard({ score, category, isAuthenticated }: ComfortScoreCardProps) {
  const getColorClass = (score: number) => {
    if (score >= 80) return "comfort-excellent";
    if (score >= 60) return "comfort-good";
    if (score >= 40) return "comfort-moderate";
    if (score >= 20) return "comfort-poor";
    return "comfort-very-poor";
  };

  const getEmoji = (score: number) => {
    if (score >= 80) return "😊";
    if (score >= 60) return "🙂";
    if (score >= 40) return "😐";
    if (score >= 20) return "😕";
    return "😫";
  };

  return (
    <div className="text-center">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Comfort Score</h2>
        {isAuthenticated && (
          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
            ✓ Full Access
          </span>
        )}
      </div>
      
      <div className={`w-full h-4 rounded-full bg-gray-200 mb-4 overflow-hidden`}>
        <div
          className={`h-full ${getColorClass(score)} transition-all duration-1000 ease-out`}
          style={{ width: `${Math.min(100, score)}%` }}
        />
      </div>
      
      <div className="flex items-center justify-center gap-4">
        <span className="text-5xl font-bold text-gray-800">{Math.round(score)}</span>
        <span className="text-3xl">{getEmoji(score)}</span>
      </div>
      
      <p className="text-lg font-medium text-gray-700 mt-2">{category}</p>
      
      {!isAuthenticated && (
        <p className="text-sm text-gray-500 mt-2">
          Login for detailed analytics
        </p>
      )}
    </div>
  );
}