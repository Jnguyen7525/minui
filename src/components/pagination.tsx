// type PaginationProps = {
//   current: number;
//   total: number;
//   onPageChange: (page: number) => void;

//   renderPrev?: (disabled: boolean) => React.ReactNode;
//   renderNext?: (disabled: boolean) => React.ReactNode;
//   renderPage?: (page: number, isActive: boolean) => React.ReactNode;

//   pageClassName?: string;
//   activePageClassName?: string;
//   disabledPageClassName?: string;
//   baseButtonClasses?: string;
// };

// export function Pagination({
//   current,
//   total,
//   onPageChange,
//   renderPrev,
//   renderNext,
//   renderPage,
//   pageClassName = "bg-transparent text-stone-800 border-transparent hover:bg-stone-800/5 hover:border-stone-800/5",
//   activePageClassName = "bg-stone-800 text-stone-50 border-stone-800 hover:bg-stone-700 hover:border-stone-700 shadow-sm hover:shadow-md",
//   disabledPageClassName = "opacity-50 cursor-not-allowed",
//   baseButtonClasses = "inline-grid place-items-center text-sm min-w-[38px] min-h-[38px] rounded-md px-3 py-2 font-medium transition-all duration-200 ease-in border select-none",
// }: PaginationProps) {
//   const pages = Array.from({ length: total }, (_, i) => i + 1);

//   const getClass = (isActive: boolean, isDisabled: boolean) => {
//     if (isDisabled) return `${baseButtonClasses} ${disabledPageClassName}`;
//     if (isActive) return `${baseButtonClasses} ${activePageClassName}`;
//     return `${baseButtonClasses} ${pageClassName}`;
//   };

//   return (
//     <nav className="flex items-center gap-1" aria-label="Pagination">
//       <button
//         onClick={() => onPageChange(current - 1)}
//         disabled={current === 1}
//         className={getClass(false, current === 1)}
//       >
//         {renderPrev ? renderPrev(current === 1) : "Previous"}
//       </button>

//       {pages.map((page) => {
//         const isActive = page === current;
//         return (
//           <button
//             key={page}
//             onClick={() => onPageChange(page)}
//             className={getClass(isActive, false)}
//           >
//             {renderPage ? renderPage(page, isActive) : page}
//           </button>
//         );
//       })}

//       <button
//         onClick={() => onPageChange(current + 1)}
//         disabled={current === total}
//         className={getClass(false, current === total)}
//       >
//         {renderNext ? renderNext(current === total) : "Next"}
//       </button>
//     </nav>
//   );
// }

import { type ReactNode } from "react";

type PaginationProps = {
  current: number;
  total: number;
  onPageChange: (page: number) => void;

  renderPrev?: (disabled: boolean) => ReactNode;
  renderNext?: (disabled: boolean) => ReactNode;
  renderPage?: (page: number, isActive: boolean) => ReactNode;
  renderFirst?: (disabled: boolean) => ReactNode;
  renderLast?: (disabled: boolean) => ReactNode;

  pageClassName?: string;
  activePageClassName?: string;
  disabledPageClassName?: string;
  baseButtonClasses?: string;

  visiblePages?: number; // Number of pages to show on either side of the current page
};

export function Pagination({
  current,
  total,
  onPageChange,
  renderPrev,
  renderNext,
  renderPage,
  renderFirst,
  renderLast,
  pageClassName = "text-stone-800 border-transparent hover:bg-stone-800/5 hover:border-stone-800/5",
  activePageClassName = "bg-stone-800 text-white border-stone-800 hover:bg-stone-700 hover:border-stone-700 shadow",
  disabledPageClassName = "opacity-40 pointer-events-none",
  baseButtonClasses = "inline-grid place-items-center text-sm min-w-[38px] min-h-[38px] rounded-md px-3 py-2 font-medium transition-all duration-150 ease-in border select-none",
  visiblePages = 1, // Default fallback
}: PaginationProps) {
  const range = getVisiblePages(current, total, visiblePages);

  const getClass = (isActive: boolean, isDisabled: boolean) => {
    if (isDisabled) return `${baseButtonClasses} ${disabledPageClassName}`;
    if (isActive) return `${baseButtonClasses} ${activePageClassName}`;
    return `${baseButtonClasses} ${pageClassName}`;
  };

  const renderBtn = (page: number, isActive: boolean, isDisabled = false) => (
    <button
      key={page}
      disabled={isDisabled}
      onClick={() => onPageChange(page)}
      className={getClass(isActive, isDisabled)}
    >
      {renderPage ? renderPage(page, isActive) : page}
    </button>
  );

  return (
    <nav className="flex items-center gap-1" aria-label="Pagination">
      {renderFirst && (
        <button
          onClick={() => onPageChange(1)}
          disabled={current === 1}
          className={getClass(false, current === 1)}
        >
          {renderFirst(current === 1)}
        </button>
      )}

      <button
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
        className={getClass(false, current === 1)}
      >
        {renderPrev ? renderPrev(current === 1) : "Previous"}
      </button>

      {range.map((p, idx) =>
        p === "..." ? (
          <span
            key={`ellipsis-${idx}`}
            className={`${baseButtonClasses} text-stone-400 select-none`}
          >
            …
          </span>
        ) : (
          renderBtn(p, current === p)
        )
      )}

      <button
        onClick={() => onPageChange(current + 1)}
        disabled={current === total}
        className={getClass(false, current === total)}
      >
        {renderNext ? renderNext(current === total) : "Next"}
      </button>

      {renderLast && (
        <button
          onClick={() => onPageChange(total)}
          disabled={current === total}
          className={getClass(false, current === total)}
        >
          {renderLast(current === total)}
        </button>
      )}
    </nav>
  );
}

// 📏 Ellipsis range calculator
function getVisiblePages(
  current: number,
  total: number,
  visible: number = 1
): (number | "...")[] {
  const range: (number | "...")[] = [];

  const left = Math.max(2, current - visible);
  const right = Math.min(total - 1, current + visible);

  if (left > 2) range.push(1, "...");
  else for (let i = 1; i < left; i++) range.push(i);

  for (let i = left; i <= right; i++) range.push(i);

  if (right < total - 1) range.push("...", total);
  else for (let i = right + 1; i <= total; i++) range.push(i);

  return range;
}
