import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CalendarProps = {
  selectedDates?: Date[];
  onDateSelect?: (dates: Date[]) => void;
  selectionType?: "single" | "range";
  className?: string;
};

const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

const Calendar: React.FC<CalendarProps> = ({
  selectedDates = [],
  onDateSelect,
  selectionType = "single",
  className,
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [rangeSelection, setRangeSelection] = useState<Date[]>(selectedDates);

  const [activeHandle, setActiveHandle] = useState<"start" | "end" | null>(
    null
  );
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (date: Date) => {
    if (selectionType === "single") {
      setRangeSelection([date]);
      onDateSelect?.([date]);
    } else {
      if (rangeSelection.length === 0 || rangeSelection.length === 2) {
        setRangeSelection([date]);
      } else {
        const next = [rangeSelection[0], date];
        const sorted = [...next].sort((a, b) => a.getTime() - b.getTime());
        setRangeSelection(sorted);
        onDateSelect?.(sorted);
      }
    }
  };

  const getDaysInMonth = (): (number | null)[] => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: (number | null)[] = [];
    for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
    for (let day = 1; day <= daysInMonth; day++) days.push(day);

    return days;
  };

  return (
    <div className={`w-full mx-auto  ${className} `}>
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className={`flex justify-between items-center  `}>
          <button
            onClick={handlePrevMonth}
            className={
              "hover:cursor-pointer hover:text-blue-300 hover:font-bold text-gray-500"
            }
          >
            <ChevronLeft />
          </button>
          <h2>
            {currentMonth.toLocaleString("default", { month: "long" })}{" "}
            {currentMonth.getFullYear()}
          </h2>
          <button
            onClick={handleNextMonth}
            // className={monthButtonClassName || ""}
            className={
              " hover:cursor-pointer hover:text-blue-300 hover:font-bold text-gray-500"
            }
          >
            <ChevronRight />
          </button>
        </div>
        {/* Days of the Week */}
        <div className={`grid grid-cols-7 text-center `}>
          {daysOfWeek.map((day, index) => (
            <div key={index}>{day}</div>
          ))}
        </div>
      </div>

      {/* Days of the Month */}
      <div className="grid grid-cols-7 text-center mt-2 select-none">
        {getDaysInMonth().map((day, index) => {
          const dayDate =
            day != null
              ? new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth(),
                  day
                )
              : null;

          const isSelected = (d?: Date) =>
            d && dayDate && d.toDateString() === dayDate.toDateString();

          const [start, end] = [...rangeSelection].sort(
            (a, b) => a.getTime() - b.getTime()
          );

          const isStart = selectionType === "range" && isSelected(start);
          const isEnd = selectionType === "range" && isSelected(end);

          const previewStart = activeHandle === "start" ? hoverDate : start;
          const previewEnd = activeHandle === "end" ? hoverDate : end;

          const today = new Date();
          const isToday =
            dayDate?.getDate() === today.getDate() &&
            dayDate?.getMonth() === today.getMonth() &&
            dayDate?.getFullYear() === today.getFullYear();

          const isFirstDayOfMonth = dayDate ? dayDate.getDate() === 1 : false;

          const isLastDayOfMonth = dayDate
            ? dayDate.getDate() ===
              new Date(
                dayDate.getFullYear(),
                dayDate.getMonth() + 1,
                0
              ).getDate()
            : false;

          const inPreview =
            selectionType === "range" &&
            activeHandle &&
            hoverDate &&
            rangeSelection.length === 2 &&
            dayDate &&
            dayDate > previewStart! &&
            dayDate < previewEnd!;

          const isPreviewStart = dayDate?.getTime() === previewStart?.getTime();
          const isPreviewEnd = dayDate?.getTime() === previewEnd?.getTime();

          const isMidRange =
            selectionType === "range" &&
            rangeSelection.length === 2 &&
            dayDate &&
            dayDate > start &&
            dayDate < end;

          const isOnlySelected =
            rangeSelection.length === 1 && isSelected(rangeSelection[0]);

          const weekday = dayDate?.getDay();

          const roundedEdge = isPreviewStart
            ? "rounded-l-full"
            : isPreviewEnd
            ? "rounded-r-full"
            : weekday === 0
            ? "rounded-l-full"
            : weekday === 6
            ? "rounded-r-full"
            : "rounded-none";

          const highlightClass = (() => {
            if (!dayDate) return "";

            if (activeHandle && hoverDate) {
              const isPreviewStart =
                dayDate?.getTime() === previewStart?.getTime();
              const isPreviewEnd = dayDate?.getTime() === previewEnd?.getTime();

              if (isToday && inPreview)
                return `opacity-70 font-extrabold z-50 ${roundedEdge}`;

              if (isPreviewStart)
                return "opacity-70 font-bold rounded-full z-50 border";

              if (isPreviewEnd)
                return "opacity-70 font-bold rounded-full z-50 border";

              if (inPreview)
                return `opacity-40 font-medium transition-opacity duration-200 ${roundedEdge}`;
            }

            // Regular selection logic
            if (isMidRange && isFirstDayOfMonth && !activeHandle)
              return "opacity-40 font-bold rounded-l-full z-50";

            if (isMidRange && isLastDayOfMonth && !activeHandle)
              return "opacity-40 font-bold rounded-r-full z-50";

            if (isStart && !activeHandle)
              return "opacity-80 font-extrabold rounded-full z-50 border";

            if (isEnd && !activeHandle)
              return "opacity-80 font-extrabold rounded-full z-50 border";

            if (isMidRange && !activeHandle)
              return `opacity-40 font-bold ${roundedEdge} `;

            if (isOnlySelected && !activeHandle)
              return "opacity-80 font-bold rounded-full ";

            if (isToday && !activeHandle)
              return "border rounded-full font-extrabold z-50";

            return "";
          })();

          return (
            <div
              key={index}
              className={`relative flex items-center justify-center h-10 w-10 
    ${
      isStart &&
      rangeSelection.length > 1 &&
      !isLastDayOfMonth &&
      !activeHandle &&
      "opacity-60 rounded-l-full"
    } 
    ${
      isEnd &&
      !isFirstDayOfMonth &&
      !activeHandle &&
      "opacity-60 rounded-r-full"
    }
  `}
            >
              <button
                key={index}
                disabled={!day}
                className={` flex justify-center  items-center h-10 w-10 transition-colors duration-150 hover:cursor-pointer hover:opacity-60 hover:font-bold  ${highlightClass}`}
                onClick={() =>
                  day &&
                  handleDateClick(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth(),
                      day
                    )
                  )
                }
                onMouseDown={() => {
                  if (
                    selectionType !== "range" ||
                    rangeSelection.length !== 2 ||
                    !dayDate
                  )
                    return;

                  if (isSelected(start)) setActiveHandle("start");
                  else if (isSelected(end)) setActiveHandle("end");
                }}
                onMouseEnter={() => {
                  if (!activeHandle || !dayDate) return;
                  setHoverDate(dayDate);
                }}
                onMouseUp={() => {
                  if (!activeHandle || !hoverDate) return;

                  const next =
                    activeHandle === "start"
                      ? [hoverDate, end]
                      : [start, hoverDate];

                  const sorted = [...next].sort(
                    (a, b) => a.getTime() - b.getTime()
                  );
                  setRangeSelection(sorted);
                  onDateSelect?.(sorted);
                  setActiveHandle(null);
                  setHoverDate(null);
                }}
              >
                {day || ""}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
