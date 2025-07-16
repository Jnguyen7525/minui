import React, { useState, useRef } from "react";

type TooltipProps = {
  content: string | React.ReactNode; // ✅ Custom tooltip content
  placement?: "top" | "right" | "bottom" | "left"; // ✅ Tooltip position
  offset?: number; // ✅ Distance from trigger
  triggerContent: React.ReactNode; // ✅ What the button displays
  className?: string;
};

const Tooltip: React.FC<TooltipProps> = ({
  content,
  placement = "top",
  offset = 10,
  triggerContent,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  // ✅ Map placement to Tailwind positioning classes
  // ✅ Define Tailwind position classes
  const placementClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2",
    bottom: "top-full left-1/2 transform -translate-x-1/2",
    left: "right-full top-1/2 transform -translate-y-1/2",
    right: "left-full top-1/2 transform -translate-y-1/2",
  };

  // ✅ Apply dynamic offset via inline styles
  const offsetStyles = {
    top: { marginBottom: `${offset}px` },
    bottom: { marginTop: `${offset}px` },
    left: { marginRight: `${offset}px` },
    right: { marginLeft: `${offset}px` },
  };

  return (
    <div className={`relative flex `}>
      {/* Tooltip Trigger */}
      <button
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {triggerContent}
      </button>

      {/* Tooltip */}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`absolute z-50 ${placementClasses[placement]} ${className}`}
          style={offsetStyles[placement]} // ✅ Apply offset dynamically
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
