const Alert = ({
  message,
  onCancel,
  onConfirm,
  confirmText = "Hapus",
  cancelText = "Batal",
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg space-y-4 text-center">
        <p className="text-sm text-gray-600">{message}</p>
        {(onCancel || onConfirm) && (
          <div className="flex justify-center gap-4 pt-2">
            {onCancel && (
              <button
                onClick={onCancel}
                className="border border-gray-300 px-4 py-2 text-sm rounded hover:bg-gray-100"
              >
                {cancelText}
              </button>
            )}
            {onConfirm && (
              <button
                onClick={onConfirm}
                className="bg-primary text-white px-4 py-2 text-sm rounded hover:bg-red-700"
              >
                {confirmText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;
