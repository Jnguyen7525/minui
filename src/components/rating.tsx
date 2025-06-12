import React, { useState } from "react";

type RatingProps = {
  value: number;
  maxRating?: number;
  icon: React.ReactNode;
  activeColor?: string;
  inactiveColor?: string;
  readOnly?: boolean;
  onChange?: (rating: number) => void;
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
            hoverRating > index || value > index ? activeColor : inactiveColor
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
