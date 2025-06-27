// import {
//   createContext,
//   useContext,
//   useState,
//   useRef,
//   useEffect,
//   type ReactNode,
//   useLayoutEffect,
// } from "react";

// type GridContextType = {
//   rowSizes: number[];
//   colSizes: number[];
//   updateSize: (
//     row: number,
//     col: number,
//     deltaX: number,
//     deltaY: number
//   ) => void;
//   containerRef: React.RefObject<HTMLDivElement>;
//   register: (row: number, col: number, ref: HTMLDivElement) => void;
//   gridResizable: boolean;
//   rows: number;
//   cols: number;
// };

// const GridContext = createContext<GridContextType | null>(null);

// export function ResizableGridProvider({
//   rows,
//   cols,
//   children,
//   gridResizable = false, // default to off
// }: {
//   rows: number;
//   cols: number;
//   children: ReactNode;
//   gridResizable?: boolean;
// }) {
//   const [rowSizes, setRowSizes] = useState(() => Array(rows).fill(150));
//   const [colSizes, setColSizes] = useState(() => Array(cols).fill(150));

//   const containerRef = useRef<HTMLDivElement>(null);
//   const panelRefs = useRef<Record<string, HTMLDivElement>>({});

//   useLayoutEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const totalWidth = container.offsetWidth;
//     const totalHeight = container.offsetHeight;

//     setColSizes(Array(cols).fill(totalWidth / cols));
//     setRowSizes(Array(rows).fill(totalHeight / rows));
//   }, [rows, cols]);

//   const register = (row: number, col: number, ref: HTMLDivElement) => {
//     panelRefs.current[`${row},${col}`] = ref;
//   };

//   const clampPair = (a: number, b: number, delta: number, min = 0.01) => {
//     const total = a + b;
//     let nextA = Math.max(min, a + delta);
//     let nextB = total - nextA;
//     if (nextB < min) {
//       nextB = min;
//       nextA = total - min;
//     }
//     return [nextA, nextB];
//   };

//   const updateSize = (
//     row: number,
//     col: number,
//     deltaX: number,
//     deltaY: number
//   ) => {
//     console.log(
//       `🧠 Resizing row ${row}, col ${col}, Δx=${deltaX}px Δy=${deltaY}px`
//     );

//     setColSizes((prev) => {
//       const left = prev[col];
//       const right = prev[col + 1];
//       if (left == null || right == null) return prev;
//       const [nextLeft, nextRight] = clampPair(left, right, deltaX);
//       return [
//         ...prev.slice(0, col),
//         nextLeft,
//         nextRight,
//         ...prev.slice(col + 2),
//       ];
//     });

//     setRowSizes((prev) => {
//       const top = prev[row];
//       const bottom = prev[row + 1];
//       if (top == null || bottom == null) return prev;
//       const [nextTop, nextBottom] = clampPair(top, bottom, deltaY);
//       return [
//         ...prev.slice(0, row),
//         nextTop,
//         nextBottom,
//         ...prev.slice(row + 2),
//       ];
//     });
//   };

//   return (
//     <GridContext.Provider
//       value={{
//         rowSizes,
//         colSizes,
//         updateSize,
//         containerRef,
//         register,
//         gridResizable,
//         rows,
//         cols,
//       }}
//     >
//       <div
//         ref={containerRef}
//         className="w-full h-full grid gap-0"
//         style={{
//           gridTemplateRows: rowSizes.map((r) => `${r}px`).join(" "),
//           gridTemplateColumns: colSizes.map((c) => `${c}px`).join(" "),
//         }}
//       >
//         {children}
//       </div>
//     </GridContext.Provider>
//   );
// }

// export function GridPanel({
//   row,
//   col,
//   children,
// }: {
//   row: number;
//   col: number;
//   children: ReactNode;
// }) {
//   const ref = useRef<HTMLDivElement>(null);
//   const { register } = useResizableGrid();

//   useEffect(() => {
//     if (ref.current) register(row, col, ref.current);
//   }, [row, col]);

//   return (
//     <div
//       ref={ref}
//       className="relative overflow-hidden border border-gray-300"
//       style={{
//         gridRow: row + 1,
//         gridColumn: col + 1,
//       }}
//     >
//       <div className="w-full h-full">{children}</div>
//       {/* <CornerResizer row={row} col={col} /> */}
//       <CornerResizer row={row} col={col} corner="top-left" />
//       <CornerResizer row={row} col={col} corner="top-right" />
//       <CornerResizer row={row} col={col} corner="bottom-left" />
//       <CornerResizer row={row} col={col} corner="bottom-right" />
//     </div>
//   );
// }

// function CornerResizer({
//   row,
//   col,
//   corner,
// }: {
//   row: number;
//   col: number;
//   corner: "top-left" | "top-right" | "bottom-left" | "bottom-right";
// }) {
//   //   const { updateSize } = useResizableGrid();
//   const { updateSize, gridResizable, rows, cols } = useResizableGrid();

//   const isTop = corner.includes("top");
//   const isLeft = corner.includes("left");
//   const isDiagonalNWSE = corner === "top-left" || corner === "bottom-right";

//   const owningRow = isTop ? row - 1 : row;
//   const owningCol = isLeft ? col - 1 : col;

//   const canResizeRow = owningRow >= 0;
//   const canResizeCol = owningCol >= 0;

//   const cursorClass = isDiagonalNWSE
//     ? "cursor-nwse-resize"
//     : "cursor-nesw-resize";

//   const positionClass = {
//     "top-left": "top-0 left-0",
//     "top-right": "top-0 right-0",
//     "bottom-left": "bottom-0 left-0",
//     "bottom-right": "bottom-0 right-0",
//   }[corner];

//   const onMouseDown = (e: React.MouseEvent) => {
//     e.preventDefault();

//     if (!canResizeRow && !canResizeCol) return; // no-op corner

//     let lastX = e.clientX;
//     let lastY = e.clientY;

//     const onMouseMove = (ev: MouseEvent) => {
//       const dx = ev.clientX - lastX;
//       const dy = ev.clientY - lastY;
//       lastX = ev.clientX;
//       lastY = ev.clientY;

//       updateSize(
//         canResizeRow ? owningRow : row,
//         canResizeCol ? owningCol : col,
//         canResizeCol ? dx : 0,
//         canResizeRow ? dy : 0
//       );
//     };

//     const onMouseUp = () => {
//       document.removeEventListener("mousemove", onMouseMove);
//       document.removeEventListener("mouseup", onMouseUp);
//     };

//     document.addEventListener("mousemove", onMouseMove);
//     document.addEventListener("mouseup", onMouseUp, { once: true });
//   };

//   const isOuterCorner =
//     (corner === "top-left" && row === 0 && col === 0) ||
//     (corner === "top-right" && row === 0 && col === cols - 1) ||
//     (corner === "bottom-left" && row === rows - 1 && col === 0) ||
//     (corner === "bottom-right" && row === rows - 1 && col === cols - 1);

//   if (isOuterCorner && !gridResizable) return null;

//   return (
//     <div
//       onMouseDown={onMouseDown}
//       className={`absolute w-3 h-3 bg-blue-500 z-10 ${cursorClass} ${positionClass}`}
//     />
//   );
// }

// function useResizableGrid() {
//   const ctx = useContext(GridContext);
//   if (!ctx) throw new Error("Missing ResizableGridProvider");
//   return ctx;
// }

// ! above works for panels this below is first version trying to resize parent grid as a whole

// import {
//   createContext,
//   useContext,
//   useState,
//   useRef,
//   useEffect,
//   useLayoutEffect,
//   type ReactNode,
// } from "react";

// // ==== Context ====

// interface GridContextType {
//   rowSizes: number[];
//   colSizes: number[];
//   updateSize: (row: number, col: number, dx: number, dy: number) => void;
//   containerRef: React.RefObject<HTMLDivElement | null>;
//   register: (row: number, col: number, ref: HTMLDivElement) => void;
//   gridResizable: boolean;
//   rows: number;
//   cols: number;
//   gridSize: { width: number; height: number };
//   gridPosition: { top: number; left: number };
//   setGridSize: React.Dispatch<
//     React.SetStateAction<{ width: number; height: number }>
//   >;
//   setGridPosition: React.Dispatch<
//     React.SetStateAction<{ top: number; left: number }>
//   >;
//   setColSizes: React.Dispatch<React.SetStateAction<number[]>>;
//   setRowSizes: React.Dispatch<React.SetStateAction<number[]>>;
// }

// const GridContext = createContext<GridContextType | null>(null);

// function useResizableGrid() {
//   const ctx = useContext(GridContext);
//   if (!ctx) throw new Error("Missing ResizableGridProvider");
//   return ctx;
// }

// // ==== Provider ====

// export function ResizableGridProvider({
//   rows,
//   cols,
//   children,
//   gridResizable = true,
// }: {
//   rows: number;
//   cols: number;
//   children: ReactNode;
//   gridResizable?: boolean;
// }) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [rowSizes, setRowSizes] = useState(() => Array(rows).fill(150));
//   const [colSizes, setColSizes] = useState(() => Array(cols).fill(150));
//   const [gridSize, setGridSize] = useState({ width: 300, height: 300 });
//   const [gridPosition, setGridPosition] = useState({ top: 0, left: 0 });

//   const panelRefs = useRef<Record<string, HTMLDivElement>>({});

//   const register = (row: number, col: number, ref: HTMLDivElement) => {
//     panelRefs.current[`${row},${col}`] = ref;
//   };

//   useLayoutEffect(() => {
//     const container = containerRef.current;
//     const parent = container?.parentElement;
//     if (!container || !parent) return;

//     const width = parent.offsetWidth;
//     const height = parent.offsetHeight;

//     setColSizes(Array(cols).fill(width / cols));
//     setRowSizes(Array(rows).fill(height / rows));

//     if (gridResizable) {
//       setGridSize({ width, height });
//       setGridPosition({ top: 0, left: 0 });
//     }
//   }, [rows, cols, gridResizable]);

//   const clampPair = (a: number, b: number, delta: number, min = 30) => {
//     const total = a + b;
//     let nextA = Math.max(min, a + delta);
//     let nextB = total - nextA;
//     if (nextB < min) {
//       nextB = min;
//       nextA = total - min;
//     }
//     return [nextA, nextB];
//   };

//   const updateSize = (row: number, col: number, dx: number, dy: number) => {
//     setColSizes((prev) => {
//       const left = prev[col];
//       const right = prev[col + 1];
//       if (left == null || right == null) return prev;
//       const [nextLeft, nextRight] = clampPair(left, right, dx);
//       return [
//         ...prev.slice(0, col),
//         nextLeft,
//         nextRight,
//         ...prev.slice(col + 2),
//       ];
//     });

//     setRowSizes((prev) => {
//       const top = prev[row];
//       const bottom = prev[row + 1];
//       if (top == null || bottom == null) return prev;
//       const [nextTop, nextBottom] = clampPair(top, bottom, dy);
//       return [
//         ...prev.slice(0, row),
//         nextTop,
//         nextBottom,
//         ...prev.slice(row + 2),
//       ];
//     });
//   };

//   return (
//     <GridContext.Provider
//       value={{
//         rowSizes,
//         colSizes,
//         updateSize,
//         containerRef,
//         register,
//         gridResizable,
//         rows,
//         cols,
//         gridSize,
//         setGridSize,
//         setColSizes,
//         setRowSizes,
//         gridPosition,
//         setGridPosition,
//       }}
//     >
//       <div
//         ref={containerRef}
//         className="absolute grid gap-0"
//         style={{
//           top: `${gridPosition.top}px`,
//           left: `${gridPosition.left}px`,
//           width: `${gridSize.width}px`,
//           height: `${gridSize.height}px`,
//           gridTemplateRows: rowSizes.map((r) => `${r}px`).join(" "),
//           gridTemplateColumns: colSizes.map((c) => `${c}px`).join(" "),
//         }}
//       >
//         {children}
//         {gridResizable && (
//           <>
//             <GridCornerResizer direction="top-left" />
//             <GridCornerResizer direction="top-right" />
//             <GridCornerResizer direction="bottom-left" />
//             <GridCornerResizer direction="bottom-right" />
//           </>
//         )}
//       </div>
//     </GridContext.Provider>
//   );
// }

// // ==== Grid-Level Corner Resizer ====

// function GridCornerResizer({
//   direction,
// }: {
//   direction: "top-left" | "top-right" | "bottom-left" | "bottom-right";
// }) {
//   const {
//     containerRef,
//     gridSize,
//     setGridSize,
//     gridPosition,
//     setGridPosition,
//     setColSizes,
//     setRowSizes,
//     colSizes,
//     rowSizes,
//   } = useResizableGrid();

//   const isTop = direction.includes("top");
//   const isLeft = direction.includes("left");
//   const isDiagonalNWSE =
//     direction === "top-left" || direction === "bottom-right";

//   const positionClass = {
//     "top-left": "top-0 left-0",
//     "top-right": "top-0 right-0",
//     "bottom-left": "bottom-0 left-0",
//     "bottom-right": "bottom-0 right-0",
//   }[direction];

//   const cursorClass = isDiagonalNWSE
//     ? "cursor-nwse-resize"
//     : "cursor-nesw-resize";

//   const onMouseDown = (e: React.MouseEvent) => {
//     e.preventDefault();
//     const parent = containerRef.current?.parentElement;
//     if (!parent) return;

//     const parentRect = parent.getBoundingClientRect();

//     let lastX = e.clientX;
//     let lastY = e.clientY;
//     const initialWidth = gridSize.width;
//     const initialHeight = gridSize.height;
//     const initialLeft = gridPosition.left;
//     const initialTop = gridPosition.top;
//     const initialCols = [...colSizes];
//     const initialRows = [...rowSizes];

//     const onMouseMove = (ev: MouseEvent) => {
//       lastX = ev.clientX;
//       lastY = ev.clientY;

//       const totalDX = lastX - e.clientX;
//       const totalDY = lastY - e.clientY;

//       let newLeft = isLeft ? initialLeft + totalDX : initialLeft;
//       let newTop = isTop ? initialTop + totalDY : initialTop;

//       // Clamp left/top to non-negative
//       newLeft = Math.max(0, newLeft);
//       newTop = Math.max(0, newTop);

//       let newWidth = initialWidth + (isLeft ? -totalDX : totalDX);
//       let newHeight = initialHeight + (isTop ? -totalDY : totalDY);

//       const maxWidth = parentRect.width - newLeft;
//       const maxHeight = parentRect.height - newTop;

//       newWidth = Math.min(Math.max(100, newWidth), maxWidth);
//       newHeight = Math.min(Math.max(100, newHeight), maxHeight);

//       // Clamp size
//       newWidth = Math.max(100, Math.min(newWidth, parentRect.width - newLeft));
//       newHeight = Math.max(
//         100,
//         Math.min(newHeight, parentRect.height - newTop)
//       );

//       // Clamp position
//       newLeft = Math.max(0, Math.min(newLeft, parentRect.width - newWidth));
//       newTop = Math.max(0, Math.min(newTop, parentRect.height - newHeight));

//       setGridPosition({ top: newTop, left: newLeft });
//       setGridSize({ width: newWidth, height: newHeight });

//       const colScale = newWidth / initialWidth;
//       const rowScale = newHeight / initialHeight;
//       setColSizes(initialCols.map((c) => c * colScale));
//       setRowSizes(initialRows.map((r) => r * rowScale));
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
//       onMouseDown={onMouseDown}
//       className={`absolute w-3 h-3 bg-green-600 z-20 ${cursorClass} ${positionClass}`}
//     />
//   );
// }

// // ==== GridPanel and CornerResizer remain unchanged (already functioning correctly) ====
// export function GridPanel({
//   row,
//   col,
//   children,
// }: {
//   row: number;
//   col: number;
//   children: ReactNode;
// }) {
//   const ref = useRef<HTMLDivElement>(null);
//   const { register, rows, cols } = useResizableGrid();

//   useEffect(() => {
//     if (ref.current) register(row, col, ref.current);
//   }, [row, col]);

//   const isTopLeft = row === 0 && col === 0;
//   const isTopRight = row === 0 && col === cols - 1;
//   const isBottomLeft = row === rows - 1 && col === 0;
//   const isBottomRight = row === rows - 1 && col === cols - 1;

//   return (
//     <div
//       ref={ref}
//       className="relative overflow-hidden border border-gray-300"
//       style={{
//         gridRow: row + 1,
//         gridColumn: col + 1,
//       }}
//     >
//       <div className="w-full h-full">{children}</div>

//       {!isTopLeft && <CornerResizer row={row} col={col} corner="top-left" />}
//       {!isTopRight && <CornerResizer row={row} col={col} corner="top-right" />}
//       {!isBottomLeft && (
//         <CornerResizer row={row} col={col} corner="bottom-left" />
//       )}
//       {!isBottomRight && (
//         <CornerResizer row={row} col={col} corner="bottom-right" />
//       )}
//     </div>
//   );
// }

// function CornerResizer({
//   row,
//   col,
//   corner,
// }: {
//   row: number;
//   col: number;
//   corner: "top-left" | "top-right" | "bottom-left" | "bottom-right";
// }) {
//   const { updateSize, gridResizable, rows, cols } = useResizableGrid();

//   const isTop = corner.includes("top");
//   const isLeft = corner.includes("left");
//   const isDiagonalNWSE = corner === "top-left" || corner === "bottom-right";

//   const owningRow = isTop ? row - 1 : row;
//   const owningCol = isLeft ? col - 1 : col;

//   const canResizeRow = owningRow >= 0;
//   const canResizeCol = owningCol >= 0;

//   const cursor = isDiagonalNWSE ? "cursor-nwse-resize" : "cursor-nesw-resize";
//   const positionClass = {
//     "top-left": "top-0 left-0",
//     "top-right": "top-0 right-0",
//     "bottom-left": "bottom-0 left-0",
//     "bottom-right": "bottom-0 right-0",
//   }[corner];

//   const isOuterCorner =
//     (corner === "top-left" && row === 0 && col === 0) ||
//     (corner === "top-right" && row === 0 && col === cols - 1) ||
//     (corner === "bottom-left" && row === rows - 1 && col === 0) ||
//     (corner === "bottom-right" && row === rows - 1 && col === cols - 1);

//   if (isOuterCorner && !gridResizable) return null;

//   const onMouseDown = (e: React.MouseEvent) => {
//     e.preventDefault();
//     if (!canResizeRow && !canResizeCol) return;

//     let lastX = e.clientX;
//     let lastY = e.clientY;

//     const onMouseMove = (ev: MouseEvent) => {
//       const dx = ev.clientX - lastX;
//       const dy = ev.clientY - lastY;
//       lastX = ev.clientX;
//       lastY = ev.clientY;

//       updateSize(
//         canResizeRow ? owningRow : row,
//         canResizeCol ? owningCol : col,
//         canResizeCol ? dx : 0,
//         canResizeRow ? dy : 0
//       );
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
//       onMouseDown={onMouseDown}
//       className={`absolute w-3 h-3 bg-blue-500 z-10 ${cursor} ${positionClass}`}
//     />
//   );
// }

// !2nd version above works but now trying to persist sizes with local storage
import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  type ReactNode,
} from "react";

// ==== Context ====

interface GridContextType {
  rowSizes: number[];
  colSizes: number[];
  updateSize: (row: number, col: number, dx: number, dy: number) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  register: (row: number, col: number, ref: HTMLDivElement) => void;
  gridResizable: boolean;
  rows: number;
  cols: number;
  gridSize: { width: number; height: number };
  gridPosition: { top: number; left: number };
  setGridSize: React.Dispatch<
    React.SetStateAction<{ width: number; height: number }>
  >;
  setGridPosition: React.Dispatch<
    React.SetStateAction<{ top: number; left: number }>
  >;
  setColSizes: React.Dispatch<React.SetStateAction<number[]>>;
  setRowSizes: React.Dispatch<React.SetStateAction<number[]>>;
  saveLayout: () => void;
}

const GridContext = createContext<GridContextType | null>(null);

function useResizableGrid() {
  const ctx = useContext(GridContext);
  if (!ctx) throw new Error("Missing ResizableGridProvider");
  return ctx;
}

// ==== Provider ====

export function ResizableGridProvider({
  rows,
  cols,
  children,
  gridResizable = true,
}: {
  rows: number;
  cols: number;
  children: React.ReactNode;
  gridResizable?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const saved =
    typeof window !== "undefined"
      ? sessionStorage.getItem("resizable-grid-layout")
      : null;

  const parsed = saved ? JSON.parse(saved) : null;

  const [gridSize, setGridSize] = useState(() =>
    parsed?.width && parsed?.height
      ? { width: parsed.width, height: parsed.height }
      : { width: 300, height: 300 }
  );

  const [gridPosition, setGridPosition] = useState(() =>
    typeof parsed?.top === "number" && typeof parsed?.left === "number"
      ? { top: parsed.top, left: parsed.left }
      : { top: 0, left: 0 }
  );

  const [colSizes, setColSizes] = useState(() => {
    if (Array.isArray(parsed?.colSizes) && parsed?.width) {
      return parsed.colSizes.map((p: number) => p * parsed.width);
    }
    return Array(cols).fill(150);
  });

  const [rowSizes, setRowSizes] = useState(() => {
    if (Array.isArray(parsed?.rowSizes) && parsed?.height) {
      return parsed.rowSizes.map((p: number) => p * parsed.height);
    }
    return Array(rows).fill(150);
  });

  const saveLayout = () => {
    const container = containerRef.current;
    if (!container) return;

    const totalWidth = colSizes.reduce(
      (sum: number, size: number) => sum + size,
      0
    );
    const totalHeight = rowSizes.reduce(
      (sum: number, size: number) => sum + size,
      0
    );

    const percentCols = colSizes.map(
      (px: number) => +(px / totalWidth).toFixed(6)
    );
    const percentRows = rowSizes.map(
      (px: number) => +(px / totalHeight).toFixed(6)
    );

    const rect = container.getBoundingClientRect();
    const data = {
      width: rect.width,
      height: rect.height,
      top: container.offsetTop,
      left: container.offsetLeft,
      rowSizes: percentRows,
      colSizes: percentCols,
    };

    sessionStorage.setItem("resizable-grid-layout", JSON.stringify(data));
  };

  useEffect(() => {
    if (!containerRef.current) return;
    saveLayout();
  }, [rowSizes, colSizes]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const parent = container?.parentElement;
    if (!container || !parent) return;

    // Fallback init only if nothing was restored
    if (!parsed) {
      const isValidLayout =
        parsed &&
        Array.isArray(parsed.colSizes) &&
        Array.isArray(parsed.rowSizes) &&
        typeof parsed.width === "number" &&
        typeof parsed.height === "number";

      if (!isValidLayout) {
        const width = parent.offsetWidth;
        const height = parent.offsetHeight;
        setColSizes(Array(cols).fill(width / cols));
        setRowSizes(Array(rows).fill(height / rows));
        setGridSize({ width, height });
        setGridPosition({ top: 0, left: 0 });
      }
    }
  }, [cols, rows, parsed]);

  const clampPair = (a: number, b: number, delta: number, min = 0.01) => {
    const total = a + b;
    let nextA = Math.max(min, a + delta);
    let nextB = total - nextA;
    if (nextB < min) {
      nextB = min;
      nextA = total - min;
    }
    return [nextA, nextB];
  };

  const updateSize = (row: number, col: number, dx: number, dy: number) => {
    setColSizes((prev: number[]) => {
      const left = prev[col];
      const right = prev[col + 1];
      if (left == null || right == null) return prev;
      const [nextLeft, nextRight] = clampPair(left, right, dx);
      return [
        ...prev.slice(0, col),
        nextLeft,
        nextRight,
        ...prev.slice(col + 2),
      ];
    });

    setRowSizes((prev: number[]) => {
      const top = prev[row];
      const bottom = prev[row + 1];
      if (top == null || bottom == null) return prev;
      const [nextTop, nextBottom] = clampPair(top, bottom, dy);
      return [
        ...prev.slice(0, row),
        nextTop,
        nextBottom,
        ...prev.slice(row + 2),
      ];
    });
  };

  const panelRefs = useRef<Record<string, HTMLDivElement>>({});
  const register = (row: number, col: number, ref: HTMLDivElement) => {
    panelRefs.current[`${row},${col}`] = ref;
  };

  return (
    <GridContext.Provider
      value={{
        rowSizes,
        colSizes,
        updateSize,
        containerRef,
        register,
        gridResizable,
        rows,
        cols,
        gridSize,
        setGridSize,
        setColSizes,
        setRowSizes,
        gridPosition,
        setGridPosition,
        saveLayout,
      }}
    >
      <div
        ref={containerRef}
        className="absolute grid gap-0"
        style={{
          top: `${gridPosition.top}px`,
          left: `${gridPosition.left}px`,
          width: `${gridSize.width}px`,
          height: `${gridSize.height}px`,
          gridTemplateRows: rowSizes.map((r: number) => `${r}px`).join(" "),
          gridTemplateColumns: colSizes.map((c: number) => `${c}px`).join(" "),
        }}
      >
        {children}
        {gridResizable && (
          <>
            <GridCornerResizer direction="top-left" />
            <GridCornerResizer direction="top-right" />
            <GridCornerResizer direction="bottom-left" />
            <GridCornerResizer direction="bottom-right" />
          </>
        )}
      </div>
    </GridContext.Provider>
  );
}

// ==== Corner Resizer ====

function GridCornerResizer({
  direction,
}: {
  direction: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const {
    containerRef,
    gridSize,
    setGridSize,
    gridPosition,
    setGridPosition,
    setColSizes,
    setRowSizes,
    colSizes,
    rowSizes,
    saveLayout,
  } = useResizableGrid();

  const isTop = direction.includes("top");
  const isLeft = direction.includes("left");
  const isDiagonalNWSE =
    direction === "top-left" || direction === "bottom-right";
  const positionClass = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  }[direction];
  const cursorClass = isDiagonalNWSE
    ? "cursor-nwse-resize"
    : "cursor-nesw-resize";

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const parent = containerRef.current?.parentElement;
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    let lastX = e.clientX;
    let lastY = e.clientY;

    const initialWidth = gridSize.width;
    const initialHeight = gridSize.height;
    const initialLeft = gridPosition.left;
    const initialTop = gridPosition.top;
    const initialCols = [...colSizes];
    const initialRows = [...rowSizes];

    const onMouseMove = (ev: MouseEvent) => {
      lastX = ev.clientX;
      lastY = ev.clientY;

      const totalDX = lastX - e.clientX;
      const totalDY = lastY - e.clientY;

      let newLeft = isLeft ? initialLeft + totalDX : initialLeft;
      let newTop = isTop ? initialTop + totalDY : initialTop;

      newLeft = Math.max(0, Math.min(newLeft, parentRect.width - 0.01));
      newTop = Math.max(0, Math.min(newTop, parentRect.height - 0.01));

      let newWidth = initialWidth + (isLeft ? -totalDX : totalDX);
      let newHeight = initialHeight + (isTop ? -totalDY : totalDY);

      const maxWidth = parentRect.width - newLeft;
      const maxHeight = parentRect.height - newTop;

      newWidth = Math.min(Math.max(100, newWidth), maxWidth);
      newHeight = Math.min(Math.max(100, newHeight), maxHeight);

      setGridPosition({ top: newTop, left: newLeft });
      setGridSize({ width: newWidth, height: newHeight });

      const colScale = newWidth / initialWidth;
      const rowScale = newHeight / initialHeight;
      setColSizes(initialCols.map((c) => c * colScale));
      setRowSizes(initialRows.map((r) => r * rowScale));
    };

    const onMouseUp = () => {
      saveLayout(); // 💾 Persist layout on drag end
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp, { once: true });
  };

  return (
    <div
      onMouseDown={onMouseDown}
      className={`absolute w-3 h-3 bg-green-600 z-20 ${cursorClass} ${positionClass}`}
    />
  );
}

export function GridPanel({
  row,
  col,
  rowSpan = 1,
  colSpan = 1,
  children,
}: {
  row: number;
  col: number;
  rowSpan?: number;
  colSpan?: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { register, rows, cols } = useResizableGrid();

  useEffect(() => {
    if (ref.current) register(row, col, ref.current);
  }, [row, col]);

  const isTopLeft = row === 0 && col === 0;
  const isTopRight = row === 0 && col === cols - 1;
  const isBottomLeft = row === rows - 1 && col === 0;
  const isBottomRight = row === rows - 1 && col === cols - 1;

  return (
    <div
      ref={ref}
      className="relative overflow-hidden border border-gray-300"
      style={{
        // gridRow: row + 1,
        // gridColumn: col + 1,
        gridRow: `${row + 1} / span ${rowSpan}`,
        gridColumn: `${col + 1} / span ${colSpan}`,
      }}
    >
      <div className="w-full h-full">{children}</div>

      {!isTopLeft && <CornerResizer row={row} col={col} corner="top-left" />}
      {!isTopRight && <CornerResizer row={row} col={col} corner="top-right" />}
      {!isBottomLeft && (
        <CornerResizer row={row} col={col} corner="bottom-left" />
      )}
      {!isBottomRight && (
        <CornerResizer row={row} col={col} corner="bottom-right" />
      )}
    </div>
  );
}

function CornerResizer({
  row,
  col,
  corner,
}: {
  row: number;
  col: number;
  corner: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const { updateSize, gridResizable, rows, cols } = useResizableGrid();

  const isTop = corner.includes("top");
  const isLeft = corner.includes("left");
  const isDiagonalNWSE = corner === "top-left" || corner === "bottom-right";

  const owningRow = isTop ? row - 1 : row;
  const owningCol = isLeft ? col - 1 : col;

  const canResizeRow = owningRow >= 0;
  const canResizeCol = owningCol >= 0;

  const cursor = isDiagonalNWSE ? "cursor-nwse-resize" : "cursor-nesw-resize";
  const positionClass = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  }[corner];

  const isOuterCorner =
    (corner === "top-left" && row === 0 && col === 0) ||
    (corner === "top-right" && row === 0 && col === cols - 1) ||
    (corner === "bottom-left" && row === rows - 1 && col === 0) ||
    (corner === "bottom-right" && row === rows - 1 && col === cols - 1);

  if (isOuterCorner && !gridResizable) return null;

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!canResizeRow && !canResizeCol) return;

    let lastX = e.clientX;
    let lastY = e.clientY;

    const onMouseMove = (ev: MouseEvent) => {
      const dx = ev.clientX - lastX;
      const dy = ev.clientY - lastY;
      lastX = ev.clientX;
      lastY = ev.clientY;

      updateSize(
        canResizeRow ? owningRow : row,
        canResizeCol ? owningCol : col,
        canResizeCol ? dx : 0,
        canResizeRow ? dy : 0
      );
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp, { once: true });
  };

  return (
    <div
      onMouseDown={onMouseDown}
      className={`absolute w-3 h-3 bg-blue-500 z-10 ${cursor} ${positionClass}`}
    />
  );
}
