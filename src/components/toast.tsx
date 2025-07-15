import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

// 1️⃣ Define toast properties
interface ToastType {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

// 2️⃣ Context shape
interface ToastContextType {
  toasts: ToastType[];
  showToast: (message: string, type?: "success" | "error" | "info") => void;
}

// 3️⃣ Create the context
export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

// 4️⃣ Define placement options
type ToastPlacement =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-center";

interface ToastStyles {
  success: string;
  error: string;
  info: string;
}

// 4️⃣ Define provider props
interface ToastProviderProps {
  children: ReactNode;
  placement?: ToastPlacement;
  className?: string;
  toastStyles?: ToastStyles;
}

// 5️⃣ Create ToastProvider
export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  placement = "bottom-right",
  toastStyles,
}) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    const newToast: ToastType = { id: Date.now(), message, type };
    setToasts((prev) => [...prev, newToast]);

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== newToast.id));
    }, 3000);
  };

  // 7️⃣ Map placement to Tailwind classes
  const placementClasses = {
    "bottom-right": "bottom-5 right-5",
    "bottom-left": "bottom-5 left-5",
    "top-right": "top-5 right-5",
    "top-left": "top-5 left-5",
    "top-center": "top-5 left-1/2 transform -translate-x-1/2",
    "bottom-center": "bottom-5 left-1/2 transform -translate-x-1/2",
  };

  const defaultToastStyles: ToastStyles = {
    success: "bg-green-500 text-white px-4 py-3 rounded-md shadow-md",
    error: "bg-red-500 text-white px-4 py-3 rounded-md shadow-md",
    info: "bg-gray-800 text-white px-4 py-3 rounded-md shadow-md",
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast }}>
      {children}
      {/* Toast Display */}
      <div className={`fixed z-50 space-y-2 ${placementClasses[placement]}`}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={
              toastStyles?.[toast.type] || defaultToastStyles[toast.type]
            }
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// 6️⃣ Create `useToast` hook
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
