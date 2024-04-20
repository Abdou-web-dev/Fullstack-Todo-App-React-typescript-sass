import React, { useEffect } from "react";

interface AlertProps {
  message: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000); // Close after 2 seconds

    // Clear the timer on component unmount to avoid memory leaks
    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="bg-red-100 border border-red-400  rounded-lg shadow-lg w-1/6">
        <div className="border-b border-red-400 px-4 py-2 bg-red-200">
          <h3 className="font-semibold text-lg sedan-regular">Alert</h3>
        </div>
        <div className="p-4">
          <p className="text-xs sedan-regular font-bold">{message}</p>
        </div>
        <div className="border-t border-red-400 p-2 bg-red-200">
          <button
            className="text-sm text-red-700 px-4 py-1 rounded hover:bg-red-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
