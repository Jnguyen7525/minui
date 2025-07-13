import React, { useState } from "react";

type RatingColor =
  | "yellow"
  | "gray"
  | "blue"
  | "green"
  | "red"
  | "purple"
  | "orange"
  | "black"
  | "white"
  | "pink";

type RatingProps = {
  value: number;
  maxRating?: number;
  icon: React.ReactNode;
  activeColor?: RatingColor;
  inactiveColor?: RatingColor;
  readOnly?: boolean;
  onChange?: (rating: number) => void;
};

const activeColorMap = {
  yellow: "text-yellow-500",
  gray: "text-gray-500",
  blue: "text-blue-500",
  green: "text-green-500",
  red: "text-red-500",
  purple: "text-purple-500",
  orange: "text-orange-500",
  black: "text-black",
  white: "text-white",
  pink: "text-pink-500",
};

const inactiveColorMap = {
  yellow: "text-yellow-200",
  gray: "text-gray-400",
  blue: "text-blue-300",
  green: "text-green-300",
  red: "text-red-300",
  purple: "text-purple-300",
  orange: "text-orange-300",
  black: "text-gray-600", // softer than full black
  white: "text-gray-300", // so it’s visible on white backgrounds
  pink: "text-pink-300",
};

const Rating: React.FC<RatingProps> = ({
  value,
  maxRating = 5,
  icon,
  activeColor = "text-yellow-500",
  inactiveColor = "text-gray-400",
  readOnly = false,
  onChange,
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex gap-1">
      {Array.from({ length: maxRating }, (_, index) => (
        <span
          key={index}
          className={`cursor-pointer text-2xl ${
            hoverRating > index || value > index
              ? activeColorMap[activeColor as RatingColor]
              : inactiveColorMap[inactiveColor as RatingColor]
          } ${readOnly ? "cursor-default" : ""}`}
          onClick={() => !readOnly && onChange?.(index + 1)}
          onMouseEnter={() => !readOnly && setHoverRating(index + 1)}
          onMouseLeave={() => !readOnly && setHoverRating(0)}
        >
          {icon}
        </span>
      ))}
    </div>
  );
};

export default Rating;
