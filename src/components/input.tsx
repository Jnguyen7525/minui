import React, { useState } from "react";

type InputProps = {
  placeholder?: string;
  className?: string;
  variant?: "flat" | "bordered" | "underlined" | "faded"; // Styling variants
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  onChange?: (value: string) => void;
};

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
  textColor = "text-black",
  onChange,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Input Field */}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className={`w-full p-2 outline-none bg-transparent ${variantStyles[
          variant
        ](bgColor, borderColor, textColor)}`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
