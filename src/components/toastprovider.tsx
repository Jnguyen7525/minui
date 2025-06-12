import React, { createContext, useContext, useState, useCallback } from "react";

type ToastType = "success" | "error" | "warning" | "info";

type Toast = {
  id: number;
  message: string;
  type: ToastType;
};

type ToastContextType = {
  toasts: Toast[];
  showToastMessage: (message: string, type?: ToastType) => void;
  removeToast: (id: number) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Function to show a toast
  const showToastMessage = useCallback(
    (message: string, type: ToastType = "info") => {
      const newToast = { id: Date.now(), message, type };
      setToasts((prev) => [...prev, newToast]);

      // Auto-remove toast after 3 seconds
      setTimeout(() => removeToast(newToast.id), 3000);
    },
    []
  );

  // Function to remove a toast manually
  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToastMessage, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

// Hook to use Toast Context
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};
