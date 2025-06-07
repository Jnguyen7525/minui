import React from "react";

type PlaceholderProps = {
  width?: string;
  height?: string;
  color?: string;
  rounded?: string;
  children?: React.ReactNode;
};

const Placeholder: React.FC<PlaceholderProps> = ({
  width = "w-full",
  height = "h-6",
  color = "bg-neutral-300 dark:bg-neutral-600",
  rounded = "rounded",
  children,
}) => {
  return (
    <div
      className={` flex animate-pulse ${width} ${height} ${color} ${rounded}`}
    >
      {children}
    </div>
  );
};

export default Placeholder;
