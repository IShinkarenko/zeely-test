interface CircularProgressProps {
  progress: number;
  timeRemaining?: string;
}

export function CircularProgress({
  progress,
  timeRemaining,
}: CircularProgressProps) {
  const size = 65;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center">
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-gray-700"
            opacity={0.2}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (progress / 100) * circumference}
            strokeLinecap="round"
            className="text-green-500 transition-all duration-300"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-sm font-medium text-white leading-[100%]">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
      {timeRemaining && (
        <span className="absolute bottom-[13px] text-[12px] text-gray-300 font-semibold leading-[100%] text-center">
          {timeRemaining}
        </span>
      )}
    </div>
  );
}
