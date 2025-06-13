import React from "react";

type InputProps = {
  placeholder?: string;
  className?: string;
  variant?: "flat" | "bordered" | "underlined" | "faded"; // Styling variants
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  value: string; // ✅ Controlled value
  onChange: (value: string) => void;
};

// Apply the user's styles dynamically inside variants
const variantStyles = {
  flat: (bgColor: string, borderColor: string, textColor: string) =>
    `border-none rounded-md ${bgColor} ${borderColor} ${textColor}`,
  bordered: (bgColor: string, borderColor: string, textColor: string) =>
    `border rounded-md ${bgColor} ${borderColor} ${textColor}`,
  underlined: (bgColor: string, borderColor: string, textColor: string) =>
    `border-b rounded-none ${bgColor} ${borderColor} ${textColor}`,
  faded: (bgColor: string, borderColor: string, textColor: string) =>
    `border opacity-50 ${bgColor} ${borderColor} ${textColor}`,
};

const Input: React.FC<InputProps> = ({
  placeholder = "Enter text...",
  className = "",
  variant = "bordered",
  bgColor = "bg-white",
  borderColor = "border-gray-300",
  textColor = "",
  value,
  onChange,
}) => {
  return (
    <div
      className={`relative w-full ${className} ${variantStyles[variant](
        bgColor,
        borderColor,
        textColor
      )} ${bgColor} ${borderColor} ${textColor}`}
    >
      {/* Input Field */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-2 outline-none bg-transparent `}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
