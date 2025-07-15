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
  placeholder = "HH:MM",
  variant = "bordered",
  className = "",
  hourFormat = 12,
}) => {
  const [internalValue, setInternalValue] = useState(
    value?.split(" ")[0] || ""
  );
  const [meridian, setMeridian] = useState<"AM" | "PM">("AM");

  const isControlled = typeof onChange === "function";
  const currentValue = isControlled
    ? value?.split(" ")[0] || ""
    : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(/[^0-9:]/g, "");

    // Auto insert colon if user types 3+ digits and there's no colon yet
    if (!inputValue.includes(":") && inputValue.length >= 3) {
      inputValue = inputValue.slice(0, 2) + ":" + inputValue.slice(2);
    }

    // Validate hour/minute ranges
    const [hh = "", mm = ""] = inputValue.split(":");
    const hourLimit = hourFormat === 12 ? 12 : 23;

    if (
      hh.length > 2 ||
      mm.length > 2 ||
      (hh && Number(hh) > hourLimit) ||
      (mm && Number(mm) > 59)
    )
      return;

    if (!isControlled) setInternalValue(inputValue);
    onChange?.(hourFormat === 12 ? `${inputValue} ${meridian}` : inputValue);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className={labelStyle}>{label}</label>}
      <div
        className={`relative flex items-center px-2 ${variantStyles[variant]} ${className}`}
      >
        <Clock className="text-gray-500 size-5 mr-2" strokeWidth={1.5} />
        <input
          type="text"
          inputMode="numeric"
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-[60px] text-start outline-none bg-transparent`}
          autoComplete="off"
        />
        {hourFormat === 12 && (
          <button
            type="button"
            onClick={() => {
              const next = meridian === "AM" ? "PM" : "AM";
              setMeridian(next);
              onChange?.(`${currentValue} ${next}`);
            }}
            className=" px-1 py-0.5 text-sm rounded text-gray-700 hover:text-blue-600"
          >
            {meridian}
          </button>
        )}
      </div>
    </div>
  );
};

export default TimeInput;
