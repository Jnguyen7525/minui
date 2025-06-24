// import { createContext, useContext, useEffect, useRef, useState } from "react";

// interface PanelGroupProps {
//   children: React.ReactNode;
//   direction?: "horizontal" | "vertical";
//   className?: string;
// }

// interface ResizablePanelProps {
//   children: React.ReactNode;
//   defaultSize?: number;
//   minSize?: number;
//   maxSize?: number;
// }

// const ResizeContext = createContext({ direction: "horizontal" });

// export function ResizablePanelGroup({
//   children,
//   direction = "horizontal",
//   className = "",
// }: PanelGroupProps) {
//   return (
//     <ResizeContext.Provider value={{ direction }}>
//       <div
//         className={`flex ${
//           direction === "horizontal" ? "flex-row" : "flex-col"
//         } w-full h-full relative ${className}`}
//       >
//         {children}
//       </div>
//     </ResizeContext.Provider>
//   );
// }

// export function ResizablePanel({
//   children,
//   defaultSize = 50,
// }: //   minSize = 10,
// //   maxSize = 90,
// ResizablePanelProps) {
//   const { direction } = useContext(ResizeContext);
//   const [size, setSize] = useState(defaultSize);
//   const panelRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const el = panelRef.current;
//     if (el) {
//       if (direction === "horizontal") {
//         el.style.width = `${size}%`;
//       } else {
//         el.style.height = `${size}%`;
//       }
//     }
//   }, [size, direction]);

//   return (
//     <div ref={panelRef} className="relative overflow-hidden">
//       {children}
//     </div>
//   );
// }

// export function ResizableHandle() {
//   const { direction } = useContext(ResizeContext);
//   const isHorizontal = direction === "horizontal";

//   return (
//     <div
//       className={`${
//         isHorizontal ? "w-1 cursor-col-resize" : "h-1 cursor-row-resize"
//       } bg-gray-300 transition-colors hover:bg-gray-400`}
//       onMouseDown={(e) => {
//         e.preventDefault();
//         const handle = e.currentTarget;
//         const prev = handle.previousElementSibling as HTMLElement;
//         const next = handle.nextElementSibling as HTMLElement;
//         const container = handle.parentElement;

//         const containerRect = container?.getBoundingClientRect();
//         const isRow = direction === "horizontal";

//         const totalSize = isRow
//           ? containerRect?.width ?? 0
//           : containerRect?.height ?? 0;

//         const onMouseMove = (ev: MouseEvent) => {
//           const offset = isRow
//             ? ev.clientX - (containerRect?.left ?? 0)
//             : ev.clientY - (containerRect?.top ?? 0);

//           const percent = (offset / totalSize) * 100;
//           if (prev)
//             isRow
//               ? (prev.style.width = `${percent}%`)
//               : (prev.style.height = `${percent}%`);
//           if (next)
//             isRow
//               ? (next.style.width = `${100 - percent}%`)
//               : (next.style.height = `${100 - percent}%`);
//         };

//         const onMouseUp = () => {
//           document.removeEventListener("mousemove", onMouseMove);
//           document.removeEventListener("mouseup", onMouseUp);
//         };

//         document.addEventListener("mousemove", onMouseMove);
//         document.addEventListener("mouseup", onMouseUp, { once: true });
//       }}
//     />
//   );
// }

// import {
//   createContext,
//   useContext,
//   useState,
//   useRef,
//   useLayoutEffect,
//   type ReactNode,
//   type MutableRefObject,
// } from "react";

// type Direction = "horizontal" | "vertical";

// const ResizeContext = createContext<{
//   direction: Direction;
//   sizes: number[];
//   updateSize: (index: number, size: number) => void;
//   panelRefs: MutableRefObject<HTMLDivElement[]>;
// }>({
//   direction: "horizontal",
//   sizes: [],
//   updateSize: () => {},
//   panelRefs: { current: [] },
// });

// export function ResizablePanelGroup({
//   children,
//   direction = "horizontal",
//   className = "",
// }: {
//   children: ReactNode[];
//   direction?: Direction;
//   className?: string;
// }) {
//   const [sizes, setSizes] = useState<number[]>(
//     Array(children.length).fill(100 / children.length)
//   );

//   const panelRefs = useRef<HTMLDivElement[]>([]);

//   const updateSize = (index: number, size: number) => {
//     setSizes((prev) => {
//       const updated = [...prev];
//       updated[index] = size;
//       updated[index + 1] = 100 - size;
//       return updated;
//     });
//   };

//   return (
//     <ResizeContext.Provider value={{ direction, sizes, updateSize, panelRefs }}>
//       <div
//         className={`flex ${
//           direction === "horizontal" ? "flex-row" : "flex-col"
//         } w-full h-full ${className}`}
//       >
//         {children}
//       </div>
//     </ResizeContext.Provider>
//   );
// }

// export function ResizablePanel({
//   children,
//   index,
// }: {
//   children: ReactNode;
//   index: number;
// }) {
//   const { direction, sizes, panelRefs } = useContext(ResizeContext);
//   const ref = useRef<HTMLDivElement>(null);

//   useLayoutEffect(() => {
//     if (ref.current) {
//       panelRefs.current[index] = ref.current;
//     }
//   }, [index, panelRefs]);

//   const sizeStyle =
//     direction === "horizontal"
//       ? { width: `${sizes[index]}%` }
//       : { height: `${sizes[index]}%` };

//   return (
//     <div ref={ref} className="relative overflow-hidden " style={sizeStyle}>
//       {children}
//     </div>
//   );
// }

// export function ResizableHandle({ index }: { index: number }) {
//   const { direction, updateSize, panelRefs } = useContext(ResizeContext);
//   const isHorizontal = direction === "horizontal";

//   const onMouseDown = (e: React.MouseEvent) => {
//     e.preventDefault();

//     const isHorizontal = direction === "horizontal";
//     const prevPanel = panelRefs.current[index];
//     const nextPanel = panelRefs.current[index + 1];

//     if (!prevPanel || !nextPanel) return;

//     const start = isHorizontal ? e.clientX : e.clientY;
//     const startPrevSize = isHorizontal
//       ? prevPanel.getBoundingClientRect().width
//       : prevPanel.getBoundingClientRect().height;

//     const container = prevPanel.parentElement;
//     const totalSize = isHorizontal
//       ? container?.getBoundingClientRect().width ?? 0
//       : container?.getBoundingClientRect().height ?? 0;

//     const onMouseMove = (ev: MouseEvent) => {
//       const delta = (isHorizontal ? ev.clientX : ev.clientY) - start;
//       const newPrevSize = startPrevSize + delta;
//       const newPrevPercent = (newPrevSize / totalSize) * 100;
//       updateSize(index, newPrevPercent);
//     };

//     const onMouseUp = () => {
//       document.removeEventListener("mousemove", onMouseMove);
//       document.removeEventListener("mouseup", onMouseUp);
//     };

//     document.addEventListener("mousemove", onMouseMove);
//     document.addEventListener("mouseup", onMouseUp, { once: true });
//   };

//   return (
//     <div
//       className={`${
//         isHorizontal ? "w-1 cursor-col-resize" : "h-1 cursor-row-resize"
//       } bg-gray-300 hover:bg-gray-400 transition-all`}
//       onMouseDown={onMouseDown}
//     />
//   );
// }

// import {
//   createContext,
//   useContext,
//   useState,
//   useRef,
//   type ReactNode,
//   type MutableRefObject,
//   useLayoutEffect,
// } from "react";

// type Direction = "horizontal" | "vertical";

// interface ResizeContextValue {
//   direction: Direction;
//   sizes: number[];
//   updateSize: (index: number, newSize: number) => void;
//   panelRefs: MutableRefObject<HTMLDivElement[]>;
// }

// const ResizeContext = createContext<ResizeContextValue>({
//   direction: "horizontal",
//   sizes: [],
//   updateSize: () => {},
//   panelRefs: { current: [] },
// });

// export function ResizablePanelGroup({
//   children,
//   direction = "horizontal",
//   className = "",
// }: {
//   children: ReactNode[];
//   direction?: Direction;
//   className?: string;
// }) {
//   const panelCount = children.filter(
//     (child) => (child as any)?.type?.name === "ResizablePanel"
//   ).length;

//   const [sizes, setSizes] = useState<number[]>(
//     Array(panelCount).fill(100 / panelCount)
//   );

//   const panelRefs = useRef<HTMLDivElement[]>([]);

//   const updateSize = (index: number, newSize: number) => {
//     setSizes((prev) => {
//       const updated = [...prev];
//       updated[index] = newSize;
//       updated[index + 1] = 100 - newSize;
//       return updated;
//     });
//   };

//   return (
//     <ResizeContext.Provider value={{ direction, sizes, updateSize, panelRefs }}>
//       <div
//         className={`flex ${
//           direction === "horizontal" ? "flex-row" : "flex-col"
//         } w-full h-full ${className}`}
//       >
//         {children}
//       </div>
//     </ResizeContext.Provider>
//   );
// }

// export function ResizablePanel({
//   children,
//   index,
// }: {
//   children: ReactNode;
//   index: number;
// }) {
//   const { direction, sizes, panelRefs } = useContext(ResizeContext);
//   const ref = useRef<HTMLDivElement>(null);

//   useLayoutEffect(() => {
//     if (ref.current) {
//       panelRefs.current[index] = ref.current;
//     }
//   }, [index, panelRefs]);

//   const style =
//     direction === "horizontal"
//       ? { width: `${sizes[index]}%`, height: "100%" }
//       : { height: `${sizes[index]}%`, width: "100%" };

//   return (
//     <div
//       ref={ref}
//       className="shrink-0 overflow-hidden relative transition-all duration-200"
//       style={style}
//     >
//       {children}
//     </div>
//   );
// }

// export function ResizableHandle({ index }: { index: number }) {
//   const { direction, updateSize, panelRefs } = useContext(ResizeContext);
//   const isHorizontal = direction === "horizontal";

//   const onMouseDown = (e: React.MouseEvent) => {
//     e.preventDefault();

//     const prevPanel = panelRefs.current[index];
//     const container = prevPanel?.parentElement;
//     if (!prevPanel || !container) return;

//     const start = isHorizontal ? e.clientX : e.clientY;
//     const prevSize = isHorizontal
//       ? prevPanel.getBoundingClientRect().width
//       : prevPanel.getBoundingClientRect().height;

//     const totalSize = isHorizontal
//       ? container.getBoundingClientRect().width
//       : container.getBoundingClientRect().height;

//     const onMouseMove = (ev: MouseEvent) => {
//       const current = isHorizontal ? ev.clientX : ev.clientY;
//       const delta = current - start;
//       const newPixelSize = prevSize + delta;
//       const newPercentSize = (newPixelSize / totalSize) * 100;
//       updateSize(index, newPercentSize);
//     };

//     const onMouseUp = () => {
//       document.removeEventListener("mousemove", onMouseMove);
//       document.removeEventListener("mouseup", onMouseUp);
//     };

//     document.addEventListener("mousemove", onMouseMove);
//     document.addEventListener("mouseup", onMouseUp, { once: true });
//   };

//   return (
//     <div
//       className={`${
//         isHorizontal ? "w-1 cursor-col-resize" : "h-1 cursor-row-resize"
//       } bg-gray-300 hover:bg-gray-400 transition-colors shrink-0`}
//       onMouseDown={onMouseDown}
//     />
//   );
// }

// import {
//   createContext,
//   useContext,
//   useState,
//   useRef,
//   type ReactNode,
//   useLayoutEffect,
//   useEffect,
//   MutableRefObject,
// } from "react";

// type Direction = "horizontal" | "vertical";

// interface ResizeContextValue {
//   direction: Direction;
//   panelRefs: MutableRefObject<HTMLDivElement[]>;
//   storageKey?: string;
//   sizes: number[];
//   updateSizes: (next: number[]) => void;
// }

// const ResizeContext = createContext<ResizeContextValue>({
//   direction: "horizontal",
//   panelRefs: { current: [] },
//   sizes: [],
//   updateSizes: () => {},
// });

// export function ResizablePanelGroup({
//   children,
//   direction = "horizontal",
//   className = "",
//   storageKey,
// }: {
//   children: ReactNode[];
//   direction?: Direction;
//   className?: string;
//   storageKey?: string;
// }) {
//   const panelCount = children.filter(
//     (c) => (c as any)?.type?.name === "ResizablePanel"
//   ).length;

//   const panelRefs = useRef<HTMLDivElement[]>([]);

//   const loadSizes = () => {
//     if (!storageKey) return null;
//     const saved = localStorage.getItem(storageKey);
//     if (!saved) return null;
//     try {
//       const parsed = JSON.parse(saved);
//       if (
//         Array.isArray(parsed) &&
//         parsed.length === panelCount &&
//         parsed.every((n) => typeof n === "number")
//       ) {
//         return parsed;
//       }
//     } catch {
//       return null;
//     }
//     return null;
//   };

//   const [sizes, setSizes] = useState<number[]>(
//     () => loadSizes() || Array(panelCount).fill(100 / panelCount)
//   );

//   const updateSizes = (next: number[]) => {
//     setSizes(next);
//     if (storageKey) {
//       localStorage.setItem(storageKey, JSON.stringify(next));
//     }
//   };

//   return (
//     <ResizeContext.Provider
//       value={{ direction, panelRefs, sizes, updateSizes, storageKey }}
//     >
//       <div
//         className={`flex ${
//           direction === "horizontal" ? "flex-row" : "flex-col"
//         } w-full h-full ${className}`}
//       >
//         {children}
//       </div>
//     </ResizeContext.Provider>
//   );
// }

// export function ResizablePanel({
//   children,
//   index,
// }: {
//   children: ReactNode;
//   index: number;
// }) {
//   const { direction, sizes, panelRefs } = useContext(ResizeContext);
//   const ref = useRef<HTMLDivElement>(null);

//   useLayoutEffect(() => {
//     if (ref.current) {
//       panelRefs.current[index] = ref.current;
//       if (direction === "horizontal") {
//         ref.current.style.width = `${sizes[index]}%`;
//       } else {
//         ref.current.style.height = `${sizes[index]}%`;
//       }
//     }
//   }, [index, sizes, direction, panelRefs]);

//   return (
//     <div
//       ref={ref}
//       className="shrink-0 overflow-hidden relative transition-all duration-200"
//     >
//       {children}
//     </div>
//   );
// }

// export function ResizableHandle({ index }: { index: number }) {
//   const { direction, panelRefs, updateSizes, sizes } =
//     useContext(ResizeContext);
//   const isHorizontal = direction === "horizontal";

//   const onMouseDown = (e: React.MouseEvent) => {
//     e.preventDefault();

//     const prevPanel = panelRefs.current[index];
//     const nextPanel = panelRefs.current[index + 1];
//     const container = prevPanel?.parentElement;
//     if (!prevPanel || !nextPanel || !container) return;

//     const containerSize = isHorizontal
//       ? container.getBoundingClientRect().width
//       : container.getBoundingClientRect().height;

//     const start = isHorizontal ? e.clientX : e.clientY;

//     const prevStart = prevPanel.getBoundingClientRect();
//     const nextStart = nextPanel.getBoundingClientRect();

//     const prevSizePx = isHorizontal ? prevStart.width : prevStart.height;
//     const nextSizePx = isHorizontal ? nextStart.width : nextStart.height;

//     const onMouseMove = (ev: MouseEvent) => {
//       const current = isHorizontal ? ev.clientX : ev.clientY;
//       const delta = current - start;

//       const newPrev = Math.max(10, prevSizePx + delta);
//       const newNext = Math.max(10, nextSizePx - delta);
//       const total = newPrev + newNext;

//       const newPrevPercent =
//         (newPrev / (total || 1)) * (sizes[index] + sizes[index + 1]);
//       const newNextPercent = 100 - newPrevPercent;

//       if (prevPanel && nextPanel) {
//         if (isHorizontal) {
//           prevPanel.style.width = `${newPrevPercent}%`;
//           nextPanel.style.width = `${newNextPercent}%`;
//         } else {
//           prevPanel.style.height = `${newPrevPercent}%`;
//           nextPanel.style.height = `${newNextPercent}%`;
//         }
//       }

//       updateSizes([
//         ...sizes.slice(0, index),
//         newPrevPercent,
//         newNextPercent,
//         ...sizes.slice(index + 2),
//       ]);
//     };

//     const onMouseUp = () => {
//       document.removeEventListener("mousemove", onMouseMove);
//       document.removeEventListener("mouseup", onMouseUp);
//     };

//     document.addEventListener("mousemove", onMouseMove);
//     document.addEventListener("mouseup", onMouseUp, { once: true });
//   };

//   return (
//     <div
//       className={`${
//         isHorizontal ? "w-1 cursor-col-resize" : "h-1 cursor-row-resize"
//       } bg-gray-300 hover:bg-gray-400 transition-colors shrink-0`}
//       onMouseDown={onMouseDown}
//     />
//   );
// }

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
      const saved = localStorage.getItem(storageKey);
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
    localStorage.setItem(storageKey, JSON.stringify(sizes));
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
}: {
  children: ReactNode;
  index: number;
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
      className="overflow-hidden relative  grow"
      style={{ width: "100%", height: "100%" }}
    >
      {children}
    </div>
  );
}

export function ResizableHandle({ index }: { index: number }) {
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
      } bg-gray-300 hover:bg-gray-400 shrink-0 transition-colors`}
      onMouseDown={onMouseDown}
    />
  );
}
