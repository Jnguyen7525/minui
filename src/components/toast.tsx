import React from "react";
import { useToast } from "./toastprovider";


const ToastComponent: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-5 right-5 space-y-3 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-3 rounded-md shadow-md ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : toast.type === "error"
              ? "bg-red-500 text-white"
              : toast.type === "warning"
              ? "bg-yellow-500 text-black"
              : "bg-gray-800 text-white"
          }`}
        >
          {toast.message}
          <button
            className="ml-3 text-sm"
            onClick={() => removeToast(toast.id)}
          >
            ✖
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastComponent;
