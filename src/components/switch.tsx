import React from "react";

type SwitchProps = {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  onLabel?: string;
  offLabel?: string;
  onColor?: "gray" | "blue" | "green" | "yellow" | "red";
  offColor?: "gray" | "blue" | "green" | "yellow" | "red";
};

const sizeMap = {
  small: "w-8 h-4 after:w-4 after:h-4",
  medium: "w-12 h-6 after:w-6 after:h-6",
  large: "w-16 h-8 after:w-8 after:h-8",
};

// ✅ Separate color maps for ON and OFF states
const colorMapOn = {
  gray: "checked:before:bg-gray-500 checked:after:border-gray-600",
  blue: "checked:before:bg-blue-500 checked:after:border-blue-500",
  green: "checked:before:bg-green-500 checked:after:border-green-500",
  yellow: "checked:before:bg-yellow-500 checked:after:border-yellow-500",
  red: "checked:before:bg-red-500 checked:after:border-red-500",
};

const colorMapOff = {
  gray: "before:bg-gray-500 before:border-gray-300 after:border-gray-300",
  blue: "before:bg-blue-500 before:border-blue-200 after:border-blue-200",
  green: "before:bg-green-500 before:border-green-200 after:border-green-200",
  yellow:
    "before:bg-yellow-500 before:border-yellow-200 after:border-yellow-200",
  red: "before:bg-red-500 before:border-red-200 after:border-red-200",
};

const Switch: React.FC<SwitchProps> = ({
  id,
  checked,
  onChange,
  disabled = false,
  size = "medium",
  onLabel = "On",
  offLabel = "Off",
  onColor = "blue",
  offColor = "gray",
}) => {
  return (
    <div className="flex items-center gap-2">
      <input
        id={id}
        type="checkbox"
        className={`appearance-none relative inline-block rounded-full ${sizeMap[size]} cursor-pointer
        before:inline-block before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-full  
        before:transition-colors before:duration-200 before:ease-in 
        after:absolute after:top-1/2 after:left-0 after:-translate-y-1/2 after:rounded-full 
        after:border after:border-gray-300 after:bg-white 
        checked:after:translate-x-full after:transition-all after:duration-200 after:ease-in 
        disabled:opacity-50 disabled:cursor-not-allowed ${colorMapOn[onColor]}  ${colorMapOff[offColor]}`} // ✅ Apply dynamic color
        checked={checked}
        disabled={disabled}
        onChange={() => !disabled && onChange(!checked)}
      />
      <label htmlFor={id} className="text-gray-600 cursor-pointer">
        {checked ? onLabel : offLabel}
      </label>
    </div>
  );
};

export default Switch;
