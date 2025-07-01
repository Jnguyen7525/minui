// import React, { useState } from "react";
// import { Clock } from "lucide-react";

// type TimeInputProps = {
//   label?: string;
//   labelStyle?: string;
//   value?: string;
//   onChange?: (value: string) => void;
//   placeholder?: string;
//   variant?: "flat" | "bordered" | "underlined" | "faded";
//   className?: string;
//   hourFormat?: 12 | 24;
// };

// const variantStyles = {
//   flat: "border-none rounded-md",
//   bordered: "border rounded-md",
//   underlined: "border-b",
//   faded: "border opacity-50",
// };

// const TimeInput: React.FC<TimeInputProps> = ({
//   label,
//   labelStyle,
//   value,
//   onChange,
//   placeholder = "-- : --",
//   variant = "bordered",
//   className = "",
//   hourFormat = 12,
// }) => {
//   const [internalValue, setInternalValue] = useState(value || "");
//   const [meridian, setMeridian] = useState<"AM" | "PM">("AM");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     let raw = e.target.value.replace(/[^0-9:]/g, "").slice(0, 5);
//     let [h, m] = raw.split(":");

//     if (h && Number(h) > (hourFormat === 12 ? 12 : 23)) return;
//     if (m && Number(m) > 59) return;

//     if (h?.length === 2 && raw.length === 2) raw += ":";

//     setInternalValue(raw);
//     onChange?.(hourFormat === 12 ? `${raw} ${meridian}` : raw);
//   };

//   return (
//     <div className="flex flex-col gap-2 w-full">
//       {label && <label className={labelStyle}>{label}</label>}
//       <div className={`relative flex items-center ${variantStyles[variant]}`}>
//         <div className="flex items-center justify-center">
//           <Clock className="mx-2 text-gray-500 size-5" strokeWidth={1.5} />
//           <input
//             type="text"
//             inputMode="numeric"
//             placeholder={placeholder}
//             value={onChange ? value : internalValue}
//             onChange={handleChange}
//             className={`p-2 w-[60px] outline-none  ${className}`}
//             autoComplete="off"
//           />
//           {hourFormat === 12 && (
//             <button
//               type="button"
//               onClick={() => setMeridian(meridian === "AM" ? "PM" : "AM")}
//               className=" text-sm  rounded  shadow-sm hover:text-blue-600 hover:cursor-pointer "
//             >
//               {meridian}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TimeInput;

import React, { useState } from "react";
import { Clock } from "lucide-react";

type TimeInputProps = {
  label?: string;
  labelStyle?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  variant?: "flat" | "bordered" | "underlined" | "faded";
  className?: string;
  hourFormat?: 12 | 24;
};

const variantStyles = {
  flat: "border-none rounded-md",
  bordered: "border rounded-md",
  underlined: "border-b",
  faded: "border opacity-50",
};

const TimeInput: React.FC<TimeInputProps> = ({
  label,
  labelStyle,
  value,
  onChange,
  placeholder = "--:--",
  variant = "bordered",
  className = "",
  hourFormat = 12,
}) => {
  const [internalValue, setInternalValue] = useState("--:--");
  const [meridian, setMeridian] = useState<"AM" | "PM">("AM");

  const isControlled = onChange !== undefined;
  const displayedValue = isControlled
    ? value?.split(" ")[0] || "--:--"
    : internalValue;

  const formatTime = (digits: string): string => {
    if (digits.length === 0) return "--:--";
    if (digits.length === 1) return `${digits}-:--`;
    if (digits.length === 2) return `${digits}:--`;
    if (digits.length === 3) return `${digits.slice(0, 2)}:${digits.slice(2)}-`;
    if (digits.length === 4)
      return `${digits.slice(0, 2)}:${digits.slice(2, 4)}`;
    return "--:--";
  };

  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const rawDigits = e.target.value.replace(/[^0-9]/g, "").slice(0, 4);
  //     const formatted = formatTime(rawDigits);

  //     const [hh, mm] = formatted.split(":");
  //     const h = parseInt(hh.replace("-", "") || "0", 10);
  //     const m = parseInt(mm.replace("-", "") || "0", 10);
  //     const maxHour = hourFormat === 12 ? 12 : 23;

  //     if (h > maxHour || m > 59) return;

  //     if (!isControlled) setInternalValue(formatted);
  //     onChange?.(hourFormat === 12 ? `${formatted} ${meridian}` : formatted);
  //   };

  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const input = e.target;
  //     const cursor = input.selectionStart || 0;
  //     const rawDigits = input.value.replace(/[^0-9]/g, "").slice(0, 4);
  //     const formatted = formatTime(rawDigits);

  //     const [hh, mm] = formatted.split(":");
  //     const h = parseInt(hh.replace("-", "") || "0", 10);
  //     const m = parseInt(mm.replace("-", "") || "0", 10);
  //     const maxHour = hourFormat === 12 ? 12 : 23;
  //     if (h > maxHour || m > 59) return;

  //     if (!isControlled) setInternalValue(formatted);
  //     onChange?.(hourFormat === 12 ? `${formatted} ${meridian}` : formatted);

  //     // 🧠 Restore cursor after DOM update
  //     setTimeout(() => {
  //       input.setSelectionRange(cursor, cursor);
  //     }, 0);
  //   };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const cursor = input.selectionStart ?? 0;
    const rawInput = input.value.replace(/[^0-9]/g, "").slice(0, 4);
    const formatted = formatTime(rawInput); // "--:--" format

    const [hh, mm] = formatted.split(":");
    const h = parseInt(hh.replace("-", "") || "0");
    const m = parseInt(mm.replace("-", "") || "0");
    const maxHour = hourFormat === 12 ? 12 : 23;

    if (h > maxHour || m > 59) return;

    if (!isControlled) setInternalValue(formatted);
    onChange?.(hourFormat === 12 ? `${formatted} ${meridian}` : formatted);

    // 🧠 Now re-calculate precise caret shift
    setTimeout(() => {
      const isColonJump =
        cursor === 2 &&
        input.value[cursor] === ":" &&
        formatted.length > input.value.length;

      const nextCursor = isColonJump ? cursor + 1 : cursor;
      input.setSelectionRange(nextCursor, nextCursor);
    }, 100);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className={labelStyle}>{label}</label>}
      <div
        className={`relative flex items-center px-2 w-fit ${variantStyles[variant]}`}
      >
        <Clock className="text-gray-500 size-5 mr-2" strokeWidth={1.5} />
        <input
          type="text"
          inputMode="numeric"
          placeholder={placeholder}
          value={displayedValue}
          onChange={handleChange}
          className={`w-[60px] text-center outline-none bg-transparent ${className}`}
          autoComplete="off"
        />
        {hourFormat === 12 && (
          <button
            type="button"
            onClick={() => {
              const next = meridian === "AM" ? "PM" : "AM";
              setMeridian(next);
              if (onChange) {
                onChange(`${displayedValue} ${next}`);
              }
            }}
            className="ml-2 px-1.5 py-0.5 text-sm rounded text-gray-700 hover:text-blue-600"
          >
            {meridian}
          </button>
        )}
      </div>
    </div>
  );
};

export default TimeInput;
