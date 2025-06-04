// import React, { useState } from "react";

// type DateInputProps = {
//   label?: string;
//   labelStyle?: string;
//   value?: string;
//   onChange?: (date: string) => void;
//   placeholder?: string;
//   variant?: "flat" | "bordered" | "underlined" | "faded";
//   className?: string;
// };

// const variantStyles = {
//   flat: "border-none rounded-md ",
//   bordered: "border rounded-md ",
//   underlined: "border-b",
//   faded: "border opacity-50 bg-white text-black border-gray-300",
// };

// const DateInput: React.FC<DateInputProps> = ({
//   label,
//   labelStyle,
//   value,
//   onChange,
//   placeholder = "YYYY-MM-DD",
//   variant = "bordered",
//   className = "",
// }) => {
//   const [internalValue, setInternalValue] = useState(value || "");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInternalValue(e.target.value);
//     onChange?.(e.target.value);
//   };

//   return (
//     <div className={`flex flex-col gap-2 w-full relative`}>
//       {label && (
//         <label className={` ${labelStyle}`}>{label}</label>
//       )}
//       <input
//         type="date"
//         value={onChange ? value : internalValue}
//         onChange={handleChange}
//         className={`p-2 w-full outline-none ${className} ${variantStyles[variant]}`}
//         placeholder={placeholder}
//       />
//     </div>
//   );
// };

// export default DateInput;

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
  calendarStyles?: Record<string, string>; // New prop for calendar styling
};

const variantStyles = {
  flat: "border-none rounded-md ",
  bordered: "border rounded-md ",
  underlined: "border-b",
  faded: "border opacity-50 bg-white text-black border-gray-300",
};

const DateInput: React.FC<DateInputProps> = ({
  label,
  labelStyle,
  value,
  onChange,
  placeholder = "YYYY-MM-DD",
  variant = "bordered",
  className = "",
  calendarStyles = {}, // Default empty object
}) => {
  const [internalValue, setInternalValue] = useState(value || "");
  const [showCalendar, setShowCalendar] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div className={`flex flex-col gap-2 w-full relative`}>
      {label && <label className={` ${labelStyle}`}>{label}</label>}
      <div className="relative flex items-center">
        <input
          type="text"
          value={onChange ? value : internalValue}
          onChange={handleChange}
          className={`p-2 w-full outline-none ${className} ${variantStyles[variant]}`}
          placeholder={placeholder}
          readOnly // Prevent manual typing for better UI
        />
        <CalendarIcon
          className="size-5 ml-2 cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={() => setShowCalendar(!showCalendar)}
        />
      </div>

      {showCalendar && (
        <div className="absolute z-50 top-10 ">
          <Calendar
            selectedDate={new Date(internalValue)}
            onDateSelect={(date) => {
              setInternalValue(date.toISOString().split("T")[0]);
              onChange?.(date.toISOString().split("T")[0]);
              setShowCalendar(false);
            }}
            classNames={calendarStyles} // Pass the styles down!
          />
        </div>
      )}
    </div>
  );
};

export default DateInput;
