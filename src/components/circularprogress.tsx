import React from "react";

type CircularProgressProps = {
  size?: number; // Adjust width & height
  borderColor?: string; // Customizable border color
  borderWidth?: number; // Adjusts border thickness
  speed?: string; // Animation speed (e.g., "1.5s", "2s", etc.)
  className?: string; // Additional styles
};

const CircularProgress: React.FC<CircularProgressProps> = ({
  size = 32,
  borderColor = "border-blue-500", // ✅ Default color
  borderWidth = 4,
  speed = "1.5s",
  className = "",
}) => {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-solid border-e-transparent align-[-0.125em] ${borderColor} ${className}`}
      style={{
        width: size,
        height: size,
        borderWidth: borderWidth,
        animation: `spin ${speed} cubic-bezier(0.65, 0, 0.35, 1) infinite`,
      }}
      role="status"
    >
      <span className="sr-only">Loading...</span>
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
