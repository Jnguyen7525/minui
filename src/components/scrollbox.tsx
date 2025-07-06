import { useRef, useState, useEffect, type ReactNode } from "react";

type ScrollBoxProps = {
  children: ReactNode;
  height?: string;
  width?: string;
  className?: string;
};

export default function ScrollBox({
  children,
  height = "500px",
  width = "100%",
  className = "",
}: ScrollBoxProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollYRatio, setScrollYRatio] = useState(0);
  const [scrollXRatio, setScrollXRatio] = useState(0);

  const [dragAxis, setDragAxis] = useState<"y" | "x" | null>(null);
  const [startPos, setStartPos] = useState(0);
  const [startScroll, setStartScroll] = useState(0);

  const [isScrollableY, setIsScrollableY] = useState(false);
  const [isScrollableX, setIsScrollableX] = useState(false);

  // 🧠 Prevent text selection during drag
  useEffect(() => {
    document.body.style.userSelect = dragAxis ? "none" : "";
    return () => {
      document.body.style.userSelect = "";
    };
  }, [dragAxis]);

  // 📦 Update scrollbar ratios
  const updateScrollIndicators = () => {
    const el = scrollRef.current;
    if (!el) return;

    const maxY = el.scrollHeight - el.clientHeight;
    const maxX = el.scrollWidth - el.clientWidth;

    setScrollYRatio(maxY > 0 ? el.scrollTop / maxY : 0);
    setScrollXRatio(maxX > 0 ? el.scrollLeft / maxX : 0);

    setIsScrollableY(el.scrollHeight > el.clientHeight);
    setIsScrollableX(el.scrollWidth > el.clientWidth);
  };

  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement>,
    axis: "y" | "x"
  ) => {
    setDragAxis(axis);
    setStartPos(axis === "y" ? e.clientY : e.clientX);
    const el = scrollRef.current;
    if (el) setStartScroll(axis === "y" ? el.scrollTop : el.scrollLeft);
  };

  const handleDragMove = (e: MouseEvent) => {
    const el = scrollRef.current;
    if (!el || !dragAxis) return;

    if (dragAxis === "y") {
      const deltaY = e.clientY - startPos;
      const containerHeight = el.clientHeight;
      const contentHeight = el.scrollHeight;
      const thumbHeight = containerHeight * 0.1;
      const maxThumbRange = containerHeight - thumbHeight;
      const scrollRatio = (contentHeight - containerHeight) / maxThumbRange;
      el.scrollTop = startScroll + deltaY * scrollRatio;
    }

    if (dragAxis === "x") {
      const deltaX = e.clientX - startPos;
      const containerWidth = el.clientWidth;
      const contentWidth = el.scrollWidth;
      const thumbWidth = containerWidth * 0.1;
      const maxThumbRange = containerWidth - thumbWidth;
      const scrollRatio = (contentWidth - containerWidth) / maxThumbRange;
      el.scrollLeft = startScroll + deltaX * scrollRatio;
    }
  };

  const handleDragEnd = () => setDragAxis(null);

  useEffect(() => {
    updateScrollIndicators(); // Initial run

    const el = scrollRef.current;
    if (!el) return;

    const resizeObserver = new ResizeObserver(updateScrollIndicators);
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", updateScrollIndicators);
    return () => el?.removeEventListener("scroll", updateScrollIndicators);
  }, []);

  useEffect(() => {
    if (dragAxis) {
      window.addEventListener("mousemove", handleDragMove);
      window.addEventListener("mouseup", handleDragEnd);
    } else {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
    };
  }, [dragAxis]);

  return (
    <div className={`relative `} style={{ height, width }}>
      {/* 📦 Scrollable content */}
      <div
        ref={scrollRef}
        className={`scrollbox overflow-auto scrollbar-hide h-full w-full pr-4 pb-4`}
        style={{
          WebkitOverflowScrolling: "touch",
          position: "relative",
          zIndex: 10,
        }}
      >
        {children}
      </div>

      {/* 🔽 Vertical Scrollbar */}
      {isScrollableY && (
        <div
          onMouseDown={(e) => handleDragStart(e, "y")}
          className="absolute top-0 right-0 w-2 h-full z-20 flex items-start justify-center pointer-events-auto"
        >
          <div
            className={`${className}  cursor-pointer`}
            style={{
              height: `${Math.max(scrollYRatio * 100, 8)}%`,
              transform: "translateX(150%)",
            }}
          />
        </div>
      )}

      {/* 🔽 Horizontal Scrollbar */}

      {isScrollableX && (
        <div
          onMouseDown={(e) => handleDragStart(e, "x")}
          className="absolute bottom-0 left-0 h-2 w-full z-20 flex items-center justify-start pointer-events-auto"
        >
          <div
            className={`${className}  cursor-pointer`}
            style={{
              width: `${Math.max(scrollXRatio * 100, 8)}%`,
              transform: "translateY(150%)",
            }}
          />
        </div>
      )}
    </div>
  );
}
