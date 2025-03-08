import { useState, useEffect } from "react";

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShow(true), 10);
    } else {
      setShow(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-['rgba(0, 0, 0, .8)'] bg-opacity-50 backdrop-blur-sm z-50 transition-opacity duration-300 ${show ? "opacity-100" : "opacity-0"}`} onClick={onClose}>
      <div
        className={`bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-lg transform transition-transform duration-300 ${show ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        onClick={(e) => e.stopPropagation()} 
      >
        <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-900" onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
