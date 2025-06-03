import { useState } from "react";

type CollapsibleProps = {
  items: string[];
  trigger?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
  selectedItem?: string; // ✅ Add selected item prop
  onSelectItem?: (item: string) => void; // ✅ Allow parent to control selection
  className?: string;
  headerStyle?: string;
  triggerStyle?: string;
  collapsedContentStyle?: string;
};

const Collapsible: React.FC<CollapsibleProps> = ({
  items,
  trigger,
  open,
  defaultOpen = false,
  onToggle,
  selectedItem,
  onSelectItem,
  className = "",
  headerStyle = "",
  triggerStyle = "",
  collapsedContentStyle = "",
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const isControlled = open !== undefined;
  const currentOpen = isControlled ? open : isOpen;

  const toggleOpen = () => {
    if (!isControlled) setIsOpen(!isOpen);
    onToggle?.(!currentOpen);
  };

  return (
    <div className={` ${className}`}>
      {/* Header with Customizable Trigger */}
      <div className={`${headerStyle}`}>
        <div>Foods</div>
        <div onClick={toggleOpen} className={`cursor-pointer ${triggerStyle}`}>
          {trigger || <span>⌄</span>}
        </div>
      </div>

      {/* Always Visible First Item (Now Clickable!) */}
      <div
        className={`${collapsedContentStyle} ${
          selectedItem === items[0] ? "opacity-50" : ""
        }`}
        onClick={() => onSelectItem?.(items[0])}
      >
        {items[0]}
      </div>

      {/* Collapsible Content */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          currentOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        } flex flex-col gap-2`}
      >
        {items.slice(1).map((item) => (
          <div
            key={item}
            className={`${collapsedContentStyle} ${
              selectedItem === item ? "opacity-50" : ""
            }`}
            onClick={() => onSelectItem?.(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collapsible;
