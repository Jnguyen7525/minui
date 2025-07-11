import React from "react";

type PlaceholderProps = {
  children?: React.ReactNode;
  className?: string;
};

const Placeholder: React.FC<PlaceholderProps> = ({ children, className }) => {
  return <div className={` flex animate-pulse ${className}`}>{children}</div>;
};

export default Placeholder;
