// import React, { useState, useRef } from "react";

// type MenuItem = {
//   label: string;
//   action?: () => void; // ✅ Optional action when clicked
// };

// type ContextMenuProps = {
//   children: React.ReactNode;
//   menuItems: MenuItem[]; // ✅ Dynamically set menu items
//   menuStyle?: string; // ✅ Custom styles for the menu container
//   menuItemStyle?: string; // ✅ Custom styles for individual menu items
// };

// const ContextMenu: React.FC<ContextMenuProps> = ({
//   children,
//   menuItems,
//   menuStyle,
//   menuItemStyle,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const menuRef = useRef<HTMLDivElement>(null);

//   const handleContextMenu = (event: React.MouseEvent) => {
//     event.preventDefault(); // ✅ Prevent default browser menu
//     const parentRect = event.currentTarget.getBoundingClientRect();

//     setPosition({
//       x: event.clientX - parentRect.left, // ✅ Convert to parent-relative X
//       y: event.clientY - parentRect.top, // ✅ Convert to parent-relative Y
//     });

//     setIsOpen(true);
//   };

//   const handleClickOutside = (event: MouseEvent) => {
//     if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//       setIsOpen(false);
//     }
//   };

//   React.useEffect(() => {
//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   return (
//     <div
//       className="relative w-64 h-32 flex items-center justify-center border"
//       onContextMenu={handleContextMenu}
//       style={{ position: "relative" }}
//     >
//       {children}

//       {isOpen && (
//         <div
//           ref={menuRef}
//           className={`absolute z-50 ${menuStyle}`} // ✅ Customizable menu styling
//           style={{
//             top: `${position.y}px`,
//             left: `${position.x}px`,
//             display: "block",
//           }}
//         >
//           {menuItems.map((item, index) => (
//             <button
//               key={index}
//               onClick={() => {
//                 item.action?.(); // ✅ Trigger action if defined
//                 setIsOpen(false); // ✅ Close menu after selecting an item
//               }}
//               className={`block  ${menuItemStyle}`} // ✅ Customizable item styling
//             >
//               {item.label}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ContextMenu;

// ContextMenu.tsx
import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
} from "react";

type MenuItem = {
  label: string;
  action?: () => void;
};

type ContextMenuContextType = {
  isOpen: boolean;
  position: { x: number; y: number };
  closeMenu: () => void;
  menuItems: MenuItem[];
};

const ContextMenuContext = createContext<ContextMenuContextType | null>(null);

export const useContextMenu = () => {
  const ctx = useContext(ContextMenuContext);
  if (!ctx) throw new Error("Must be used within <ContextMenu>");
  return ctx;
};

type ContextMenuProps = {
  children: React.ReactNode;
  menuItems: MenuItem[];
  className?: string;
};

export const ContextMenu: React.FC<ContextMenuProps> = ({
  children,
  menuItems,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    const parentRect = event.currentTarget.getBoundingClientRect();
    setPosition({
      x: event.clientX - parentRect.left,
      y: event.clientY - parentRect.top,
    });
    setIsOpen(true);
  };

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
  }, []);

  return (
    <ContextMenuContext.Provider
      value={{ isOpen, position, closeMenu, menuItems }}
    >
      <div
        className={`relative flex items-center justify-center  ${className}`}
        onContextMenu={handleContextMenu}
      >
        {children}
        <div ref={menuRef}>{/* Menu will render here */}</div>
      </div>
    </ContextMenuContext.Provider>
  );
};

export const ContextMenuPanel: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const { isOpen, position } = useContextMenu();

  if (!isOpen) return null;

  return (
    <div
      className={`absolute z-50 ${className}`}
      style={{ top: position.y, left: position.x }}
    >
      <ContextMenuItemList />
    </div>
  );
};

export const ContextMenuItemList: React.FC = () => {
  const { menuItems, closeMenu } = useContextMenu();

  return (
    <>
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            item.action?.();
            closeMenu();
          }}
          className="block w-full px-4 py-2 hover:opacity-60 cursor-pointer text-left"
        >
          {item.label}
        </button>
      ))}
    </>
  );
};
