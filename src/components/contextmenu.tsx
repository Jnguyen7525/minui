import React, { useState, useRef } from "react";

type MenuItem = {
  label: string;
  action?: () => void; // ✅ Optional action when clicked
};

type ContextMenuProps = {
  children: React.ReactNode;
  menuItems: MenuItem[]; // ✅ Dynamically set menu items
  menuStyle?: string; // ✅ Custom styles for the menu container
  menuItemStyle?: string; // ✅ Custom styles for individual menu items
};

const ContextMenu: React.FC<ContextMenuProps> = ({
  children,
  menuItems,
  menuStyle,
  menuItemStyle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault(); // ✅ Prevent default browser menu
    const parentRect = event.currentTarget.getBoundingClientRect();

    setPosition({
      x: event.clientX - parentRect.left, // ✅ Convert to parent-relative X
      y: event.clientY - parentRect.top, // ✅ Convert to parent-relative Y
    });

    setIsOpen(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      className="relative w-64 h-32 flex items-center justify-center border"
      onContextMenu={handleContextMenu}
      style={{ position: "relative" }}
    >
      {children}

      {isOpen && (
        <div
          ref={menuRef}
          className={`absolute z-50 ${menuStyle}`} // ✅ Customizable menu styling
          style={{
            top: `${position.y}px`,
            left: `${position.x}px`,
            display: "block",
          }}
        >
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.action?.(); // ✅ Trigger action if defined
                setIsOpen(false); // ✅ Close menu after selecting an item
              }}
              className={`block  ${menuItemStyle}`} // ✅ Customizable item styling
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContextMenu;
