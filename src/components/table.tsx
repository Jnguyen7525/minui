// import React, { useMemo, useState } from "react";

// export type SortDirection = "asc" | "desc";

// export type TableColumn<T> = {
//   key: keyof T;
//   label: string;
//   align?: "left" | "right" | "center";
//   className?: string;
//   sortable?: boolean;
//   render?: (value: T[keyof T], row: T) => React.ReactNode;
//   sortFn?: (a: T, b: T) => number;
// };

// type TableProps<T> = {
//   data: T[];
//   columns: TableColumn<T>[];
//   caption?: React.ReactNode;
//   footer?: React.ReactNode;
//   tableClassName?: string;
//   headerClassName?: string;
//   rowClassName?: string;
//   striping?: "row" | "column";
//   sortable?: boolean;
// };

// export function Table<T>({
//   data,
//   columns,
//   caption,
//   footer,
//   tableClassName = "w-full text-sm",
//   headerClassName = "bg-stone-100 border-b border-stone-200 text-left text-sm text-stone-600",
//   rowClassName = "border-b border-stone-200 last:border-0",
//   striping,
//   sortable = false,
// }: TableProps<T>) {
//   const [query, setQuery] = useState("");
//   const [sortDescriptor, setSortDescriptor] = useState<{
//     column: keyof T;
//     direction: SortDirection;
//   } | null>(null);

//   const normalized = (val: unknown) =>
//     String(val ?? "")
//       .toLowerCase()
//       .trim();

//   const filteredData = useMemo(() => {
//     if (!sortable || query.trim() === "") return data;

//     return data.filter((row) =>
//       columns.some((col) =>
//         normalized(row[col.key]).includes(normalized(query))
//       )
//     );
//   }, [data, columns, query, sortable]);

//   const sortedData = useMemo(() => {
//     if (!sortDescriptor) return filteredData;

//     const col = columns.find((c) => c.key === sortDescriptor.column);
//     if (!col) return filteredData;

//     const direction = sortDescriptor.direction === "asc" ? 1 : -1;

//     return [...filteredData].sort((a, b) => {
//       if (col.sortFn) return col.sortFn(a, b) * direction;

//       const valA = a[col.key];
//       const valB = b[col.key];

//       const dateA = Date.parse(String(valA));
//       const dateB = Date.parse(String(valB));

//       const isDateA = !isNaN(dateA);
//       const isDateB = !isNaN(dateB);

//       if (isDateA && isDateB) {
//         return (dateA - dateB) * direction;
//       }

//       return String(valA).localeCompare(String(valB)) * direction;
//     });
//   }, [filteredData, sortDescriptor, columns]);

//   return (
//     <div className="w-full overflow-hidden rounded-lg border border-stone-200">
//       {sortable && (
//         <div className="p-3 border-b border-stone-200">
//           <input
//             type="text"
//             value={query}
//             placeholder="Search..."
//             onChange={(e) => setQuery(e.target.value)}
//             className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-500"
//           />
//         </div>
//       )}

//       <table className={tableClassName}>
//         {caption && (
//           <caption className="text-sm p-2 text-stone-500">{caption}</caption>
//         )}

//         <thead className={headerClassName}>
//           <tr>
//             {columns.map((col) => (
//               <th
//                 key={String(col.key)}
//                 onClick={() => {
//                   if (!sortable || !col.sortable) return;
//                   setSortDescriptor((prev) =>
//                     prev?.column === col.key
//                       ? {
//                           column: col.key,
//                           direction: prev.direction === "asc" ? "desc" : "asc",
//                         }
//                       : { column: col.key, direction: "asc" }
//                   );
//                 }}
//                 className={`px-4 py-2 font-medium ${
//                   col.align === "right"
//                     ? "text-right"
//                     : col.align === "center"
//                     ? "text-center"
//                     : "text-left"
//                 } ${
//                   col.sortable
//                     ? "hover:underline cursor-pointer select-none"
//                     : ""
//                 }`}
//               >
//                 <div className="flex items-center gap-1">
//                   {col.label}
//                   {sortable &&
//                     col.sortable &&
//                     sortDescriptor?.column === col.key && (
//                       <span className="text-xs">
//                         {sortDescriptor.direction === "asc" ? "↑" : "↓"}
//                       </span>
//                     )}
//                 </div>
//               </th>
//             ))}
//           </tr>
//         </thead>

//         <tbody>
//           {sortedData.length === 0 ? (
//             <tr>
//               <td
//                 colSpan={columns.length}
//                 className="px-4 py-6 text-center text-sm text-stone-500"
//               >
//                 No rows to display.
//               </td>
//             </tr>
//           ) : (
//             sortedData.map((row, rowIndex) => (
//               <tr
//                 key={rowIndex}
//                 className={`${rowClassName} ${
//                   striping === "row" && rowIndex % 2 !== 0
//                     ? "bg-stone-50 text-black"
//                     : ""
//                 }`}
//               >
//                 {columns.map((col, colIndex) => (
//                   <td
//                     key={String(col.key)}
//                     className={`px-4 py-3 ${
//                       col.align === "right"
//                         ? "text-right"
//                         : col.align === "center"
//                         ? "text-center"
//                         : "text-left"
//                     } ${col.className || ""} ${
//                       striping === "column" && colIndex % 2 !== 0
//                         ? "bg-stone-50 text-black"
//                         : ""
//                     }`}
//                   >
//                     {col.render
//                       ? col.render(row[col.key], row)
//                       : (row[col.key] as React.ReactNode)}
//                   </td>
//                 ))}
//               </tr>
//             ))
//           )}
//         </tbody>

//         {footer && (
//           <tfoot>
//             <tr>
//               <td
//                 colSpan={columns.length}
//                 className="px-4 py-2 text-sm text-right text-stone-600"
//               >
//                 {footer}
//               </td>
//             </tr>
//           </tfoot>
//         )}
//       </table>
//     </div>
//   );
// }

import React, { useMemo, useState } from "react";

export type SortDirection = "asc" | "desc";

export type TableColumn<T> = {
  key: keyof T;
  label: string;
  align?: "left" | "right" | "center";
  className?: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  sortFn?: (a: T, b: T) => number;
};

type TableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  caption?: React.ReactNode;
  footer?: React.ReactNode;
  tableClassName?: string;
  headerClassName?: string;
  rowClassName?: string;
  strippedClassName?: string;
  striping?: "row" | "column";
  sortable?: boolean;
  selectionMode?: "none" | "single" | "multiple";
  renderSelectionAction?: (selectedRows: T[]) => React.ReactNode;
  rowId?: (row: T) => string | number;
  selectedRowIds?: (string | number)[];
  onSelectionChange?: (ids: (string | number)[]) => void;
};

export function Table<T>({
  data,
  columns,
  caption,
  footer,
  tableClassName = "w-full text-sm",
  headerClassName = "bg-stone-100 border-b border-stone-200 text-left text-sm text-stone-600",
  rowClassName = "border-b border-stone-200 last:border-0",
  strippedClassName,
  striping,
  sortable = false,
  selectionMode = "none",
  renderSelectionAction,
  rowId,
  selectedRowIds,
  onSelectionChange,
}: TableProps<T>) {
  const [query, setQuery] = useState("");
  const isControlled =
    selectedRowIds !== undefined && onSelectionChange !== undefined;

  const [internalIds, setInternalIds] = useState<Set<string | number>>(
    new Set()
  );
  const selectedIds = useMemo(
    () => (isControlled ? new Set(selectedRowIds) : internalIds),
    [selectedRowIds, internalIds, isControlled]
  );
  const updateSelection = (next: Set<string | number>) => {
    isControlled ? onSelectionChange?.([...next]) : setInternalIds(next);
  };

  const [sortDescriptor, setSortDescriptor] = useState<{
    column: keyof T;
    direction: SortDirection;
  } | null>(null);

  const getRowId = rowId ?? ((row: any) => row?.id ?? row);

  const normalized = (val: unknown) =>
    String(val ?? "")
      .toLowerCase()
      .trim();

  const filteredData = useMemo(() => {
    if (!sortable || query.trim() === "") return data;

    return data.filter((row) =>
      columns.some((col) =>
        normalized(row[col.key]).includes(normalized(query))
      )
    );
  }, [data, columns, query, sortable]);

  const sortedData = useMemo(() => {
    if (!sortDescriptor) return filteredData;

    const col = columns.find((c) => c.key === sortDescriptor.column);
    if (!col) return filteredData;

    const direction = sortDescriptor.direction === "asc" ? 1 : -1;

    return [...filteredData].sort((a, b) => {
      if (col.sortFn) return col.sortFn(a, b) * direction;

      const valA = a[col.key];
      const valB = b[col.key];

      const dateA = Date.parse(String(valA));
      const dateB = Date.parse(String(valB));

      if (!isNaN(dateA) && !isNaN(dateB)) return (dateA - dateB) * direction;

      return String(valA).localeCompare(String(valB)) * direction;
    });
  }, [filteredData, sortDescriptor, columns]);

  const toggleRow = (row: T) => {
    const id = getRowId(row);
    if (selectionMode === "single") {
      updateSelection(new Set([id]));
    } else if (selectionMode === "multiple") {
      const next = new Set(selectedIds);
      next.has(id) ? next.delete(id) : next.add(id);
      updateSelection(next);
    }
  };

  const isSelected = (row: T) => selectedIds.has(getRowId(row));
  const selectedRows = data.filter((row) => selectedIds.has(getRowId(row)));

  return (
    <div className="w-full overflow-hidden rounded-lg border border-stone-200">
      {sortable && (
        <div className="p-3 border-b border-stone-200">
          <input
            type="text"
            value={query}
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-500"
          />
        </div>
      )}

      <table className={tableClassName}>
        {caption && (
          <caption className="text-sm p-2 text-stone-500">{caption}</caption>
        )}

        <thead className={headerClassName}>
          <tr>
            {selectionMode === "multiple" && (
              <th className="px-4 py-2 w-4 text-center">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    updateSelection(
                      e.target.checked
                        ? new Set(sortedData.map(getRowId))
                        : new Set()
                    )
                  }
                  checked={
                    sortedData.length > 0 &&
                    sortedData.every((row) => selectedIds.has(getRowId(row)))
                  }
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={String(col.key)}
                onClick={() => {
                  if (!sortable || !col.sortable) return;
                  setSortDescriptor((prev) =>
                    prev?.column === col.key
                      ? {
                          column: col.key,
                          direction: prev.direction === "asc" ? "desc" : "asc",
                        }
                      : { column: col.key, direction: "asc" }
                  );
                }}
                className={`px-4 py-2 font-medium ${
                  col.align === "right"
                    ? "text-right"
                    : col.align === "center"
                    ? "text-center"
                    : "text-left"
                } ${
                  col.sortable
                    ? "hover:underline cursor-pointer select-none"
                    : ""
                }`}
              >
                <div className="flex items-center gap-1">
                  {col.label}
                  {sortable &&
                    col.sortable &&
                    sortDescriptor?.column === col.key && (
                      <span className="text-xs">
                        {sortDescriptor.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={
                  columns.length + (selectionMode === "multiple" ? 1 : 0)
                }
                className="px-4 py-6 text-center text-sm text-stone-500"
              >
                No rows to display.
              </td>
            </tr>
          ) : (
            sortedData.map((row, rowIndex) => {
              const selected = isSelected(row);
              return (
                <tr
                  key={getRowId(row)}
                  onClick={() =>
                    selectionMode !== "none" ? toggleRow(row) : undefined
                  }
                  className={`${rowClassName} ${
                    selectionMode !== "none" ? "cursor-pointer" : ""
                  } ${
                    selected
                      ? "bg-stone-200/40"
                      : striping === "row" && rowIndex % 2 !== 0
                      ? `${strippedClassName}`
                      : ""
                  }`}
                >
                  {selectionMode === "multiple" && (
                    <td className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleRow(row);
                        }}
                      />
                    </td>
                  )}
                  {columns.map((col, colIndex) => (
                    <td
                      key={String(col.key)}
                      className={`px-4 py-3 ${
                        col.align === "right"
                          ? "text-right"
                          : col.align === "center"
                          ? "text-center"
                          : "text-left"
                      } ${col.className || ""} ${
                        striping === "column" && colIndex % 2 !== 0
                          ? `${strippedClassName}`
                          : ""
                      }`}
                    >
                      {col.render
                        ? col.render(row[col.key], row)
                        : (row[col.key] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>

        {footer && (
          <tfoot>
            <tr>
              <td
                colSpan={
                  columns.length + (selectionMode === "multiple" ? 1 : 0)
                }
                className="px-4 py-2 text-sm text-right text-stone-600"
              >
                {footer}
              </td>
            </tr>
          </tfoot>
        )}
      </table>

      {selectionMode !== "none" &&
        selectedRows.length > 0 &&
        renderSelectionAction?.(selectedRows)}
    </div>
  );
}
