// // Toast.js
// import React, { useEffect, useContext } from "react";
// import { ToastContext } from "./toastprovider";

// const Toast = ({ id, message, type, duration, onClose }) => {
//   // ✅ Auto-remove toast after `duration`
//   useEffect(() => {
//     const timer = setTimeout(() => onClose(id), duration);
//     return () => clearTimeout(timer);
//   }, [id, duration, onClose]);

//   return (
//     <div
//       className={`px-4 py-3 rounded-md shadow-md transition transform ${
//         type === "success"
//           ? "bg-green-500 text-white"
//           : type === "error"
//           ? "bg-red-500 text-white"
//           : type === "warning"
//           ? "bg-yellow-500 text-black"
//           : "bg-gray-800 text-white"
//       } animate-slide-in`}
//     >
//       {message}
//       {/* <button className="ml-3 text-sm" onClick={() => onClose(id)}> */}
//       <button className="ml-3 text-sm" onClick={onClose}>
//         ✖
//       </button>
//     </div>
//   );
// };

// export { Toast };

// // ToastContainer.js
// const ToastContainer = () => {
//   const { toasts, removeToast } = useContext(ToastContext);
//   //   console.log("Current Toasts:", toasts); // ✅ Debugging

//   return (
//     <div className="fixed bottom-5 right-5 space-y-3 z-50">
//       {toasts.length === 0 ? (
//         <p className="text-gray-500">No active toasts</p>
//       ) : null}{" "}
//       {/* ✅ Debugging */}
//       {toasts.map((toast) => (
//         <Toast
//           key={toast.id}
//           id={toast.id}
//           message={toast.message}
//           type={toast.type}
//           duration={toast.duration}
//           //   onClose={removeToast}
//           onClose={() => removeToast(toast.id)}
//         />
//       ))}
//     </div>
//   );
// };

// export { ToastContainer };

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

// 4️⃣ Define provider props
interface ToastProviderProps {
  children: ReactNode;
}

// 5️⃣ Create ToastProvider
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
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

  return (
    <ToastContext.Provider value={{ toasts, showToast }}>
      {children}
      {/* Toast Display */}
      <div className="fixed bottom-5 right-5 space-y-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-md shadow-md ${
              toast.type === "success"
                ? "bg-green-500 text-white"
                : toast.type === "error"
                ? "bg-red-500 text-white"
                : "bg-gray-800 text-white"
            }`}
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

// 7️⃣ Create a button to trigger toasts (similar to `ThemeSwitcher`)
export const ToastTrigger = () => {
  const { showToast } = useToast();

  return (
    <button
      onClick={() => showToast("Success toast!", "success")}
      className="px-4 py-2 bg-green-500 text-white rounded"
    >
      Show Success Toast
    </button>
  );
};
