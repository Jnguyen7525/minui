import React from "react";

type AlertProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "destructive" | "success" | "warning";
  icon?: React.ReactNode;
};

const Alert: React.FC<AlertProps> = ({
  children,
  className = "",
  variant = "default",
  icon,
}) => {
  // Define styles based on variant
  const variantStyles: Record<string, string> = {
    default: "bg-gray-100 border-gray-300 text-gray-900",
    destructive: "bg-red-100 border-red-500 text-red-800",
    success: "bg-green-100 border-green-500 text-green-800",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-800",
  };

  return (
    <div
      className={`flex items-center p-4 rounded-md border ${variantStyles[variant]} ${className}`}
    >
      {icon && <div className="size-5 mr-3">{icon}</div>}
      <div className="flex items-center justify-start space-x-2">
        {children}
      </div>
    </div>
  );
};

type AlertTitleProps = {
  children: React.ReactNode;
  className?: string;
};

const AlertTitle: React.FC<AlertTitleProps> = ({
  children,
  className = "",
}) => {
  return <h4 className={`font-semibold ${className}`}>{children}</h4>;
};

type AlertDescriptionProps = {
  children: React.ReactNode;
  className?: string;
};

const AlertDescription: React.FC<AlertDescriptionProps> = ({
  children,
  className = "",
}) => {
  return <p className={`text-sm ${className}`}>{children}</p>;
};

export { Alert, AlertTitle, AlertDescription };
