import React from "react";

const Alert = ({
  //   title,
  message,
  onCancel,
  onConfirm,
  confirmText = "Hapus",
  cancelText = "Batal",
}) => {
  return (
    <div className="fixed -inset-7 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg space-y-4 text-center">
        {/* <h2 className="text-lg font-bold text-gray-800">{title}</h2> */}
        <p className="text-sm text-gray-600">{message}</p>
        <div className="flex justify-center gap-4 pt-2">
          <button
            onClick={onCancel}
            className="border border-gray-300 px-4 py-2 text-sm rounded hover:bg-gray-100"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 text-sm rounded hover:bg-red-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
