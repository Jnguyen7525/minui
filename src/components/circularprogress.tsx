import React from "react";

type CircularProgressProps = {
  size?: number; // Adjust width & height
  borderColor?: string; // Customizable border color
  borderWidth?: number; // Adjusts border thickness
  speed?: string; // Animation speed
  className?: string; // Additional styles
  label?: string; // ✅ Bottom label text
  showValueLabel?: boolean; // ✅ Show progress % in center
  progress?: number; // ✅ Tracks progress (0-100)
  valueTopPosition?: string;
};

const CircularProgress: React.FC<CircularProgressProps> = ({
  size = 60,
  borderColor = "stroke-blue-500",
  borderWidth = 6,
  speed = "1.5s",
  className = "",
  label = "",
  showValueLabel = false,
  progress,
  valueTopPosition = "top-8",
}) => {
  const isIndeterminate = progress === undefined;
  const radius = (size - borderWidth) / 2; // Calculate radius
  const circumference = 2 * Math.PI * radius; // Full circle length
  const strokeDashoffset = !isIndeterminate
    ? ((100 - progress) / 100) * circumference
    : circumference;

  return (
    <div className="flex flex-col items-center gap-2 relative">
      {/* Indeterminate Mode (Still Uses Div-Based Spinner) */}
      {isIndeterminate && (
        <div
          className={`inline-block animate-spin rounded-full border-solid border-e-transparent align-[-0.125em] ${borderColor} ${className}`}
          style={{
            width: size,
            height: size,
            borderWidth: borderWidth,
            animation: `spin ${speed} cubic-bezier(0.65, 0, 0.35, 1) infinite`,
          }}
          role="status"
        />
      )}

      {/* Progress Tracking (Uses SVG for Filling) */}
      {!isIndeterminate && (
        <svg
          className={`rotate-[-90deg] ${className} `}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={borderWidth}
            className="stroke-gray-300 fill-none"
          />

          {/* Progress Circle (Now Properly Fills Up) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={borderWidth}
            className={`${borderColor} fill-none transition-all duration-300`}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
      )}

      {/* Progress Value Label (Centered Inside) */}
      {showValueLabel && !isIndeterminate && (
        <span
          className={`absolute ${valueTopPosition} left-1/2 text-lg font-bold z-50`}
          style={{
            transform: "translate(-50%, -50%)",
          }}
        >
          {progress}%
        </span>
      )}

      {/* Bottom Label */}
      {label && <span className="text-sm font-semibold">{label}</span>}

      {/* Animation Keyframes */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default CircularProgress;
