// DropdownContext.ts
import { createContext, useContext } from "react";

type DropdownContextType = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  placement: "bottom" | "top" | "right" | "left";
};

export const DropdownContext = createContext<DropdownContextType | null>(null);

export const useDropdownContext = () => {
  const ctx = useContext(DropdownContext);
  if (!ctx)
    throw new Error("Dropdown components must be used within <Dropdown>");
  return ctx;
};

// Dropdown.tsx
import React, { useState, useRef, useEffect } from "react";

type Option = { key: string; label: string; action?: () => void };

type DropdownProps = {
  children: React.ReactNode;
  placement?: "bottom" | "top" | "right" | "left";
};

const Dropdown: React.FC<DropdownProps> = ({
  children,
  placement = "bottom",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close, placement }}>
      <div className="relative inline-block" ref={dropdownRef}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export default Dropdown;

// DropdownTrigger.tsx

type DropdownTriggerProps = {
  children: React.ReactNode;
  className?: string;
};

export const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
  children,
  className = "",
}) => {
  const { toggle } = useDropdownContext();

  return (
    <button onClick={toggle} className={className}>
      {children}
    </button>
  );
};

// DropdownMenu.tsx

type DropdownMenuProps = {
  options: Option[];
  className?: string;
};

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  options,
  className = "",
}) => {
  const { isOpen, close, placement } = useDropdownContext();

  const placementStyles = {
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    right: "top-1/2 left-full transform -translate-y-1/2 ml-2",
    left: "top-1/2 right-full transform -translate-y-1/2 mr-2",
  };

  if (!isOpen) return null;

  return (
    <div
      className={`absolute ${placementStyles[placement]} ${className}`}
      role="menu"
    >
      {options.map((option) => (
        <button
          key={option.key}
          onClick={() => {
            option.action?.();
            close();
          }}
          className={`block hover:opacity-60 hover:cursor-pointer`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
