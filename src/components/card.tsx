import React from "react";

type ShadowSize = "none" | "sm" | "md" | "lg";
type RadiusSize = "none" | "sm" | "md" | "lg";

type CardProps = {
  children: React.ReactNode | React.ReactNode[];
  shadow?: ShadowSize;
  radius?: RadiusSize;

  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
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

  className = "",
  onClick,
}) => {
  return (
    <div
      className={` ${shadowMap[shadow]} ${radiusMap[radius]} 
    ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const CardHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ className = "", children }) => (
  <div className={` ${className}`}>{children}</div>
);

const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ className = "", children }) => (
  <div className={`${className}`}>{children}</div>
);

const CardFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ className = "", children }) => (
  <div className={` ${className}`}>{children}</div>
);

const CardAction: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ className = "", children }) => (
  <div className={` ${className}`}>{children}</div>
);

export { Card, CardHeader, CardContent, CardFooter, CardAction };
