import React, { useState } from "react";

type CollapsibleProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
  className?: string;
  children: (props: {
    currentOpen: boolean;
    toggleOpen: () => void;
  }) => React.ReactNode; // ✅ This fixes the issue
};

const Collapsible: React.FC<CollapsibleProps> = ({
  open,
  defaultOpen,
  onToggle,
  className = "",
  children,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen || false);

  const isControlled = open !== undefined;
  const currentOpen = isControlled ? open : isOpen;

  const toggleOpen = () => {
    if (!isControlled) setIsOpen(!isOpen);
    onToggle?.(!currentOpen);
  };

  return (
    <div className={`border p-3 rounded-md shadow-md ${className}`}>
      {children({ currentOpen, toggleOpen })}{" "}
      {/* ✅ children is now correctly typed as a function */}
    </div>
  );
};

const CollapsibleTrigger: React.FC<{
  toggle: () => void;
  className?: string;
  children: React.ReactNode;
}> = ({ toggle, className = "", children }) => (
  <button
    onClick={toggle}
    className={`w-full p-2 text-left font-bold ${className}`}
  >
    {children}
  </button>
);

const CollapsibleContent: React.FC<{
  open: boolean;
  className?: string;
  children: React.ReactNode;
}> = ({ open, className = "", children }) => (
  <div
    className={`transition-all duration-300 overflow-hidden ${
      open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
    } ${className}`}
  >
    {children}
  </div>
);

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
