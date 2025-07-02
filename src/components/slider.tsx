// import React, { useRef, useEffect } from "react";

// type BaseSliderProps = {
//   min?: number;
//   max?: number;
//   step?: number;
//   className?: string;
// };

// type SliderSingleProps = BaseSliderProps & {
//   mode?: "single";
//   value: number;
//   onChange: (value: number) => void;
// };

// type SliderRangeProps = BaseSliderProps & {
//   mode: "range";
//   value: [number, number];
//   onChange: (value: [number, number]) => void;
// };

// type SliderProps = SliderSingleProps | SliderRangeProps;

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
//   const dragging = useRef<0 | 1 | null>(null);

//   const [val1, val2] = isRange
//     ? (value as [number, number])
//     : [value as number, min];

//   const percent = (val: number) => ((val - min) / (max - min)) * 100;

//   const getValueFromX = (x: number) => {
//     if (!trackRef.current) return min;
//     const rect = trackRef.current.getBoundingClientRect();
//     const rel = Math.min(Math.max(0, x - rect.left), rect.width);
//     const ratio = rel / rect.width;
//     const raw = ratio * (max - min) + min;
//     return Math.round(raw / step) * step;
//   };

//   useEffect(() => {
//     const handlePointerMove = (e: PointerEvent) => {
//       if (dragging.current === null) return;
//       const newVal = getValueFromX(e.clientX);
//       if (isRange) {
//         const updated: [number, number] =
//           dragging.current === 0 ? [newVal, val2] : [val1, newVal];
//         onChange(updated as number & [number, number]);
//       } else {
//         onChange(newVal as number & [number, number]);
//       }
//     };

//     const stopDrag = () => (dragging.current = null);

//     window.addEventListener("pointermove", handlePointerMove);
//     window.addEventListener("pointerup", stopDrag);
//     return () => {
//       window.removeEventListener("pointermove", handlePointerMove);
//       window.removeEventListener("pointerup", stopDrag);
//     };
//   }, [val1, val2, isRange, min, max, step, onChange]);

//   return (
//     <div className={`relative h-10 w-full select-none ${className}`}>
//       {/* Base Track */}
//       <div
//         ref={trackRef}
//         className="absolute top-1/2 left-0 right-0 h-2 bg-gray-200 rounded-full -translate-y-1/2"
//       />

//       {/* Active Range */}
//       <div
//         className="absolute top-1/2 h-2 bg-blue-500 rounded-full -translate-y-1/2"
//         style={{
//           left: `${Math.min(percent(val1), percent(val2))}%`,
//           width: `${Math.abs(percent(val2) - percent(val1))}%`,
//         }}
//       />

//       {/* Thumbs */}
//       {[val1, ...(isRange ? [val2] : [])].map((v, i) => (
//         <div
//           key={i}
//           className="absolute top-1/2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-pointer transition-shadow duration-150 -translate-x-1/2 -translate-y-1/2 hover:shadow z-20"
//           style={{ left: `${percent(v)}%` }}
//           onPointerDown={(e) => {
//             dragging.current = i as 0 | 1;
//             e.preventDefault();
//             e.currentTarget.setPointerCapture(e.pointerId);
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// export default Slider;

import React, { useRef, useEffect } from "react";

type BaseSliderProps = {
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  rangeClassName?: string;
  thumbClassName?: string;
};

type SliderSingleProps = BaseSliderProps & {
  mode?: "single";
  value: number;
  onChange: (value: number) => void;
};

type SliderRangeProps = BaseSliderProps & {
  mode: "range";
  value: [number, number];
  onChange: (value: [number, number]) => void;
};

type SliderProps = SliderSingleProps | SliderRangeProps;

const Slider: React.FC<SliderProps> = ({
  mode = "single",
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  className,
  rangeClassName,
  thumbClassName,
}) => {
  const isRange = mode === "range";
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<0 | 1 | null>(null);

  let val1: number;
  let val2: number;

  if (mode === "range") {
    const rangeValue = value as [number, number];
    val1 = rangeValue[0];
    val2 = rangeValue[1];
  } else {
    val1 = value as number;
    val2 = min; // fallback for single mode
  }

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
        (onChange as (v: [number, number]) => void)(updated);
      } else {
        (onChange as (v: number) => void)(newVal);
      }
    };

    const stopDrag = () => {
      dragging.current = null;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopDrag);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopDrag);
    };
  }, [val1, val2, min, max, step, isRange, onChange]);

  return (
    <div className={`relative h-10 w-full select-none `}>
      {/* Base Track */}
      <div
        ref={trackRef}
        className={`absolute top-1/2 left-0 right-0 -translate-y-1/2 ${className}`}
      />

      {/* Active Range */}
      <div
        className={`absolute top-1/2  -translate-y-1/2 ${rangeClassName}`}
        style={{
          left: `${Math.min(percent(val1), percent(val2))}%`,
          width: `${Math.abs(percent(val2) - percent(val1))}%`,
        }}
      />

      {/* Thumbs */}
      {[val1, ...(isRange ? [val2] : [])].map((v, i) => (
        <div
          key={i}
          className={`absolute top-1/2  cursor-pointer transition-shadow duration-150 -translate-x-1/2 -translate-y-1/2 hover:shadow z-20 ${thumbClassName}`}
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
