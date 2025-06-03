import React from "react";

type ProgressBarProps = {
  progress?: number; // ✅ Tracks progress (0-100)
  className?: string; // Allows extra styling
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress = 0,
  className = "",
}) => {
  return (
    <div
      className={`w-full bg-gray-300 rounded-lg h-5 overflow-hidden relative ${className}`}
    >
      <div
        className="h-full bg-blue-500 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
