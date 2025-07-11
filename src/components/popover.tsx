import React, { useRef, useEffect } from "react";

type PopoverProps = {
  placement?: "top" | "right" | "bottom" | "left";
  content: string;
  isOpen: boolean; // ✅ Controlled state
  onToggle: (state: boolean) => void; // ✅ Parent state handler
  trigger: React.ReactNode; // ✅ Allows any element as the trigger
  popoverStyle?: string;
};

const Popover: React.FC<PopoverProps> = ({
  placement = "top",
  content,
  isOpen,
  onToggle,
  trigger, // ✅ Custom trigger element
  popoverStyle = "bg-white text-black p-2 rounded shadow-md z-50",
}) => {
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return; // ✅ Prevent unnecessary event listeners

    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onToggle(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen, onToggle]);

  return (
    <div className="relative inline-block">
      {/* Custom Trigger */}
      <div
        ref={triggerRef}
        onClick={() => onToggle(!isOpen)}
        className="cursor-pointer inline-block"
      >
        {trigger}
      </div>

      {/* Popover (Only shows when isOpen is true) */}
      {isOpen && (
        <div
          ref={popoverRef}
          className={`absolute z-40 ${popoverStyle} transform transition duration-200 ${
            placement === "top"
              ? "bottom-full mb-2 left-1/2 -translate-x-1/2"
              : placement === "right"
              ? "left-full ml-2 top-1/2 -translate-y-1/2"
              : placement === "bottom"
              ? "top-full mt-2 left-1/2 -translate-x-1/2"
              : placement === "left"
              ? "right-full mr-2 top-1/2 -translate-y-1/2"
              : ""
          } opacity-100 scale-100`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Popover;
