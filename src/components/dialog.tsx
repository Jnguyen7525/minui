import React from "react";

type DialogProps = {
  children?: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  onClose: () => void;
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
};

const Dialog: React.FC<DialogProps> = ({
  children,
  className = "",
  isOpen = false,
  onClose,
  header,
  body,
  footer,
}) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-200 ease-in-out ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } bg-black/50`}
      onClick={onClose}
    >
      <div
        className={`relative p-6 rounded-lg text-center w-fit flex flex-col justify-start items-center transition-transform duration-200 ease-in-out ${
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }  ${className}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Header */}
        {header && <div className="border-b pb-3">{header}</div>}

        {/* Body */}
        {body && <div className="py-4">{body}</div>}

        {/* Footer */}
        {footer && (
          <div className="border-t pt-3 flex justify-end">{footer}</div>
        )}

        {/* Additional children (optional) */}
        {children}
      </div>
    </div>
  );
};

export default Dialog;
