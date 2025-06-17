import React, { useEffect, useRef } from "react"; // Ubah import type
import PropTypes from "prop-types"; // Impor PropTypes

// Interface DropdownProps dihapus

export const Dropdown = ({ isOpen, onClose, children, className = "" }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) && // Hapus 'as Node'
        !(event.target.closest && event.target.closest(".dropdown-toggle")) // Hapus 'as HTMLElement', tambahkan cek keberadaan closest
      ) {
        onClose();
      }
    };

    if (isOpen) {
      // Hanya tambahkan event listener jika dropdown terbuka
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]); // Tambahkan isOpen sebagai dependency

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`absolute z-40 right-0 mt-2 rounded-xl border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark ${className}`}
    >
      {children}
    </div>
  );
};

// Definisikan PropTypes
Dropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
