import React, { useState } from "react";
import { CalendarIcon } from "lucide-react";
import Calendar from "./calendar"; // Import the custom calendar component

type DateRangePickerLabelProps = {
  label?: React.ReactNode;
  className?: string;
};

export const DateRangePickerLabel: React.FC<DateRangePickerLabelProps> = ({
  label,
  className = "",
}) => {
  if (!label) return null;

  return <div className={className}>{label}</div>;
};

type DateRangePickerProps = {
  label?: React.ReactNode;
  className?: string;
  variant?: "flat" | "bordered" | "underlined" | "faded";
  onChange?: (range: { startDate: string; endDate: string }) => void;
};

const variantStyles = {
  flat: "border-none rounded-md ",
  bordered: "border rounded-md ",
  underlined: "border-b",
  faded: "border opacity-50",
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  label,
  className = "",
  variant = "bordered",
  onChange,
}) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleDateSelect = (dates: Date[]) => {
    if (dates.length === 2) {
      setShowCalendar(false); // Hide the calendar after picking both dates
    }
    setSelectedDates(dates);
    const formattedRange = `${dates[0].toISOString().split("T")[0]} - ${
      dates[1]?.toISOString().split("T")[0]
    }`;
    setInputValue(formattedRange);
    onChange?.({
      startDate: dates[0].toISOString().split("T")[0],
      endDate: dates[1]?.toISOString().split("T")[0],
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(/[^0-9- ]/g, ""); // Remove invalid characters

    // ✅ Handle backspace properly by allowing full deletion of characters
    if (
      e.nativeEvent instanceof InputEvent &&
      e.nativeEvent.inputType === "deleteContentBackward"
    ) {
      setInputValue(inputValue); // Allow normal deletion
      return;
    }

    let parts = inputValue.split(" - ");

    // ✅ Prevent more than two date entries
    if (parts.length > 2) return;

    // ✅ Format both date segments correctly
    parts = parts.map((part) => {
      if (part.length === 4) part += "-";
      if (part.length === 7) part += "-";

      // ✅ Cap each date at 10 characters (YYYY-MM-DD)
      return part.slice(0, 10);
    });

    // ✅ Ensure second date starts properly
    if (parts.length === 1 && parts[0].length === 10) {
      parts.push(""); // Prepare second date entry
    }

    inputValue = parts.join(" - ");

    // ✅ Prevent overtyping beyond 23 characters (`YYYY-MM-DD - YYYY-MM-DD`)
    if (inputValue.length > 23) return;

    setInputValue(inputValue);

    // ✅ Validate full range before updating state
    if (/^\d{4}-\d{2}-\d{2} - \d{4}-\d{2}-\d{2}$/.test(inputValue)) {
      const [startDate, endDate] = inputValue.split(" - ");
      setSelectedDates([new Date(startDate), new Date(endDate)]);
      onChange?.({ startDate, endDate });
    }
  };

  return (
    <div className={`flex flex-col w-full gap-2 relative `}>
      {/* <label className={` ${labelStyle}`}>{label}</label> */}
      <DateRangePickerLabel label={label} />

      {/* Single Input Box with Two Dates Inside */}
      <div className="relative flex items-center w-full">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className={`p-2 w-full outline-none ${className} ${variantStyles[variant]}`}
          placeholder="YYYY-MM-DD - YYYY-MM-DD"
          autoComplete="off"
        />
        <CalendarIcon
          className="size-6 ml-2 cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={() => setShowCalendar(!showCalendar)}
        />
      </div>

      {/* Calendar Popover */}
      {showCalendar && (
        <div className="absolute z-50 top-14 ">
          {/* <Calendar
            selectedDates={selectedDates}
            onDateSelect={handleDateSelect} // Updates & hides calendar once range is picked
            selectionType="range"
            containerClassName={calendarContainerClassName}
            monthButtonClassName={calendarMonthButtonClassName}
            headerClassName={calendarHeaderClassName}
            selectedDateClassName={calendarSelectedDateClassName}
            dateInRangeClassName={calendarDateInRangeClassName}
            dayClassName={calendarDayClassName}
            dayDisabledClassName={calendarDayDisabledClassName}
          /> */}
          <Calendar
            selectedDates={selectedDates}
            onDateSelect={handleDateSelect} // Updates & hides calendar once range is picked
            selectionType="range"
            className={`p-3 rounded-lg  ${className}`}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
