import React, { useRef, useEffect } from "react";

type BaseSliderProps = {
  min?: number;
  max?: number;
  step?: number;
  height?: number;
  trackColor?: sliderColor;
  rangeColor?: sliderColor;
  thumbColor?: sliderColor;
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

type sliderColor =
  | "gray"
  | "blue"
  | "green"
  | "yellow"
  | "red"
  | "purple"
  | "orange"
  | "black"
  | "white"
  | "pink";

const trackColorMap = {
  gray: "bg-gray-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  red: "bg-red-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
  black: "bg-black",
  white: "bg-white border border-gray-300", // helps visibility on white bg
  pink: "bg-pink-500",
};

const rangeColorMap = {
  gray: "bg-gray-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  red: "bg-red-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
  black: "bg-black",
  white: "bg-white border border-gray-300", // helps visibility on white bg
  pink: "bg-pink-500",
};

const thumbColorMap = {
  gray: "bg-gray-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  red: "bg-red-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
  black: "bg-black",
  white: "bg-white border border-gray-300", // helps visibility on white bg
  pink: "bg-pink-500",
};

const Slider: React.FC<SliderProps> = ({
  mode = "single",
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  height,
  rangeColor,
  trackColor,
  thumbColor,
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
        className={`absolute top-1/2 left-0 right-0 -translate-y-1/2 ${
          trackColorMap[trackColor as sliderColor]
        } rounded-full`}
        style={{
          height: `${height}px`,
        }}
      />

      {/* Active Range */}
      <div
        className={`absolute top-1/2  -translate-y-1/2 ${
          rangeColorMap[rangeColor as sliderColor]
        } rounded-full`}
        style={{
          left: `${Math.min(percent(val1), percent(val2))}%`,
          width: `${Math.abs(percent(val2) - percent(val1))}%`,
          height: `${height}px`,
        }}
      />

      {/* Thumbs */}
      {[val1, ...(isRange ? [val2] : [])].map((v, i) => (
        <div
          key={i}
          className={`absolute top-1/2  cursor-pointer transition-shadow duration-150 -translate-x-1/2 -translate-y-1/2 hover:shadow z-20 w-4 h-4 hover:opacity-90 ${
            thumbColorMap[thumbColor as sliderColor]
          } border rounded-full`}
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
