import { createContext, useContext, useState, ReactNode } from "react";

type Toast = {
  id: number;
  message: string;
};

type ToastContextType = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-5 right-5 flex flex-col gap-3 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="px-4 py-3 bg-white text-black font-semibold rounded-lg shadow-lg flex items-center gap-3 transition-all duration-300 opacity-100 translate-y-0"
          >
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast deve ser usado dentro de um ToastProvider");
  return context;
};
