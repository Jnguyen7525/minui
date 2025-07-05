import React from "react";

type AlertDialogProps = {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  onClose: () => void;
};

const AlertDialog: React.FC<AlertDialogProps> = ({
  children,
  className,
  isOpen = false,
  onClose,
}) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-200 ease-in-out bg-black/50 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } `}
      onClick={onClose}
    >
      <div
        className={`relative p-6 rounded-lg shadow-lg border transition-transform duration-200 ease-in-out ${
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }   ${className}`}
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
  className,
}) => {
  return <h2 className={`${className}`}>{children}</h2>;
};

type AlertDialogDescriptionProps = {
  children: React.ReactNode;
  className?: string;
};

const AlertDialogDescription: React.FC<AlertDialogDescriptionProps> = ({
  children,
  className,
}) => {
  return <p className={`${className}`}>{children}</p>;
};

type AlertDialogActionsProps = {
  onConfirm: () => void;
  onCancel?: () => void;
  confirmButton?: React.ReactElement<any>;
  cancelButton?: React.ReactElement<any>;
};

const AlertDialogActions: React.FC<AlertDialogActionsProps> = ({
  onConfirm,
  onCancel,
  confirmButton,
  cancelButton,
}) => {
  return (
    <div className="flex justify-center gap-3 mt-4">
      {onCancel && cancelButton
        ? React.cloneElement(cancelButton, { onClick: onCancel })
        : null}

      {confirmButton
        ? React.cloneElement(confirmButton, { onClick: onConfirm })
        : null}
    </div>
  );
};

export {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogActions,
};
