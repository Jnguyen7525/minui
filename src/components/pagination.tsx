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

  className?: string;

  visiblePages?: number; // Number of pages to show on either side of the current page
};

export default function Pagination({
  current,
  total,
  onPageChange,
  renderPrev,
  renderNext,
  renderPage,
  renderFirst,
  renderLast,
  className = "",
  visiblePages = 1, // Default fallback
}: PaginationProps) {
  const range = getVisiblePages(current, total, visiblePages);

  const getClass = (isActive: boolean, isDisabled: boolean) => {
    if (isDisabled)
      return `inline-grid place-items-center text-sm  rounded-md px-3 py-2 font-medium transition-all duration-150 ease-in border select-none opacity-40 pointer-events-none ${className}`;
    if (isActive)
      return `inline-grid place-items-center text-sm  rounded-md px-3 py-2 font-medium transition-all duration-150 ease-in border select-none hover:opacity-60 hover:cursor-pointer shadow ${className}`;
    return `inline-grid place-items-center text-sm  rounded-md px-3 py-2 font-medium transition-all duration-150 ease-in select-none hover:border hover:cursor-pointer opacity-90 ${className}`;
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
          <span key={`ellipsis-${idx}`} className={`select-none`}>
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
