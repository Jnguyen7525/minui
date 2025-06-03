// import React from "react";

// type CircularProgressProps = {
//   size?: number; // Adjust width & height
//   borderColor?: string; // Customizable border color
//   borderWidth?: number; // Adjusts border thickness
//   speed?: string; // Animation speed (e.g., "1.5s", "2s", etc.)
//   className?: string; // Additional styles
// };

// const CircularProgress: React.FC<CircularProgressProps> = ({
//   size = 32,
//   borderColor = "border-blue-500", // ✅ Default color
//   borderWidth = 4,
//   speed = "1.5s",
//   className = "",
// }) => {
//   return (
//     <div
//       className={`inline-block animate-spin rounded-full border-solid border-e-transparent align-[-0.125em] ${borderColor} ${className}`}
//       style={{
//         width: size,
//         height: size,
//         borderWidth: borderWidth,
//         animation: `spin ${speed} cubic-bezier(0.65, 0, 0.35, 1) infinite`,
//       }}
//       role="status"
//     >
//       <span className="sr-only">Loading...</span>
//       <style>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CircularProgress;

// import React from "react";

// type CircularProgressProps = {
//   size?: number; // Adjust width & height
//   borderColor?: string; // Customizable border color
//   borderWidth?: number; // Adjusts border thickness
//   speed?: string; // Animation speed
//   className?: string; // Additional styles
//   label?: string; // ✅ Bottom label text
//   showValueLabel?: boolean; // ✅ Show progress % in center
//   progress?: number; // ✅ Tracks progress (0-100)
// };

// const CircularProgress: React.FC<CircularProgressProps> = ({
//   size = 60,
//   borderColor = "border-blue-500",
//   borderWidth = 6,
//   speed = "1.5s",
//   className = "",
//   label = "",
//   showValueLabel = false,
//   progress,
// }) => {
//   const isIndeterminate = progress === undefined;

//   return (
//     <div className="flex flex-col items-center gap-2">
//       <div
//         className={`inline-block rounded-full border-solid border-e-transparent align-[-0.125em] ${borderColor} ${className} ${
//           isIndeterminate ? "animate-spin" : ""
//         }`}
//         style={{
//           width: size,
//           height: size,
//           borderWidth: borderWidth,
//           animation: isIndeterminate
//             ? `spin ${speed} cubic-bezier(0.65, 0, 0.35, 1) infinite`
//             : "none",
//         }}
//         role="status"
//       >
//         {/* Progress Value Label */}
//         {showValueLabel && progress !== undefined && (
//           <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold z-50">
//             {progress}%
//           </span>
//         )}
//       </div>

//       {/* Bottom Label */}
//       {label && <span className="text-sm font-semibold">{label}</span>}

//       {/* Animation Keyframes */}
//       <style>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CircularProgress;

// import React from "react";

// type CircularProgressProps = {
//   size?: number; // Adjust width & height
//   borderColor?: string; // Customizable border color
//   borderWidth?: number; // Adjusts border thickness
//   speed?: string; // Animation speed
//   className?: string; // Additional styles
//   label?: string; // ✅ Bottom label text
//   showValueLabel?: boolean; // ✅ Show progress % in center
//   progress?: number; // ✅ Tracks progress (0-100)
// };

// const CircularProgress: React.FC<CircularProgressProps> = ({
//   size = 60,
//   borderColor = "border-blue-500",
//   borderWidth = 6,
//   speed = "1.5s",
//   className = "",
//   label = "",
//   showValueLabel = false,
//   progress,
// }) => {
//   const isIndeterminate = progress === undefined;

//   return (
//     <div className="flex flex-col items-center gap-2">
//       {/* Outer Circle (Spinner Arc) */}
//       <div
//         className={`relative inline-block rounded-full border-solid border-e-transparent align-[-0.125em] ${borderColor} ${className} ${
//           isIndeterminate ? "animate-spin" : ""
//         }`}
//         style={{
//           width: size,
//           height: size,
//           borderWidth: borderWidth,
//           animation: isIndeterminate
//             ? `spin ${speed} cubic-bezier(0.65, 0, 0.35, 1) infinite`
//             : "none",
//         }}
//         role="status"
//       >
//         {/* Progress Arc (Filling from 0° to 360°) */}
//         {!isIndeterminate && (
//           <div
//             className="absolute inset-0 rounded-full border-solid border-e-transparent"
//             style={{
//               borderWidth: borderWidth,
//               transform: `rotate(${(progress / 100) * 360}deg)`, // ✅ Makes progress go around the circle
//               transition: "transform 0.3s ease-in-out",
//             }}
//           />
//         )}

//         {/* Progress Value Label (Centered inside the circle) */}
//         {showValueLabel && !isIndeterminate && (
//           <span className="absolute inset-0 flex items-center justify-center text-lg font-bold z-50">
//             {progress}%
//           </span>
//         )}
//       </div>

//       {/* Bottom Label */}
//       {label && <span className="text-sm font-semibold">{label}</span>}

//       {/* Animation Keyframes */}
//       <style>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CircularProgress;

// import React from "react";

// type CircularProgressProps = {
//   size?: number; // Adjust width & height
//   borderColor?: string; // Customizable border color
//   borderWidth?: number; // Adjusts border thickness
//   speed?: string; // Animation speed
//   className?: string; // Additional styles
//   label?: string; // ✅ Bottom label text
//   showValueLabel?: boolean; // ✅ Show progress % in center
//   progress?: number; // ✅ Tracks progress (0-100)
//   valueTopPosition?: string;
// };

// const CircularProgress: React.FC<CircularProgressProps> = ({
//   size = 60,
//   borderColor = "border-blue-500",
//   borderWidth = 6,
//   speed = "1.5s",
//   className = "",
//   label = "",
//   showValueLabel = false,
//   progress,
//   valueTopPosition = "top-8",
// }) => {
//   const isIndeterminate = progress === undefined;

//   return (
//     <div className="flex flex-col items-center gap-2 relative">
//       {/* Outer Circle (Hidden when tracking progress) */}
//       {!isIndeterminate && (
//         <div
//           className={`absolute rounded-full border-solid ${className}`}
//           style={{
//             width: size,
//             height: size,
//             borderWidth: borderWidth,
//             borderColor: "transparent",
//           }}
//         />
//       )}

//       {/* Progress Arc (Now only rotates the border) */}
//       <div
//         className={`relative inline-block rounded-full border-solid border-e-transparent align-[-0.125em] ${borderColor} ${
//           isIndeterminate ? "animate-spin" : ""
//         }`}
//         style={{
//           width: size,
//           height: size,
//           borderWidth: borderWidth,
//           animation: isIndeterminate
//             ? `spin ${speed} cubic-bezier(0.65, 0, 0.35, 1) infinite`
//             : "none",
//           transform: !isIndeterminate
//             ? `rotate(${(progress / 100) * 360}deg)`
//             : "none",
//           transition: "transform 0.3s ease-in-out",
//         }}
//         role="status"
//       />

//       {/* Progress Value Label (Now properly centered) */}
//       {showValueLabel && !isIndeterminate && (
//         <span
//           className={`absolute ${valueTopPosition} left-1/2 text-lg font-bold z-50`}
//           style={{ transform: "translate(-50%, -50%)" }}
//         >
//           {progress}%
//         </span>
//       )}

//       {/* Bottom Label */}
//       {label && <span className="text-sm font-semibold">{label}</span>}

//       {/* Animation Keyframes */}
//       <style>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CircularProgress;

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
          className="rotate-[-90deg]"
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
