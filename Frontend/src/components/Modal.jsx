import React from "react";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed  inset-0 bg-black/30 z-50 flex items-center justify-center ">
      <div className="bg-white rounded-lg py-6 px-2 lg:p-6 w-full max-w-md relative ">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 lg:top-4 lg:right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
