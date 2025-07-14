import React from "react";

type SwitchColor =
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

type SwitchProps = {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  onLabel?: string;
  offLabel?: string;
  onColor?: SwitchColor;
  offColor?: SwitchColor;
};

const sizeMap = {
  small: "w-8 h-4 after:w-4 after:h-4",
  medium: "w-12 h-6 after:w-6 after:h-6",
  large: "w-16 h-8 after:w-8 after:h-8",
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
