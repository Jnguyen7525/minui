import { useState, useRef } from "react";

interface SidebarProps {
  children?: React.ReactNode;
  trigger?: React.ReactNode;
  minWidth?: number;
  maxWidth?: number;
  defaultWidth?: number;
  isOpen?: boolean; // controlled state (optional)
  onOpenChange?: (open: boolean) => void; // handler to update state
  resizable?: boolean;
  className?: string;
}

export default function Sidebar({
  children,
  trigger,
  minWidth = 200,
  maxWidth = 500,
  defaultWidth = 350,
  isOpen: externalIsOpen,
  onOpenChange,
  resizable = false, // ✅ default to false
  className,
}: SidebarProps) {
  const [internalOpen, setInternalOpen] = useState(true);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalOpen;

  const [width, setWidth] = useState(() => {
    const stored = sessionStorage.getItem("sidebarWidth");
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
    if (!isResizing.current || !sidebarRef.current || !resizable) return;

    let nextWidth = widthRef.current + e.movementX;

    if (nextWidth <= minWidth - 10) {
      // Auto-close if dragged too far left
      isResizing.current = false;
      setOpen(false);
      setWidth(0);
      widthRef.current = minWidth;

      if (sidebarRef.current) {
        sidebarRef.current.style.width = `0px`;

        sidebarRef.current.style.transition =
          "width 200ms ease, opacity 200ms ease";

        sidebarRef.current.style.opacity = "0";
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
      sessionStorage.setItem("sidebarWidth", widthRef.current.toString());
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
  };

  const handleMouseDown = () => {
    if (!resizable) return;
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className={`flex ${className}`}
      style={{
        width: `${!resizable && `${minWidth}px`}`,
      }}
    >
      {/* trigger */}
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
        <div className="flex h-full w-full">{children}</div>
      </div>

      {/* handle */}
      {isOpen && resizable && (
        <div
          className={` cursor-ew-resize border-[1px] hover:opacity-50`}
          onMouseDown={(e) => {
            e.preventDefault(); // <--- important! This prevents the browser from initiating unintended behaviors like drag selection or content highlighting, especially on overlapping elements.
            handleMouseDown();
          }}
        />
      )}
    </div>
  );
}
