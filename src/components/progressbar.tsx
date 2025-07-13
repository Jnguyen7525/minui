import React from "react";

type ProgressBarProps = {
  progress?: number; // Tracks progress (0-100)
  isIndeterminate?: boolean; // ✅ Enables loading animation
  startLabel?: string; // Label on the top-left
  endLabel?: string; // Label on the top-right
  className?: string; // Allows extra styling
  barColor?: string;
  barHeight?: number;
  barWidth?: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress = 0,
  isIndeterminate = false, // ✅ Default to false
  startLabel = "",
  endLabel = "",
  className = "bg-blue-500",
  barHeight = 10,
  barWidth = 10,
}) => {
  return (
    <div className="w-full  flex flex-col items-start">
      {/* Labels */}
      <div className={`flex w-full justify-between mb-2`}>
        <span>{startLabel}</span>
        <span>{endLabel}</span>
      </div>

      {/* Progress Bar */}

      <div
        className={`relative rounded-lg  overflow-hidden `}
        style={{ height: `${barHeight}px`, width: `${barWidth}px` }}
      >
        <div
          className={`h-full ${className} transition-all duration-300 rounded-lg ${
            isIndeterminate ? "animate-indeterminate" : ""
          }`}
          style={
            isIndeterminate ? { width: "100%" } : { width: `${progress}%` }
          }
        />
      </div>
      {/* Indeterminate Animation */}
      <style>{`
        @keyframes indeterminate {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        .animate-indeterminate {
          animation: indeterminate 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ProgressBar;
