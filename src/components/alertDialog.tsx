import React from "react";

type AlertDialogProps = {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  onClose: () => void;
  bgColor?: string;
  overlayColor?: string;
};

const AlertDialog: React.FC<AlertDialogProps> = ({
  children,
  className = "",
  isOpen = false,
  onClose,
  bgColor = "bg-white",
  overlayColor = "bg-black/50",
}) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-200 ease-in-out ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } ${overlayColor}`}
      onClick={onClose}
    >
      <div
        className={`relative p-6 rounded-lg shadow-lg border transition-transform duration-200 ease-in-out ${
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
        } ${bgColor} ${className}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {children}
      </div>
    </div>
  );
};

type AlertDialogTitleProps = {
  children: React.ReactNode;
  className?: string;
};

const AlertDialogTitle: React.FC<AlertDialogTitleProps> = ({
  children,
  className = "",
}) => {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>;
};

type AlertDialogDescriptionProps = {
  children: React.ReactNode;
  className?: string;
};

const AlertDialogDescription: React.FC<AlertDialogDescriptionProps> = ({
  children,
  className = "",
}) => {
  return <p className={`text-sm ${className}`}>{children}</p>;
};

type AlertDialogActionsProps = {
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
  cancelColor?: string;
};

const AlertDialogActions: React.FC<AlertDialogActionsProps> = ({
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "bg-blue-500 text-white",
  cancelColor = "bg-gray-300 text-black",
}) => {
  return (
    <div className="flex justify-center gap-3 mt-4">
      {onCancel && (
        <button
          className={`px-4 py-2 rounded-md ${cancelColor}`}
          onClick={onCancel}
        >
          {cancelText}
        </button>
      )}
      <button
        className={`px-4 py-2 rounded-md ${confirmColor}`}
        onClick={onConfirm}
      >
        {confirmText}
      </button>
    </div>
  );
};

export {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogActions,
};
