import React, { useState } from "react";

type RadioOption = {
  id: string;
  value: string;
  label?: string;
};

type RadioGroupProps = {
  name: string;
  options: RadioOption[];
  checkedValue?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  onColor?: "gray" | "blue" | "green" | "yellow" | "red";
  offColor?: "gray" | "blue" | "green" | "yellow" | "red";
};

const sizeMap = {
  small: "h-4 w-4",
  medium: "h-5 w-5",
  large: "h-6 w-6",
};
// ✅ Separate color maps for ON and OFF states
const colorMapOn = {
  //   gray: "checked:before:bg-gray-500 checked:after:border-gray-600",
  //   blue: "checked:before:bg-blue-500 checked:after:border-blue-500",
  //   green: "checked:before:bg-green-500 checked:after:border-green-500",
  //   yellow: "checked:before:bg-yellow-500 checked:after:border-yellow-500",
  //   red: "checked:before:bg-red-500 checked:after:border-red-500",
  gray: "border-gray-300 checked:bg-gray-600 checked:border-gray-600",
  blue: "border-blue-300 checked:bg-blue-500 checked:border-blue-500",
  green: "border-green-300 checked:bg-green-500 checked:border-green-500",
  yellow: "border-yellow-300 checked:bg-yellow-500 checked:border-yellow-500",
  red: "border-red-300 checked:bg-red-500 checked:border-red-500",
};

const colorMapOff = {
  gray: "bg-gray-500 ",
  blue: "bg-blue-500 ",
  green: "bg-green-500 ",
  yellow: "bg-yellow-500 ",
  red: "bg-red-500 ",
};

const RadioGroup: React.FC<RadioGroupProps> = ({
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
    <div className="flex flex-col gap-3">
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
