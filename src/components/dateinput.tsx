import React, { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import Calendar from "./calendar"; // Import the custom calendar component

type DateInputProps = {
  label?: string;
  labelStyle?: string;
  value?: string;
  onChange?: (date: string) => void;
  placeholder?: string;
  variant?: "flat" | "bordered" | "underlined" | "faded";
  className?: string;
  calendarContainerClassName?: string;
  calendarHeaderClassName?: string;
  calendarMonthButtonClassName?: string;
  calendarSelectedDateClassName?: string;
  calendarDateInRangeClassName?: string;
  calendarDayDisabledClassName?: string;
  calendarDayClassName?: string;
};

const variantStyles = {
  flat: "border-none rounded-md ",
  bordered: "border rounded-md ",
  underlined: "border-b",
  faded: "border opacity-50",
};

const DateInput: React.FC<DateInputProps> = ({
  label,
  labelStyle,
  value,
  onChange,
  placeholder = "YYYY-MM-DD",
  variant = "bordered",
  className = "",
  // calendarStyles = {}, // Default empty object
  calendarContainerClassName,
  calendarHeaderClassName,
  calendarMonthButtonClassName,
  calendarSelectedDateClassName,
  calendarDateInRangeClassName,
  calendarDayDisabledClassName,
  calendarDayClassName,
}) => {
  const [internalValue, setInternalValue] = useState(value || "");
  const [showCalendar, setShowCalendar] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(/[^0-9-]/g, ""); // Remove invalid characters

    // ✅ Handle backspace properly by allowing full deletion of characters
    if (
      e.nativeEvent instanceof InputEvent &&
      e.nativeEvent.inputType === "deleteContentBackward"
    ) {
      setInternalValue(inputValue); // Allow normal deletion
      onChange?.(inputValue);
      return;
    }

    // ✅ Auto-format input into YYYY-MM-DD while typing
    if (inputValue.length === 4) inputValue += "-";
    if (inputValue.length === 7) inputValue += "-";

    if (inputValue.length > 10) return; // Prevent overtyping

    setInternalValue(inputValue); // ✅ Update local input state
    onChange?.(inputValue); // ✅ Pass raw input to parent state in controlled mode
  };

  return (
    <div className={`flex flex-col gap-2 w-full relative`}>
      {label && <label className={` ${labelStyle}`}>{label}</label>}
      <div className="relative flex items-center">
        <input
          type="text" // Keep it text to prevent browser picker
          value={onChange ? value : internalValue}
          onChange={handleChange}
          className={`p-2 w-full outline-none ${className} ${variantStyles[variant]}`}
          placeholder={placeholder}
          autoComplete="off"
          pattern="\d{4}-\d{2}-\d{2}" // Ensure only valid date format
          inputMode="numeric" // Ensures a numeric keyboard appears on mobile
          style={{ WebkitAppearance: "none" }} // ✅ Hide native browser picker
        />

        <CalendarIcon
          className="size-5 ml-2 cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={() => setShowCalendar(!showCalendar)}
        />
      </div>

      {showCalendar && (
        <div className="absolute z-50 top-10 ">
          <Calendar
            selectedDates={internalValue ? [new Date(internalValue)] : []}
            onDateSelect={(dates) => {
              setInternalValue(dates[0].toISOString().split("T")[0]); // Ensure single selection
              onChange?.(dates[0].toISOString().split("T")[0]);
              setShowCalendar(false);
            }}
            selectionType="single" // Ensure single-date selection
            containerClassName={calendarContainerClassName}
            monthButtonClassName={calendarMonthButtonClassName}
            headerClassName={calendarHeaderClassName}
            selectedDateClassName={calendarSelectedDateClassName}
            dateInRangeClassName={calendarDateInRangeClassName}
            dayClassName={calendarDayClassName}
            dayDisabledClassName={calendarDayDisabledClassName}
          />
        </div>
      )}
    </div>
  );
};

export default DateInput;
