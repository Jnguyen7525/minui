import React, { useState } from "react";

type RadioOption = {
  id: string;
  value: string;
  label?: string;
};
type RadioColor =
  | "gray"
  | "blue"
  | "green"
  | "yellow"
  | "red"
  | "purple"
  | "orange"
  | "black"
  | "white"
  | "pink";

type RadioGroupProps = {
  className?: string;
  name: string;
  options: RadioOption[];
  checkedValue?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  onColor?: RadioColor;
  offColor?: RadioColor;
};

const sizeMap = {
  small: "h-4 w-4",
  medium: "h-5 w-5",
  large: "h-6 w-6",
};
// ✅ Separate color maps for ON and OFF states
const colorMapOn = {
  gray: "border-gray-300 checked:bg-gray-600 checked:border-gray-600",
  blue: "border-blue-300 checked:bg-blue-500 checked:border-blue-500",
  green: "border-green-300 checked:bg-green-500 checked:border-green-500",
  yellow: "border-yellow-300 checked:bg-yellow-500 checked:border-yellow-500",
  red: "border-red-300 checked:bg-red-500 checked:border-red-500",
  purple: "border-purple-300 checked:bg-purple-500 checked:border-purple-500",
  orange: "border-orange-300 checked:bg-orange-500 checked:border-orange-500",
  black: "border-gray-900 checked:bg-black checked:border-black",
  white: "border-white checked:bg-white checked:border-white",
  pink: "border-pink-300 checked:bg-pink-500 checked:border-pink-500",
};

const colorMapOff = {
  gray: "bg-gray-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  red: "bg-red-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
  black: "bg-black",
  white: "bg-white border border-gray-300", // helps visibility on white bg
  pink: "bg-pink-500",
};

const RadioGroup: React.FC<RadioGroupProps> = ({
  className = "flex flex-col gap-3",
  name,
  options,
  checkedValue,
  defaultValue,
  onChange,
  disabled = false,
  size = "medium",
  onColor = "blue",
  offColor = "gray",
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = (value: string) => {
    if (!disabled) {
      setSelectedValue(value);
      onChange?.(value);
    }
  };

  return (
    <div className={`${className}`}>
      {options.map(({ id, value, label }) => (
        <div key={id} className="flex items-center gap-3">
          <input
            type="radio"
            id={id}
            name={name}
            value={value}
            checked={
              checkedValue ? checkedValue === value : selectedValue === value
            }
            onChange={() => handleChange(value)}
            disabled={disabled}
            className={`peer appearance-none rounded-full shadow-sm hover:shadow cursor-pointer transition-all
              ${sizeMap[size]} ${colorMapOn[onColor]}  ${colorMapOff[offColor]} disabled:opacity-50 disabled:cursor-not-allowed`}
          />
          <label htmlFor={id} className="cursor-pointer">
            {label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
