// collapsible.tsx
import React, { useState, createContext, useContext } from "react";

type CollapsibleContextType = {
  isOpen: boolean;
  toggleOpen: () => void;
  selectedItem?: string;
  onSelectItem?: (item: string) => void;
};

const CollapsibleContext = createContext<CollapsibleContextType | null>(null);

type CollapsibleProps = {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
  selectedItem?: string;
  onSelectItem?: (item: string) => void;
  className?: string;
};

export const Collapsible: React.FC<CollapsibleProps> = ({
  children,
  open,
  defaultOpen = false,
  onToggle,
  selectedItem,
  onSelectItem,
  className,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const toggleOpen = () => {
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onToggle?.(next);
  };

  return (
    <CollapsibleContext.Provider
      value={{ isOpen, toggleOpen, selectedItem, onSelectItem }}
    >
      <div className={`flex flex-col space-y-2 ${className}`}>{children}</div>
    </CollapsibleContext.Provider>
  );
};

export const CollapsibleHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return <div className={`flex justify-between ${className}`}>{children}</div>;
};

export const CollapsibleTrigger: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  const context = useContext(CollapsibleContext);
  if (!context) return null;

  return (
    <div className={`cursor-pointer ${className}`} onClick={context.toggleOpen}>
      {children || <span>⌄</span>}
    </div>
  );
};

export const CollapsibleItem: React.FC<{
  item: string;
  className?: string;
}> = ({ item, className = "" }) => {
  const context = useContext(CollapsibleContext);
  if (!context) return null;

  const isSelected = context.selectedItem === item;

  return (
    <div
      onClick={() => context.onSelectItem?.(item)}
      className={`${className} ${isSelected ? "opacity-50" : ""}`}
    >
      {item}
    </div>
  );
};

export const CollapsibleContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  const context = useContext(CollapsibleContext);
  if (!context) return null;

  return (
    <div
      className={`transition-all duration-300 overflow-hidden flex flex-col gap-2 ${
        context.isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
};
