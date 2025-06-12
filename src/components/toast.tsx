// Toast.js
import React, { useEffect, useContext } from "react";
import { ToastContext } from "./toastprovider";

const Toast = ({ id, message, type, duration, onClose }) => {
  // ✅ Auto-remove toast after `duration`
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <div
      className={`px-4 py-3 rounded-md shadow-md transition transform ${
        type === "success"
          ? "bg-green-500 text-white"
          : type === "error"
          ? "bg-red-500 text-white"
          : type === "warning"
          ? "bg-yellow-500 text-black"
          : "bg-gray-800 text-white"
      } animate-slide-in`}
    >
      {message}
      <button className="ml-3 text-sm" onClick={() => onClose(id)}>
        ✖
      </button>
    </div>
  );
};

export { Toast };

// ToastContainer.js
const ToastContainer = () => {
  const { toasts, removeToast } = useContext(ToastContext);
  //   console.log("Current Toasts:", toasts); // ✅ Debugging

  return (
    <div className="fixed bottom-5 right-5 space-y-3 z-50">
      {toasts.length === 0 ? (
        <p className="text-gray-500">No active toasts</p>
      ) : null}{" "}
      {/* ✅ Debugging */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={removeToast}
        />
      ))}
    </div>
  );
};

export { ToastContainer };
