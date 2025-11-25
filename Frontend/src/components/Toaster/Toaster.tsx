"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { IoClose } from "react-icons/io5";
import { TiTick } from "react-icons/ti";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error";
}

interface ToasterContextType {
  showToast: (message: string, type: "success" | "error") => void;
}

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

export const useToaster = () => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error("useToaster must be used within ToasterProvider");
  }
  return context;
};

export const ToasterProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: "success" | "error") => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto remove after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToasterContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-md">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToasterContext.Provider>
  );
};

interface ToastItemProps {
  toast: Toast;
  onClose: () => void;
}

const ToastItem = ({ toast, onClose }: ToastItemProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border
        transition-all duration-300 ease-in-out
        ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"}
        ${
          toast.type === "error"
            ? "bg-white border-red-500"
            : "border-transparent"
        }
      `}
      style={{
        minWidth: "300px",
        ...(toast.type === "success" && {
          background: "linear-gradient(to right, #11401c, #1f7332, #859b5b)",
        }),
      }}
    >
      {toast.type === "success" && (
        <div className="shrink-0 text-white">
          <TiTick size={20} />
        </div>
      )}
      {toast.type === "error" && (
        <div className="shrink-0 text-red-500">
          <IoClose size={20} />
        </div>
      )}
      <p className={`flex-1 text-sm font-medium ${
        toast.type === "error" ? "text-red-500" : "text-white"
      }`}>
        {toast.message}
      </p>
      <button
        onClick={handleClose}
        className={`shrink-0 hover:opacity-70 transition-opacity ${
          toast.type === "error" ? "text-gray-400" : "text-white"
        }`}
        aria-label="Close toast"
      >
        <IoClose size={18} />
      </button>
    </div>
  );
};

