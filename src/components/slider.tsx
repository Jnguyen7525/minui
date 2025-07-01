// import React, { useState } from "react";

// type SliderProps = {
//   mode?: "single" | "range";
//   min?: number;
//   max?: number;
//   step?: number;
//   value: number | [number, number];
//   onChange: (value: number | [number, number]) => void;
//   className?: string;
// };

// const Slider: React.FC<SliderProps> = ({
//   mode = "single",
//   min = 0,
//   max = 100,
//   step = 1,
//   value,
//   onChange,
//   className = "",
// }) => {
//   const [activeThumb, setActiveThumb] = useState<0 | 1 | null>(null);

//   const isRange = mode === "range";
//   const [val1, val2] = isRange
//     ? (value as [number, number])
//     : [value as number, min];

//   const handleChange =
//     (index: 0 | 1) => (e: React.ChangeEvent<HTMLInputElement>) => {
//       const newVal = Number(e.target.value);
//       if (isRange) {
//         const updated: [number, number] =
//           index === 0 ? [newVal, val2] : [val1, newVal];
//         onChange(updated);
//       } else {
//         onChange(newVal);
//       }
//     };

//   const percent = (n: number) => ((n - min) / (max - min)) * 100;

//   return (
//     <div className={`flex relative h-10 w-full ${className}`}>
//       {/* Base Track */}
//       <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-200 rounded-full -translate-y-1/2" />

//       {/* Active Range */}
//       <div
//         className="absolute top-1/2 h-2 bg-blue-500 rounded-full -translate-y-1/2 transition-all duration-200"
//         style={{
//           //   left: `${percent(val1)}%`,
//           //   width: `${percent(val2) - percent(val1)}%`,
//           left: `${Math.min(percent(val1), percent(val2))}%`,
//           width: `${Math.abs(percent(val2) - percent(val1))}%`,
//         }}
//       />

//       {/* Range Inputs */}
//       <input
//         type="range"
//         min={min}
//         max={max}
//         step={step}
//         value={val1}
//         onChange={handleChange(0)}
//         onMouseDown={() => setActiveThumb(0)}
//         onMouseUp={() => setActiveThumb(null)}
//         className="slider-thumb absolute w-full h-10 appearance-none bg-transparent z-50"
//         style={{ zIndex: activeThumb === 0 ? 20 : 10 }}
//       />

//       {isRange && (
//         <input
//           type="range"
//           min={min}
//           max={max}
//           step={step}
//           value={val2}
//           onChange={handleChange(1)}
//           onMouseDown={() => setActiveThumb(1)}
//           onMouseUp={() => setActiveThumb(null)}
//           className="slider-thumb absolute w-full h-10 appearance-none bg-transparent"
//           style={{ zIndex: activeThumb === 1 ? 20 : 10 }}
//         />
//       )}

//       <style jsx>{`
//         input[type="range"].slider-thumb::-webkit-slider-thumb {
//           -webkit-appearance: none;
//           appearance: none;
//           height: 1rem;
//           width: 1rem;
//           background: white;
//           border: 2px solid #3b82f6;
//           border-radius: 9999px;
//           cursor: pointer;
//           margin-top: -6px;
//           transition: box-shadow 0.2s ease;
//         }

//         input[type="range"].slider-thumb::-moz-range-thumb {
//           height: 1rem;
//           width: 1rem;
//           background: white;
//           border: 2px solid #3b82f6;
//           border-radius: 9999px;
//           cursor: pointer;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Slider;

// import React, { useRef, useEffect } from "react";

// type SliderProps = {
//   mode?: "single" | "range";
//   min?: number;
//   max?: number;
//   step?: number;
//   value: number | [number, number];
//   onChange: (value: number | [number, number]) => void;
//   className?: string;
// };

// const Slider: React.FC<SliderProps> = ({
//   mode = "single",
//   min = 0,
//   max = 100,
//   step = 1,
//   value,
//   onChange,
//   className = "",
// }) => {
//   const isRange = mode === "range";
//   const trackRef = useRef<HTMLDivElement>(null);
//   const dragIndex = useRef<0 | 1 | null>(null);
//   const rafId = useRef<number | null>(null);

//   const [val1, val2] = isRange
//     ? (value as [number, number])
//     : [value as number, min];

//   const percent = (val: number) => ((val - min) / (max - min)) * 100;

//   const getValueFromPosition = (clientX: number) => {
//     if (!trackRef.current) return min;
//     const rect = trackRef.current.getBoundingClientRect();
//     const x = clientX - rect.left;
//     const ratio = x / rect.width;
//     const raw = ratio * (max - min) + min;
//     return Math.round(raw / step) * step;
//   };

//   const handleMouseMove = (e: MouseEvent) => {
//     if (dragIndex.current === null) return;

//     if (rafId.current) cancelAnimationFrame(rafId.current);
//     rafId.current = requestAnimationFrame(() => {
//       const newValue = getValueFromPosition(e.clientX);

//       if (isRange) {
//         const updated: [number, number] =
//           dragIndex.current === 0 ? [newValue, val2] : [val1, newValue];
//         onChange(updated);
//       } else {
//         onChange(newValue);
//       }
//     });
//   };

//   const stopDragging = () => {
//     dragIndex.current = null;
//     document.removeEventListener("mousemove", handleMouseMove);
//     document.removeEventListener("mouseup", stopDragging);
//     if (rafId.current) cancelAnimationFrame(rafId.current);
//   };

//   useEffect(() => {
//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", stopDragging);
//     };
//   }, []);

//   return (
//     <div className={`relative h-10 w-full ${className}`}>
//       {/* Base Track */}
//       <div
//         ref={trackRef}
//         className="absolute top-1/2 left-0 right-0 h-2 bg-gray-200 rounded-full -translate-y-1/2"
//       />

//       {/* Active Range Track */}
//       <div
//         className="absolute top-1/2 h-2 bg-blue-500 rounded-full -translate-y-1/2 transition-all"
//         style={{
//           left: `${Math.min(percent(val1), percent(val2))}%`,
//           width: `${Math.abs(percent(val2) - percent(val1))}%`,
//         }}
//       />

//       {/* Thumbs */}
//       {[val1, ...(isRange ? [val2] : [])].map((val, idx) => (
//         <div
//           key={idx}
//           className="absolute top-1/2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-pointer transition-all -translate-x-1/2 -translate-y-1/2 hover:shadow z-20"
//           style={{ left: `${percent(val)}%` }}
//           onMouseDown={() => {
//             dragIndex.current = idx as 0 | 1;
//             document.addEventListener("mousemove", handleMouseMove);
//             document.addEventListener("mouseup", stopDragging);
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// export default Slider;

import React, { useRef, useEffect } from "react";

type SliderProps = {
  mode?: "single" | "range";
  min?: number;
  max?: number;
  step?: number;
  value: number | [number, number];
  onChange: (value: number | [number, number]) => void;
  className?: string;
};

const Slider: React.FC<SliderProps> = ({
  mode = "single",
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  className = "",
}) => {
  const isRange = mode === "range";
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<0 | 1 | null>(null);

  const [val1, val2] = isRange
    ? (value as [number, number])
    : [value as number, min];

  const percent = (val: number) => ((val - min) / (max - min)) * 100;

  const getValueFromX = (x: number) => {
    if (!trackRef.current) return min;
    const rect = trackRef.current.getBoundingClientRect();
    const rel = Math.min(Math.max(0, x - rect.left), rect.width);
    const ratio = rel / rect.width;
    const raw = ratio * (max - min) + min;
    return Math.round(raw / step) * step;
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (dragging.current === null) return;
      const newVal = getValueFromX(e.clientX);
      if (isRange) {
        const updated: [number, number] =
          dragging.current === 0 ? [newVal, val2] : [val1, newVal];
        onChange(updated);
      } else {
        onChange(newVal);
      }
    };

    const stopDrag = () => (dragging.current = null);

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopDrag);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopDrag);
    };
  }, [val1, val2, isRange, min, max, step, onChange]);

  return (
    <div className={`relative h-10 w-full select-none ${className}`}>
      {/* Base Track */}
      <div
        ref={trackRef}
        className="absolute top-1/2 left-0 right-0 h-2 bg-gray-200 rounded-full -translate-y-1/2"
      />

      {/* Active Range */}
      <div
        className="absolute top-1/2 h-2 bg-blue-500 rounded-full -translate-y-1/2"
        style={{
          left: `${Math.min(percent(val1), percent(val2))}%`,
          width: `${Math.abs(percent(val2) - percent(val1))}%`,
        }}
      />

      {/* Thumbs */}
      {[val1, ...(isRange ? [val2] : [])].map((v, i) => (
        <div
          key={i}
          className="absolute top-1/2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-pointer transition-shadow duration-150 -translate-x-1/2 -translate-y-1/2 hover:shadow z-20"
          style={{ left: `${percent(v)}%` }}
          onPointerDown={(e) => {
            dragging.current = i as 0 | 1;
            e.preventDefault();
            e.currentTarget.setPointerCapture(e.pointerId);
          }}
        />
      ))}
    </div>
  );
};

export default Slider;
