// import React from "react";

// type CardProps = {
//   className?: string;
//   children: React.ReactNode;
// };

// const Card: React.FC<CardProps> = ({ className = "", children }) => {
//   return (
//     <div className={`bg-white rounded-lg shadow-md border p-4 ${className}`}>
//       {children}
//     </div>
//   );
// };

// const CardHeader: React.FC<CardProps> = ({ className = "", children }) => {
//   return (
//     <div className={`border-b pb-2 mb-2 text-lg font-bold ${className}`}>
//       {children}
//     </div>
//   );
// };

// const CardContent: React.FC<CardProps> = ({ className = "", children }) => {
//   return <div className={`text-gray-600 ${className}`}>{children}</div>;
// };

// const CardFooter: React.FC<CardProps> = ({ className = "", children }) => {
//   return <div className={`border-t pt-2 mt-2 ${className}`}>{children}</div>;
// };

// const CardAction: React.FC<CardProps> = ({ className = "", children }) => {
//   return (
//     <div className={`flex justify-end gap-2 ${className}`}>{children}</div>
//   );
// };

// export { Card, CardHeader, CardContent, CardFooter, CardAction };

import React, { useState } from "react";

type ShadowSize = "none" | "sm" | "md" | "lg";
type RadiusSize = "none" | "sm" | "md" | "lg";

type CardProps = {
  children: React.ReactNode | React.ReactNode[];
  shadow?: ShadowSize;
  radius?: RadiusSize;
  fullWidth?: boolean;
  isHoverable?: boolean;
  isPressable?: boolean;
  isBlurred?: boolean;
  isFooterBlurred?: boolean;
  isDisabled?: boolean;
  disableAnimation?: boolean;
  disableRipple?: boolean;
  allowTextSelectionOnPress?: boolean;
  classNames?: Partial<Record<"base" | "header" | "body" | "footer", string>>;
  onPress?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onPressStart?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onPressEnd?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onPressChange?: (isPressed: boolean) => void;
  onPressUp?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const shadowMap: Record<ShadowSize, string> = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
};

const radiusMap: Record<RadiusSize, string> = {
  none: "",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
};

const Card: React.FC<CardProps> = ({
  children,
  shadow = "md",
  radius = "lg",
  fullWidth = false,
  isHoverable = false,
  isPressable = false,
  isBlurred = false,
  isFooterBlurred = false,
  isDisabled = false,
  disableAnimation = false,
  disableRipple = false,
  allowTextSelectionOnPress = false,
  classNames = {},
  onPress,
  onPressStart,
  onPressEnd,
  onPressChange,
  onPressUp,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressStart = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onPressStart) onPressStart(e);
    setIsPressed(true);
    if (onPressChange) onPressChange(true);
  };

  const handlePressEnd = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onPressEnd) onPressEnd(e);
    setIsPressed(false);
    if (onPressChange) onPressChange(false);
  };

  const handlePress = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDisabled && onPress) onPress(e);
  };

  return (
    <div
      className={`bg-white border p-4 ${shadowMap[shadow]} ${
        radiusMap[radius]
      } ${isHoverable ? "hover:shadow-lg" : ""} ${
        isPressable ? "active:scale-95" : ""
      } ${isBlurred ? "backdrop-blur-md" : ""} ${
        isDisabled ? "opacity-50 cursor-not-allowed" : ""
      } ${fullWidth ? "w-full" : "w-auto"} ${
        disableAnimation ? "" : "duration-300"
      } ${disableRipple ? "" : "relative overflow-hidden"} ${
        classNames.base || ""
      } ${isPressed ? "scale-95" : ""}`}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onClick={handlePress}
      onMouseLeave={() => {
        setIsPressed(false);
        if (onPressChange) onPressChange(false);
      }}
    >
      {children}
    </div>
  );
};

const CardHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ className = "", children }) => (
  <div className={`border-b pb-2 mb-2 text-lg font-bold ${className}`}>
    {children}
  </div>
);

const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ className = "", children }) => (
  <div className={`text-gray-600 ${className}`}>{children}</div>
);

const CardFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ className = "", children }) => (
  <div className={`border-t pt-2 mt-2 ${className}`}>{children}</div>
);

const CardAction: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ className = "", children }) => (
  <div className={`flex justify-end gap-2 ${className}`}>{children}</div>
);

export { Card, CardHeader, CardContent, CardFooter, CardAction };
