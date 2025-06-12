import React, { createContext, useEffect, useState } from "react";

// ✅ Create the context with an initial empty object (NOT undefined)
export const ToastContext = createContext({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info", duration = 3000) => {
    console.log("🔥 addToast called with:", { message, type, duration });

    const newToast = { id: Date.now(), message, type, duration };
    setToasts((prev) => {
      console.log("🟢 Before Update:", prev);
      const updatedToasts = [...prev, newToast];
      console.log("🔵 After Update:", updatedToasts);
      return updatedToasts;
    });

    setTimeout(() => removeToast(newToast.id), duration);
  };

  const removeToast = (id) => {
    console.log(toasts);
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    console.log("🔥 Updated Toasts:", toasts);
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};
