import React from "react";

type BadgeProps = {
  children?: React.ReactNode;
  content?: string | number | React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
  // bgColor?: string;
  // borderColor?: string;
  // textColor?: string;
  placement?: "top-right" | "bottom-right" | "top-left" | "bottom-left"; // Allows custom positioning
  offsetX?: number; // NEW: Controls horizontal distance
  offsetY?: number; // NEW: Controls vertical distance
  onClick?: () => void | null; // Allows clicking the cart
};

const placementStyles = {
  "top-right": "absolute top-0 right-0",
  "bottom-right": "absolute bottom-0 right-0",
  "top-left": "absolute top-0 left-0",
  "bottom-left": "absolute bottom-0 left-0",
};

const sizeStyles = {
  sm: "size-2",
  md: "size-3",
  lg: "size-4",
};

const Badge: React.FC<BadgeProps> = ({
  children,
  content,
  size = "md",
  className,
  // bgColor = "bg-gray-200",
  // borderColor = "border-gray-500",
  // textColor = "text-black",
  placement = "top-right",
  offsetX, // Default offset
  offsetY, // Default offset
  onClick, // Allows clicking the cart
}) => {
  return (
    <div
      className="relative inline-flex items-center hover:cursor-pointer"
      onClick={onClick}
    >
      {children} {/* Wraps Avatar or other components */}
      <span
        // className={` ${placementStyles[placement]} ${offsetX} ${offsetY} px-1 py-1 rounded-full font-bold ${bgColor} ${borderColor} ${textColor} ${sizeStyles[size]} ${className} flex items-center justify-center`}
        className={` ${placementStyles[placement]} translate-x-[${offsetX}px] -translate-y-[${offsetY}px] px-1 py-1 rounded-full font-bold ${sizeStyles[size]} ${className} flex items-center justify-center`}
      >
        {content ? (
          content
        ) : (
          <span className="inline-block size-full rounded-full" />
        )}
      </span>
    </div>
  );
};

export default Badge;
