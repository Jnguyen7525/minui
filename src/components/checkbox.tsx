import * as React from "react";
import { Check } from "lucide-react";

type CheckboxProps = {
  id: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
};

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  defaultChecked,
  disabled = false,
  onChange,
  className = "",
}) => {
  const [isChecked, setIsChecked] = React.useState(defaultChecked || false);

  // If `checked` is provided, use it as a controlled component; otherwise, manage state internally
  const isControlled = checked !== undefined;
  const currentChecked = isControlled ? checked : isChecked;

  const handleChange = () => {
    if (!disabled) {
      if (!isControlled) setIsChecked(!isChecked); // Uncontrolled mode updates local state
      onChange?.(!currentChecked); // Always trigger the callback for external control
    }
  };

  return (
    <label htmlFor={id} className="flex items-center  cursor-pointer">
      <div
        id={id}
        role="checkbox"
        aria-checked={currentChecked}
        className={`w-5 h-5 flex items-center justify-center border rounded transition-all ${
          currentChecked
            ? "bg-blue-500 border-blue-500 text-white"
            : "border-gray-400"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
        onClick={handleChange}
      >
        {currentChecked && <Check size={16} />}
      </div>
    </label>
  );
};

export default Checkbox;
