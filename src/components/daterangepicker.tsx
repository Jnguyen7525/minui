// import React, { useState } from "react";
// import { Calendar as CalendarIcon } from "lucide-react";
// import Calendar from "./calendar"; // Import your custom calendar
// import DateInput from "./dateinput"; // Import our DateInput component

// type DateRangePickerProps = {
//   label?: string;
//   labelStyle?: string;
//   className?: string;
//   calendarStyles?: Record<string, string>; // Custom styles for calendar
//   onChange?: (range: { startDate: string; endDate: string }) => void;
// };

// const variantStyles = {
//   flat: "border-none rounded-md ",
//   bordered: "border rounded-md ",
//   underlined: "border-b",
//   faded: "border opacity-50 bg-white text-black border-gray-300",
// };

// const DateRangePicker: React.FC<DateRangePickerProps> = ({
//   label = "Select Date Range",
//   labelStyle,
//   className = "",
//   calendarStyles = {},
//   onChange,
// }) => {
//   const [startDate, setStartDate] = useState<string>("");
//   const [endDate, setEndDate] = useState<string>("");
//   const [showCalendar, setShowCalendar] = useState(false);

//   const handleDateSelect = (date: Date) => {
//     if (!startDate || (startDate && endDate)) {
//       setStartDate(date.toISOString().split("T")[0]);
//       setEndDate(""); // Reset end date when picking a new range
//     } else {
//       setEndDate(date.toISOString().split("T")[0]);
//       setShowCalendar(false); // Hide calendar after picking range
//     }
//     onChange?.({ startDate, endDate });
//   };

//   return (
//     <div className={`flex flex-col gap-2 relative ${className}`}>
//       <label className="text-gray-500 font-semibold">{label}</label>
//       <div className="flex items-center gap-2">
//         {/* Start Date Input */}
//         <DateInput
//           label="Start Date"
//           value={startDate}
//           onChange={setStartDate}
//           //   variant="bordered"
//           className={className}
//         />

//         {/* End Date Input */}
//         <DateInput
//           label="End Date"
//           value={endDate}
//           onChange={setEndDate}
//           //   variant="bordered"
//           className={className}
//         />

//         {/* Calendar Icon to Open Popover */}
//         <CalendarIcon
//           className="size-6 cursor-pointer text-gray-500 hover:text-gray-700"
//           onClick={() => setShowCalendar(!showCalendar)}
//         />
//       </div>

//       {/* Calendar Popover */}
//       {showCalendar && (
//         <div className="absolute z-50 mt-2 bg-white shadow-md rounded-md p-2">
//           <Calendar
//             selectedDate={startDate ? new Date(startDate) : new Date()}
//             onDateSelect={handleDateSelect}
//             classNames={calendarStyles} // Pass styling down
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default DateRangePicker;

// import React, { useState } from "react";
// import { CalendarIcon } from "lucide-react";
// import Calendar from "./calendar"; // Import the custom calendar component

// type DateRangePickerProps = {
//   label?: string;
//   labelStyle?: string;
//   className?: string;
//   calendarStyles?: Record<string, string>; // Custom styles for calendar
//   onChange?: (range: { startDate: string; endDate: string }) => void;
// };

// const DateRangePicker: React.FC<DateRangePickerProps> = ({
//   label = "Select Date Range",
//   labelStyle,
//   className = "",
//   calendarStyles = {},
//   onChange,
// }) => {
//   const [selectedDates, setSelectedDates] = useState<Date[]>([]);
//   const [showCalendar, setShowCalendar] = useState(false);

//   const handleDateSelect = (dates: Date[]) => {
//     if (dates.length === 2) {
//       setShowCalendar(false); // Hide the calendar after picking both dates
//     }
//     setSelectedDates(dates);
//     onChange?.({
//       startDate: dates[0].toISOString().split("T")[0],
//       endDate: dates[1]?.toISOString().split("T")[0],
//     });
//   };

//   return (
//     <div className={`flex flex-col gap-2 relative ${className}`}>
//       <label className={` ${labelStyle}`}>{label}</label>

//       {/* Single Input Box with Two Dates Inside */}
//       <div
//         className={`flex items-center justify-between p-2 border rounded-md bg-gray-700 text-white cursor-pointer`}
//         onClick={() => setShowCalendar(!showCalendar)}
//       >
//         <span>
//           {selectedDates.length === 2
//             ? `${selectedDates[0].toISOString().split("T")[0]} - ${
//                 selectedDates[1].toISOString().split("T")[0]
//               }`
//             : "Select date range"}
//         </span>
//         <CalendarIcon className="size-6 text-gray-500 hover:text-gray-700" />
//       </div>

//       {/* Calendar Popover */}
//       {showCalendar && (
//         <div className="absolute z-50 mt-2 bg-white shadow-md rounded-md p-2">
//           <Calendar
//             selectedDates={selectedDates}
//             onDateSelect={handleDateSelect} // Updates & hides calendar once range is picked
//             selectionType="range"
//             classNames={calendarStyles}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default DateRangePicker;

import React, { useState } from "react";
import { CalendarIcon } from "lucide-react";
import Calendar from "./calendar"; // Import the custom calendar component

type DateRangePickerProps = {
  label?: string;
  labelStyle?: string;
  className?: string;
  variant?: "flat" | "bordered" | "underlined" | "faded";
  calendarStyles?: Record<string, string>; // Custom styles for calendar
  onChange?: (range: { startDate: string; endDate: string }) => void;
};

const variantStyles = {
  flat: "border-none rounded-md ",
  bordered: "border rounded-md ",
  underlined: "border-b",
  faded: "border opacity-50",
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  label = "Select Date Range",
  labelStyle,
  className = "",
  variant = "bordered",
  calendarStyles = {},
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
      <label className={` ${labelStyle}`}>{label}</label>

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
        <div className="absolute z-50 top-10 ">
          <Calendar
            selectedDates={selectedDates}
            onDateSelect={handleDateSelect} // Updates & hides calendar once range is picked
            selectionType="range"
            classNames={calendarStyles}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
