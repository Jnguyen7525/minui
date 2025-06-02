import React from "react";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className = "",
  variant = "default",
  size = "default",
}) => {
  // Define Tailwind classes for variants
  const variantStyles: Record<string, string> = {
    default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
    destructive:
      "bg-red-600 text-white shadow-xs hover:bg-red-700 border border-red-800",
    outline:
      "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
    secondary:
      "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
    ghost:
      "hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200",
    link: "text-blue-600 underline-offset-4 hover:underline",
  };

  // Define Tailwind classes for sizes
  const sizeStyles: Record<string, string> = {
    default: "h-9 px-4 py-2 has-[>svg]:px-3",
    sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
    lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
    icon: "size-9",
  };

  return (
    <button
      className={`${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
