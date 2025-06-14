import React, { useState, useRef, useEffect } from "react";

type DropdownProps = {
  triggerLabel: React.ReactNode | string;
  triggerStyle?: string;
  menuStyle?: string;
  menuItemStyle?: string;
  placement?: "bottom" | "top" | "right" | "left"; // ✅ New placement prop
  options: { key: string; label: string; action?: () => void }[];
};

const Dropdown: React.FC<DropdownProps> = ({
  triggerLabel,
  options,
  menuStyle,
  triggerStyle,
  menuItemStyle,
  placement = "bottom",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // ✅ Dynamic placement classes
  const placementStyles = {
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    right: "top-1/2 left-full transform -translate-y-1/2 ml-2",
    left: "top-1/2 right-full transform -translate-y-1/2 mr-2",
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button onClick={toggleDropdown} className={`${triggerStyle}`}>
        {triggerLabel}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute ${placementStyles[placement]} ${menuStyle}`}
          role="menu"
        >
          {options.map((option) => (
            <button
              key={option.key}
              onClick={() => {
                option.action?.(); // Call action function if provided
                setIsOpen(false); // ✅ Close dropdown after clicking an option
              }}
              className={`block ${menuItemStyle}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
