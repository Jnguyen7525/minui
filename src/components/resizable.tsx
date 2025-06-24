import { createContext, useContext, useEffect, useRef, useState } from "react";

interface PanelGroupProps {
  children: React.ReactNode;
  direction?: "horizontal" | "vertical";
  className?: string;
}

interface ResizablePanelProps {
  children: React.ReactNode;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
}

const ResizeContext = createContext({ direction: "horizontal" as const });

export function ResizablePanelGroup({
  children,
  direction = "horizontal",
  className = "",
}: PanelGroupProps) {
  return (
    <ResizeContext.Provider value={{ direction }}>
      <div
        className={`flex ${
          direction === "horizontal" ? "flex-row" : "flex-col"
        } w-full h-full relative ${className}`}
      >
        {children}
      </div>
    </ResizeContext.Provider>
  );
}

export function ResizablePanel({
  children,
  defaultSize = 50,
  minSize = 10,
  maxSize = 90,
}: ResizablePanelProps) {
  const { direction } = useContext(ResizeContext);
  const [size, setSize] = useState(defaultSize);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = panelRef.current;
    if (el) {
      if (direction === "horizontal") {
        el.style.width = `${size}%`;
      } else {
        el.style.height = `${size}%`;
      }
    }
  }, [size, direction]);

  return (
    <div ref={panelRef} className="relative overflow-hidden">
      {children}
    </div>
  );
}

export function ResizableHandle() {
  const { direction } = useContext(ResizeContext);
  const isHorizontal = direction === "horizontal";

  return (
    <div
      className={`${
        isHorizontal ? "w-1 cursor-col-resize" : "h-1 cursor-row-resize"
      } bg-gray-300 transition-colors hover:bg-gray-400`}
      onMouseDown={(e) => {
        e.preventDefault();
        const handle = e.currentTarget;
        const prev = handle.previousElementSibling as HTMLElement;
        const next = handle.nextElementSibling as HTMLElement;
        const container = handle.parentElement;

        const containerRect = container?.getBoundingClientRect();
        const isRow = direction === "horizontal";

        const totalSize = isRow
          ? containerRect?.width ?? 0
          : containerRect?.height ?? 0;

        const onMouseMove = (ev: MouseEvent) => {
          const offset = isRow
            ? ev.clientX - (containerRect?.left ?? 0)
            : ev.clientY - (containerRect?.top ?? 0);

          const percent = (offset / totalSize) * 100;
          if (prev)
            isRow
              ? (prev.style.width = `${percent}%`)
              : (prev.style.height = `${percent}%`);
          if (next)
            isRow
              ? (next.style.width = `${100 - percent}%`)
              : (next.style.height = `${100 - percent}%`);
        };

        const onMouseUp = () => {
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp, { once: true });
      }}
    />
  );
}
