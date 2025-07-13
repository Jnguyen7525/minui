import {
  createContext,
  useContext,
  useRef,
  useLayoutEffect,
  type ReactNode,
} from "react";

type Direction = "horizontal" | "vertical";

interface ResizeContextValue {
  direction: Direction;
  panelRefs: React.MutableRefObject<HTMLDivElement[]>;
  saveSizes: () => void;
}

const ResizeContext = createContext<ResizeContextValue>({
  direction: "horizontal",
  panelRefs: { current: [] },
  saveSizes: () => {},
});

export function ResizablePanelGroup({
  children,
  direction = "horizontal",
  className = "",
  storageKey,
}: {
  children: ReactNode[];
  direction?: Direction;
  className?: string;
  storageKey?: string;
}) {
  const panelRefs = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    if (!storageKey) return;
    try {
      const saved = sessionStorage.getItem(storageKey);
      if (!saved) return;
      const sizes = JSON.parse(saved) as number[];
      sizes.forEach((size, i) => {
        const el = panelRefs.current[i];
        if (el) {
          if (direction === "horizontal") el.style.width = `${size}%`;
          else el.style.height = `${size}%`;
        }
      });
    } catch {
      // Do nothing
    }
  }, [storageKey, direction]);

  const saveSizes = () => {
    if (!storageKey) return;
    const sizes = panelRefs.current.map((el) => {
      if (!el || !el.parentElement) return 0;
      const parentSize =
        direction === "horizontal"
          ? el.parentElement.offsetWidth
          : el.parentElement.offsetHeight;
      const elSize =
        direction === "horizontal" ? el.offsetWidth : el.offsetHeight;
      return Number(((elSize / parentSize) * 100).toFixed(2));
    });
    sessionStorage.setItem(storageKey, JSON.stringify(sizes));
  };

  return (
    <ResizeContext.Provider value={{ direction, panelRefs, saveSizes }}>
      <div
        className={`flex ${
          direction === "horizontal" ? "flex-row" : "flex-col"
        } w-full h-full ${className}`}
      >
        {children}
      </div>
    </ResizeContext.Provider>
  );
}

export function ResizablePanel({
  children,
  index,
  className,
}: {
  children: ReactNode;
  index: number;
  className?: string;
}) {
  const { panelRefs } = useContext(ResizeContext);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      panelRefs.current[index] = ref.current;
    }
  }, [index]);

  return (
    <div
      ref={ref}
      className={`overflow-hidden relative grow ${className}`}
      style={{ width: "100%", height: "100%" }}
    >
      {children}
    </div>
  );
}

export function ResizableHandle({
  index,
  className,
}: {
  index: number;
  className?: string;
}) {
  const { direction, panelRefs, saveSizes } = useContext(ResizeContext);
  const isHorizontal = direction === "horizontal";

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    const prev = panelRefs.current[index];
    const next = panelRefs.current[index + 1];
    const container = prev?.parentElement;

    if (!prev || !next || !container) return;

    const start = isHorizontal ? e.clientX : e.clientY;

    const prevSize = isHorizontal
      ? prev.getBoundingClientRect().width
      : prev.getBoundingClientRect().height;
    const nextSize = isHorizontal
      ? next.getBoundingClientRect().width
      : next.getBoundingClientRect().height;

    const totalSize = prevSize + nextSize;
    const minSize = 0;

    const onMouseMove = (ev: MouseEvent) => {
      const current = isHorizontal ? ev.clientX : ev.clientY;
      const delta = current - start;

      let newPrev = prevSize + delta;
      let newNext = nextSize - delta;

      if (newPrev < minSize) {
        newPrev = minSize;
        newNext = totalSize - minSize;
      }
      if (newNext < minSize) {
        newNext = minSize;
        newPrev = totalSize - minSize;
      }

      if (isHorizontal) {
        prev.style.width = `${newPrev}px`;
        next.style.width = `${newNext}px`;
      } else {
        prev.style.height = `${newPrev}px`;
        next.style.height = `${newNext}px`;
      }
    };

    const onMouseUp = () => {
      saveSizes();
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp, { once: true });
  };

  return (
    <div
      className={`${
        isHorizontal ? "w-1 cursor-ew-resize" : "h-1 cursor-ns-resize"
      } border hover:opacity-60 shrink-0 transition-colors ${className}`}
      onMouseDown={onMouseDown}
    />
  );
}
