import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

type NumberInputLabelProps = {
  label?: React.ReactNode;
  className?: string;
};

export const NumberInputLabel: React.FC<NumberInputLabelProps> = ({
  label,
  className = "",
}) => {
  if (!label) return null;

  return <div className={className}>{label}</div>;
};

type NumberInputProps = {
  label?: React.ReactNode;
  // labelStyle?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  variant?: "flat" | "bordered" | "underlined" | "faded";
  className?: string;
  step?: number;
  min?: number;
  max?: number;
  allowDecimals?: boolean;
};

const variantStyles = {
  flat: "border-none rounded-md",
  bordered: "border rounded-md",
  underlined: "border-b",
  faded: "border opacity-50",
};

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  // labelStyle,
  value,
  onChange,
  placeholder = "Enter number",
  variant = "bordered",
  className = "",
  step = 1,
  min,
  max,
  allowDecimals = false,
}) => {
  const [internalValue, setInternalValue] = useState(value || "");

  const isControlled = onChange !== undefined;
  const currentValue = isControlled ? value ?? "" : internalValue;

  const parse = (val: string) =>
    allowDecimals ? parseFloat(val) : parseInt(val);

  const clamp = (num: number): number => {
    if (!isFinite(num)) return 0;
    if (min !== undefined && num < min) return min;
    if (max !== undefined && num > max) return max;
    return num;
  };

  const updateValue = (newVal: string) => {
    const cleaned = allowDecimals
      ? newVal.replace(/[^0-9.-]/g, "")
      : newVal.replace(/[^0-9-]/g, "");
    if (!isControlled) setInternalValue(cleaned);
    onChange?.(cleaned);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateValue(e.target.value);
  };

  const increment = () => {
    const val = parse(currentValue || "0");
    const next = clamp(val + step);
    updateValue(String(next));
  };

  const decrement = () => {
    const val = parse(currentValue || "0");
    const next = clamp(val - step);
    updateValue(String(next));
  };

  return (
    <div className="flex flex-col gap-2 w-full relative">
      {/* {label && <label className={labelStyle}>{label}</label>} */}
      <NumberInputLabel label={label} />
      <div className="relative flex items-center">
        <input
          type="text"
          inputMode="decimal"
          pattern={allowDecimals ? "[0-9.\\-]*" : "[0-9\\-]*"}
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={`pr-10 p-2 w-full outline-none ${className} ${variantStyles[variant]}`}
          autoComplete="off"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col justify-center gap-1">
          <button
            type="button"
            onClick={increment}
            className=" hover:opacity-60 cursor-pointer disabled:opacity-30"
          >
            <ChevronUp size={16} />
          </button>
          <button
            type="button"
            onClick={decrement}
            className=" hover:opacity-60 cursor-pointer disabled:opacity-30"
          >
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NumberInput;
