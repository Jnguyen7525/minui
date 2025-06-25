import {
  createContext,
  useContext,
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  type ReactNode,
} from "react";

type GridPosition = { row: number; col: number };

interface GridContextType {
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
}

const GridContext = createContext<GridContextType | null>(null);

export function ResizableGridProvider({
  rows,
  cols,
  children,
}: {
  rows: number;
  cols: number;
  children: ReactNode;
}) {
  const [rowSizes, setRowSizes] = useState<number[]>(
    Array(rows).fill(100 / rows)
  );
  const [colSizes, setColSizes] = useState<number[]>(
    Array(cols).fill(100 / cols)
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Record<string, HTMLDivElement>>({});

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
    const containerW = containerRef.current?.offsetWidth ?? 1;
    const containerH = containerRef.current?.offsetHeight ?? 1;

    console.log("🔥 Starting updateSize()");
    console.log(`🧠 Resizing at row: ${row}, col: ${col}`);
    console.log(`📐 Raw deltaX: ${deltaX}px, deltaY: ${deltaY}px`);

    setColSizes((prev) => {
      const left = prev[col];
      const right = prev[col + 1];
      if (left == null || right == null) return prev;

      const totalPercent = left + right; // should usually be close to 100
      const availableW = (totalPercent / 100) * containerW;

      const deltaPercentX = (deltaX / availableW) * totalPercent;
      //   const deltaPercentX = (deltaX / containerW) * 100;
      const [nextLeft, nextRight] = clampPair(left, right, deltaPercentX);

      console.log("📊 Columns before:", left.toFixed(2), right.toFixed(2));
      console.log(
        "➡️ Columns after:",
        nextLeft.toFixed(2),
        nextRight.toFixed(2)
      );
      console.log("🔢 Column delta %:", deltaPercentX.toFixed(2));

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

      const availableH = ((top + bottom) / 100) * containerH;
      const deltaPercentY = (deltaY / availableH) * (top + bottom);
      //   const deltaPercentY = (deltaY / containerH) * 100;
      const [nextTop, nextBottom] = clampPair(top, bottom, deltaPercentY);

      console.log("📊 Rows before:", top.toFixed(2), bottom.toFixed(2));
      console.log("➡️ Rows after:", nextTop.toFixed(2), nextBottom.toFixed(2));
      console.log("🔢 Row delta %:", deltaPercentY.toFixed(2));

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
      value={{ rowSizes, colSizes, updateSize, containerRef, register }}
    >
      <div
        ref={containerRef}
        className="w-full h-full grid gap-0 "
        style={{
          gridTemplateRows: rowSizes.map((r) => `${r}%`).join(" "),
          gridTemplateColumns: colSizes.map((c) => `${c}%`).join(" "),
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
      <div className="h-full w-full">{children}</div>
      <CornerResizer row={row} col={col} />
    </div>
  );
}

function CornerResizer({ row, col }: { row: number; col: number }) {
  const { updateSize } = useResizableGrid();

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;

    const onMouseMove = (ev: MouseEvent) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      console.log(`mouse move dx: ${dx}`);
      console.log(`mouse move dy: ${dy}`);
      updateSize(row, col, dx, dy);
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
      className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 z-10 cursor-nwse-resize"
    />
  );
}

function useResizableGrid() {
  const ctx = useContext(GridContext);
  if (!ctx) throw new Error("Missing ResizableGridProvider");
  return ctx;
}
