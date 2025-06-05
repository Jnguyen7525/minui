import React, { useState, useRef } from "react";

const ContextMenu = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  //   const handleContextMenu = (event: React.MouseEvent) => {
  //     event.preventDefault(); // ✅ Prevent default browser menu
  //     console.log("Right-click detected!"); // ✅ Debugging: Confirm event fires
  //     setPosition({ x: event.clientX, y: event.clientY });
  //     setIsOpen(true);
  //   };

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault(); // ✅ Prevent default browser menu

    const parentRect = event.currentTarget.getBoundingClientRect(); // ✅ Get parent position
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
      className="relative w-64 h-32 flex items-center justify-center border bg-gray-200"
      onContextMenu={handleContextMenu} // ✅ Ensure this is inside the right-clickable area
      style={{ position: "relative" }} // ✅ Ensure parent is positioned
    >
      {children}

      {/* ✅ Ensure the menu renders */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute z-50 bg-white border shadow-lg rounded-md p-2"
          style={{
            top: `${position.y}px`, // ✅ Dynamically set position
            left: `${position.x}px`, // ✅ Dynamically set position
            display: "block", // ✅ Ensures visibility
          }}
        >
          {/* ✅ Debugging Log (Correct Placement) */}
          {/* {console.log("Rendering Context Menu at:", position)} */}

          <p className="text-xs text-gray-500">Right-click menu</p>
          <button className="block p-2 hover:bg-gray-200">Back</button>
          <button className="block p-2 hover:bg-gray-200">Forward</button>
          <button className="block p-2 hover:bg-gray-200">Reload</button>
          <hr className="my-2 border-t" />
          <button className="block p-2 hover:bg-gray-200 text-red-500">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ContextMenu;
