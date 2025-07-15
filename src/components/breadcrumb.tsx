import React, { useState } from "react";

type BreadcrumbItem = {
  label: string;
  href?: string;
  onClick?: () => void;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
  itemStyle?: string;
  currentItemStyle?: string;
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = ">",
  className = "",
}) => {
  const [activeIndex, setActiveIndex] = useState(0); // Track current item internally

  return (
    <nav className={`flex items-center ${className}`}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span className="flex items-center justify-center w-full h-full">
              {separator}
            </span>
          )}
          <button
            onClick={() => {
              setActiveIndex(index);
              item.onClick?.();
            }}
            className={
              index === activeIndex
                ? "cursor-pointer opacity-60 underline-offset-2 hover:opacity-60 underline"
                : "cursor-pointer hover:opacity-60 "
            }
          >
            {item.label}
          </button>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
