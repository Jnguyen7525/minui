import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CalendarProps = {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  className?: string;
  classNames?: {
    container?: string;
    header?: string;
    title?: string;
    button?: string;
    daysOfWeek?: string;
    day?: string;
    daySelected?: string;
    dayToday?: string;
    dayDisabled?: string;
  };
};

const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateSelect,
  className = "",
  classNames = {},
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const handlePrevMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  const getDaysInMonth = (): (number | null)[] => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: (number | null)[] = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null); // Empty spaces for alignment
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  return (
    <div
      className={`w-full mx-auto ${className} ${classNames.container || ""}`}
    >
      {/* Header */}
      <div
        className={`flex flex-col items-center mb-4 ${classNames.header || ""}`}
      >
        <div
          className={`flex w-full justify-between items-center  ${
            classNames.header || ""
          }`}
        >
          <button
            onClick={handlePrevMonth}
            className={`text-gray-500 hover:text-black ${
              classNames.button || ""
            }`}
          >
            <ChevronLeft />
          </button>
          <h2 className={`text-lg font-semibold ${classNames.title || ""}`}>
            {currentMonth.toLocaleString("default", { month: "long" })}{" "}
            {currentMonth.getFullYear()}
          </h2>
          <button
            onClick={handleNextMonth}
            className={`text-gray-500 hover:text-black ${
              classNames.button || ""
            }`}
          >
            <ChevronRight />
          </button>
        </div>
        {/* Days of the Week */}
        <div
          className={`grid grid-cols-7 gap-2 text-center ${
            classNames.daysOfWeek || ""
          }`}
        >
          {daysOfWeek.map((day) => (
            <div key={day} className="font-semibold">
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Days of the Month */}
      <div className="grid grid-cols-7 gap-2 text-center mt-2">
        {getDaysInMonth().map((day, index) => (
          <button
            key={index}
            className={`rounded-full flex items-center justify-center ${
              day
                ? `${classNames.day || ""} hover:bg-blue-200 cursor-pointer ${
                    selectedDate?.getDate() === day &&
                    selectedDate.getMonth() === currentMonth.getMonth() &&
                    selectedDate.getFullYear() === currentMonth.getFullYear()
                      ? `${classNames.daySelected || "bg-blue-500 text-white"}`
                      : ""
                  } ${
                    day === new Date().getDate() &&
                    currentMonth.getMonth() === new Date().getMonth() &&
                    currentMonth.getFullYear() === new Date().getFullYear()
                      ? classNames.dayToday || "bg-gray-200"
                      : ""
                  }`
                : classNames.dayDisabled || ""
            }`}
            onClick={() =>
              day &&
              onDateSelect?.(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth(),
                  day
                )
              )
            }
          >
            {day || ""}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
