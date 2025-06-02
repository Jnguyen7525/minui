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
