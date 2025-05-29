import React from "react"; // Ubah import type
import PropTypes from "prop-types"; // Impor PropTypes
import { Link } from "react-router"; // Asumsi Link dari 'react-router' masih digunakan

// Interface DropdownItemProps dihapus

export const DropdownItem = ({
  // Hapus React.FC dan anotasi tipe DropdownItemProps
  tag = "button",
  to,
  onClick,
  onItemClick,
  baseClassName = "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
  className = "",
  children,
}) => {
  const combinedClasses = `${baseClassName} ${className}`.trim();

  const handleClick = (event) => {
    // Hapus anotasi tipe React.MouseEvent
    // Tidak perlu event.preventDefault() jika tag bukan button submit di dalam form,
    // namun jika ingin menjaga perilaku asli, bisa dipertahankan untuk tag 'button'
    // if (tag === "button") {
    //   event.preventDefault(); // Ini biasanya untuk mencegah submit form jika type button tidak diset
    // }
    if (onClick) onClick();
    if (onItemClick) onItemClick();
  };

  if (tag === "a" && to) {
    return (
      <Link to={to} className={combinedClasses} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={handleClick} className={combinedClasses}>
      {" "}
      {/* Menambahkan type="button" */}
      {children}
    </button>
  );
};

// Definisikan PropTypes
DropdownItem.propTypes = {
  tag: PropTypes.oneOf(["a", "button"]),
  to: PropTypes.string,
  onClick: PropTypes.func,
  onItemClick: PropTypes.func,
  baseClassName: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
