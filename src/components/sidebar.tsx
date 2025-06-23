// import React, { createContext, useContext, useState } from "react";
// import {
//   Home,
//   Inbox,
//   Calendar,
//   Search,
//   Settings,
// //   Menu,
// //   ChevronDown,
// } from "lucide-react";

// /** ✅ Sidebar Context & Provider */
// const SidebarContext = createContext<
//   { isOpen: boolean; toggle: () => void } | undefined
// >(undefined);

// export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggle = () => setIsOpen((prev) => !prev);
//   return (
//     <SidebarContext.Provider value={{ isOpen, toggle }}>
//       {children}
//     </SidebarContext.Provider>
//   );
// };

// export const SidebarTrigger: React.FC = () => {
//   const context = useContext(SidebarContext);
//   if (!context)
//     throw new Error("SidebarTrigger must be used within SidebarProvider");
//   return (
//     <button
//       onClick={context.toggle}
//       className="p-2 bg-gray-800 text-white rounded-md"
//     >
//       Toggle Sidebar
//     </button>
//   );
// };

// /** ✅ Sidebar Component */
// export const Sidebar: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const context = useContext(SidebarContext);
//   if (!context) throw new Error("Sidebar must be used within SidebarProvider");
//   return (
//     <aside
//       className={`fixed left-0 top-0 h-full w-64 bg-gray-900 text-white transition-transform duration-300 ${
//         context.isOpen ? "translate-x-0" : "-translate-x-64"
//       }`}
//     >
//       {children}
//     </aside>
//   );
// };

// export const SidebarContent: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => <div className="p-4">{children}</div>;
// export const SidebarHeader: React.FC = () => (
//   <div className="p-4 text-lg font-bold">Sidebar Title</div>
// );
// export const SidebarFooter: React.FC = () => (
//   <div className="p-4 border-t border-gray-700">© 2025 Your App</div>
// );

// /** ✅ Sidebar Menu & Items */
// const menuItems = [
//   { title: "Home", url: "#", icon: Home },
//   { title: "Inbox", url: "#", icon: Inbox },
//   { title: "Calendar", url: "#", icon: Calendar },
//   { title: "Search", url: "#", icon: Search },
//   { title: "Settings", url: "#", icon: Settings },
// ];

// export const SidebarMenu: React.FC = () => (
//   <nav>
//     {menuItems.map(({ title, url, icon: Icon }) => (
//       <a
//         key={title}
//         href={url}
//         className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded-md"
//       >
//         <Icon size={20} /> {title}
//       </a>
//     ))}
//   </nav>
// );

// import { useState, useEffect, useRef } from "react";

// const [minWidth, maxWidth, defaultWidth] = [200, 500, 350];

// export default function Sidebar() {
//   // At this stage, if you refresh the page, the Sidebar returns to the default width passed to the useState hook. We need a way to store the lastly set width and to recover it when coming back to the app. We are going to use the local storage.

//   // The local storage allows us to store key/value pairs in the browser and to retrieve them when needed. We are going to store the Sidebar’s width whenever it changes. To do so, we can add another useEffect, this time with the width as a dependency, so that the callback will be executed everytime the width changes:
//   const [width, setWidth] = useState(
//     parseInt(localStorage.getItem("sidebarWidth")!) || defaultWidth
//   );

//   const isResized = useRef(false);

//   useEffect(() => {
//     localStorage.setItem("sidebarWidth", width as unknown as string);
//   }, [width]);

//   useEffect(() => {
//     window.addEventListener("mousemove", (e) => {
//       if (!isResized.current) {
//         return;
//       }

//       setWidth((previousWidth) => {
//         const newWidth = previousWidth + e.movementX / 2;

//         const isWidthInRange = newWidth >= minWidth && newWidth <= maxWidth;

//         return isWidthInRange ? newWidth : previousWidth;
//       });
//     });

//     window.addEventListener("mouseup", () => {
//       isResized.current = false;
//     });
//   }, []);

//   return (
//     <div className="flex">
//       <div style={{ width: `${width / 16}rem` }} className="bg-neutral-700">
//         Sidebar
//       </div>

//       {/* Handle */}
//       <div
//         className="w-2 cursor-col-resize"
//         onMouseDown={() => {
//           isResized.current = true;
//         }}
//       />
//     </div>
//   );
// }

// import { useState, useEffect, useRef } from "react";

// const [minWidth, maxWidth, defaultWidth] = [200, 500, 350];

// export default function Sidebar() {
//   // At this stage, if you refresh the page, the Sidebar returns to the default width passed to the useState hook. We need a way to store the lastly set width and to recover it when coming back to the app. We are going to use the local storage.

//   // The local storage allows us to store key/value pairs in the browser and to retrieve them when needed. We are going to store the Sidebar’s width whenever it changes. To do so, we can add another useEffect, this time with the width as a dependency, so that the callback will be executed everytime the width changes:

//   const [isOpen, setIsOpen] = useState(true);
//   const [width, setWidth] = useState(() => {
//     const stored = localStorage.getItem("sidebarWidth");
//     return stored ? parseInt(stored) : defaultWidth;
//   });

//   // Store width on change
//   useEffect(() => {
//     if (isOpen) localStorage.setItem("sidebarWidth", width.toString());
//   }, [width, isOpen]);

//   const toggleSidebar = () => {
//     setIsOpen((prev) => !prev);
//   };

//   const isResized = useRef(false);

//   useEffect(() => {
//     window.addEventListener("mousemove", (e) => {
//       if (!isResized.current) {
//         return;
//       }

//       setWidth((previousWidth) => {
//         const newWidth = previousWidth + e.movementX / 2;

//         const isWidthInRange = newWidth >= minWidth && newWidth <= maxWidth;

//         return isWidthInRange ? newWidth : previousWidth;
//       });
//     });

//     window.addEventListener("mouseup", () => {
//       isResized.current = false;
//     });
//   }, []);

//   return (
//     <div className="flex relative">
//       {isOpen && (
//         <div
//           style={{ width: `${width / 16}rem` }}
//           className="bg-neutral-700 transition-all duration-300 overflow-hidden"
//         >
//           Sidebar
//         </div>
//       )}

//       {/* Resize Handle (only when sidebar is open) */}
//       {isOpen && (
//         <div
//           className="w-2 cursor-col-resize"
//           onMouseDown={() => {
//             isResized.current = true;
//           }}
//         />
//       )}

//       {/* Toggle Button */}
//       <button
//         className="absolute top-2 left-2 z-10 bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded"
//         onClick={toggleSidebar}
//       >
//         {isOpen ? "Close" : "Open"}
//       </button>
//     </div>
//   );
// }

import { useState, useRef } from "react";

// const [minWidth, maxWidth, defaultWidth] = [200, 500, 350];

interface SidebarProps {
  children?: React.ReactNode;
  trigger?: React.ReactNode;
  minWidth?: number;
  maxWidth?: number;
  defaultWidth?: number;
  isOpen?: boolean; // controlled state (optional)
  onOpenChange?: (open: boolean) => void; // handler to update state
}

export default function Sidebar({
  children,
  trigger,
  minWidth = 200,
  maxWidth = 500,
  defaultWidth = 350,
  isOpen: externalIsOpen,
  onOpenChange,
}: SidebarProps) {
  const [internalOpen, setInternalOpen] = useState(true);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalOpen;

  //   const [isOpen, setIsOpen] = useState(true);
  const [width, setWidth] = useState(() => {
    const stored = localStorage.getItem("sidebarWidth");
    return stored ? parseInt(stored) : defaultWidth;
  });

  const widthRef = useRef(width);
  const isResizing = useRef(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const setOpen = (value: boolean) => {
    if (onOpenChange) onOpenChange(value);
    else setInternalOpen(value);
  };

  const toggleSidebar = () => {
    const willOpen = !isOpen;
    setOpen(willOpen);

    const targetWidth = willOpen ? widthRef.current : 0;
    setWidth(targetWidth);

    if (sidebarRef.current) {
      sidebarRef.current.style.width = `${targetWidth}px`;
    }

    widthRef.current = minWidth;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current || !sidebarRef.current) return;

    let nextWidth = widthRef.current + e.movementX;

    if (nextWidth <= minWidth - 10) {
      // Auto-close if dragged too far left
      isResizing.current = false;
      setOpen(false);
      setWidth(0);
      widthRef.current = minWidth;

      if (sidebarRef.current) {
        sidebarRef.current.style.width = `0px`;
      }

      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      return;
    }

    const clamped = Math.min(maxWidth, Math.max(minWidth, nextWidth));
    widthRef.current = clamped;
    if (sidebarRef.current) {
      sidebarRef.current.style.width = `${clamped}px`;
    }
  };

  const handleMouseUp = () => {
    if (isResizing.current) {
      isResizing.current = false;
      setWidth(widthRef.current);
      localStorage.setItem("sidebarWidth", widthRef.current.toString());
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
  };

  const handleMouseDown = () => {
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="flex  relative">
      <div
        ref={sidebarRef}
        className={` overflow-hidden ${
          !isResizing.current
            ? " transition-all duration-300 ease-in-out"
            : "transition-transform duration-200 ease-in-out"
        }`}
        style={{
          width: `${width}px`,
          transform: isOpen ? "translateX(0)" : `translateX(-${width}px)`,
          opacity: isOpen ? 1 : 0,
          willChange: "transform, width, opacity",
          position: "relative",
        }}
      >
        {/* <div className="p-4">Sidebar</div> */}
        <div className="flex h-full w-full">{children}</div>
      </div>

      {isOpen && (
        <div
          className="w-2 cursor-col-resize "
          onMouseDown={(e) => {
            e.preventDefault(); // <--- important! This prevents the browser from initiating unintended behaviors like drag selection or content highlighting, especially on overlapping elements.
            handleMouseDown();
          }}
        />
      )}

      {/* <button
        onClick={toggleSidebar}
        className="absolute top-2 left-2 z-10 bg-gray-200 hover:bg-gray-300 text-black px-2 py-1 rounded shadow"
      >
        {isOpen ? "Close" : "Open"}
      </button> */}
      {trigger ? (
        <div className=" " onClick={toggleSidebar}>
          {trigger}
        </div>
      ) : (
        <button
          onClick={toggleSidebar}
          className="absolute top-2 left-2 z-10 bg-gray-200 hover:bg-gray-300 text-black px-2 py-1 rounded shadow"
        >
          {isOpen ? "Close" : "Open"}
        </button>
      )}
    </div>
  );
}
