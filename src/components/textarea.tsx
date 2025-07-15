import React from "react";

type TextareaProps = {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  className?: string;
};

const Textarea: React.FC<TextareaProps> = ({
  value,
  defaultValue,
  onChange,
  placeholder = "Message here...",
  rows = 8,
  disabled = false,
  className = "",
}) => {
  return (
    <textarea
      rows={rows}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
      className={`w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none 
         ring-transparent  transition-all ease-in 
        disabled:opacity-50 disabled:pointer-events-none select-none  ring shadow-sm  
        duration-100 hover:border-stone-300 hover:ring-none focus:border-stone-400 focus:ring-none  ${className}`}
    />
  );
};

export default Textarea;
