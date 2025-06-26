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
// };

// const GridContext = createContext<GridContextType | null>(null);

// export function ResizableGridProvider({
//   rows,
//   cols,
//   children,
// }: {
//   rows: number;
//   cols: number;
//   children: ReactNode;
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
//       value={{ rowSizes, colSizes, updateSize, containerRef, register }}
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
//       <CornerResizer row={row} col={col} />
//     </div>
//   );
// }

// function CornerResizer({ row, col }: { row: number; col: number }) {
//   const { updateSize } = useResizableGrid();

//   const onMouseDown = (e: React.MouseEvent) => {
//     e.preventDefault();

//     let lastX = e.clientX;
//     let lastY = e.clientY;

//     const onMouseMove = (ev: MouseEvent) => {
//       const dx = ev.clientX - lastX;
//       const dy = ev.clientY - lastY;
//       lastX = ev.clientX;
//       lastY = ev.clientY;

//       updateSize(row, col, dx, dy);
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
//       className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 z-10 cursor-nwse-resize"
//     />
//   );
// }

// function useResizableGrid() {
//   const ctx = useContext(GridContext);
//   if (!ctx) throw new Error("Missing ResizableGridProvider");
//   return ctx;
// }

import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  type ReactNode,
  useLayoutEffect,
} from "react";

type GridContextType = {
  rowSizes: number[];
  colSizes: number[];
  updateSize: (
    row: number,
    col: number,
    deltaX: number,
    deltaY: number
  ) => void;
  containerRef: React.RefObject<HTMLDivElement>;
  register: (row: number, col: number, ref: HTMLDivElement) => void;
  gridResizable: boolean;
  rows: number;
  cols: number;
};

const GridContext = createContext<GridContextType | null>(null);

export function ResizableGridProvider({
  rows,
  cols,
  children,
  gridResizable = false, // default to off
}: {
  rows: number;
  cols: number;
  children: ReactNode;
  gridResizable?: boolean;
}) {
  const [rowSizes, setRowSizes] = useState(() => Array(rows).fill(150));
  const [colSizes, setColSizes] = useState(() => Array(cols).fill(150));

  const containerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Record<string, HTMLDivElement>>({});

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const totalWidth = container.offsetWidth;
    const totalHeight = container.offsetHeight;

    setColSizes(Array(cols).fill(totalWidth / cols));
    setRowSizes(Array(rows).fill(totalHeight / rows));
  }, [rows, cols]);

  const register = (row: number, col: number, ref: HTMLDivElement) => {
    panelRefs.current[`${row},${col}`] = ref;
  };

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

  const updateSize = (
    row: number,
    col: number,
    deltaX: number,
    deltaY: number
  ) => {
    console.log(
      `🧠 Resizing row ${row}, col ${col}, Δx=${deltaX}px Δy=${deltaY}px`
    );

    setColSizes((prev) => {
      const left = prev[col];
      const right = prev[col + 1];
      if (left == null || right == null) return prev;
      const [nextLeft, nextRight] = clampPair(left, right, deltaX);
      return [
        ...prev.slice(0, col),
        nextLeft,
        nextRight,
        ...prev.slice(col + 2),
      ];
    });

    setRowSizes((prev) => {
      const top = prev[row];
      const bottom = prev[row + 1];
      if (top == null || bottom == null) return prev;
      const [nextTop, nextBottom] = clampPair(top, bottom, deltaY);
      return [
        ...prev.slice(0, row),
        nextTop,
        nextBottom,
        ...prev.slice(row + 2),
      ];
    });
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
      }}
    >
      <div
        ref={containerRef}
        className="w-full h-full grid gap-0"
        style={{
          gridTemplateRows: rowSizes.map((r) => `${r}px`).join(" "),
          gridTemplateColumns: colSizes.map((c) => `${c}px`).join(" "),
        }}
      >
        {children}
      </div>
    </GridContext.Provider>
  );
}

export function GridPanel({
  row,
  col,
  children,
}: {
  row: number;
  col: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { register } = useResizableGrid();

  useEffect(() => {
    if (ref.current) register(row, col, ref.current);
  }, [row, col]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden border border-gray-300"
      style={{
        gridRow: row + 1,
        gridColumn: col + 1,
      }}
    >
      <div className="w-full h-full">{children}</div>
      {/* <CornerResizer row={row} col={col} /> */}
      <CornerResizer row={row} col={col} corner="top-left" />
      <CornerResizer row={row} col={col} corner="top-right" />
      <CornerResizer row={row} col={col} corner="bottom-left" />
      <CornerResizer row={row} col={col} corner="bottom-right" />
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
  //   const { updateSize } = useResizableGrid();
  const { updateSize, gridResizable, rows, cols } = useResizableGrid();

  const isTop = corner.includes("top");
  const isLeft = corner.includes("left");
  const isDiagonalNWSE = corner === "top-left" || corner === "bottom-right";

  const owningRow = isTop ? row - 1 : row;
  const owningCol = isLeft ? col - 1 : col;

  const canResizeRow = owningRow >= 0;
  const canResizeCol = owningCol >= 0;

  const cursorClass = isDiagonalNWSE
    ? "cursor-nwse-resize"
    : "cursor-nesw-resize";

  const positionClass = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  }[corner];

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!canResizeRow && !canResizeCol) return; // no-op corner

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

  const isOuterCorner =
    (corner === "top-left" && row === 0 && col === 0) ||
    (corner === "top-right" && row === 0 && col === cols - 1) ||
    (corner === "bottom-left" && row === rows - 1 && col === 0) ||
    (corner === "bottom-right" && row === rows - 1 && col === cols - 1);

  if (isOuterCorner && !gridResizable) return null;

  return (
    <div
      onMouseDown={onMouseDown}
      className={`absolute w-3 h-3 bg-blue-500 z-10 ${cursorClass} ${positionClass}`}
    />
  );
}

function useResizableGrid() {
  const ctx = useContext(GridContext);
  if (!ctx) throw new Error("Missing ResizableGridProvider");
  return ctx;
}
