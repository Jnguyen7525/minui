import React from "react";

type InputProps = {
  placeholder?: string;
  className?: string;
  variant?: "flat" | "bordered" | "underlined" | "faded"; // Styling variants
  value: string; // ✅ Controlled value
  onChange: (value: string) => void;
};

// Apply the user's styles dynamically inside variants
const variantStyles = {
  flat: "border-none rounded-md ",
  bordered: "border rounded-md ",
  underlined: "border-b",
  faded: "border opacity-50",
};

const Input: React.FC<InputProps> = ({
  placeholder = "Enter text...",
  className = "",
  variant = "bordered",
  value,
  onChange,
}) => {
  return (
    <div className={`relative w-full ${className} ${variantStyles[variant]}`}>
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
