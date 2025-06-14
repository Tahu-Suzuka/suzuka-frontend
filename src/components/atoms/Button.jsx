import { Link } from "react-router-dom";

export default function Button({
  type = "button",
  text,
  onClick,
  to,
  width = "w-full",
  py = "py-3",
  bgColor = "bg-primary",
  textColor = "text-white",
  className = "",
}) {
  const baseClass = `${width} ${py} ${bgColor} ${textColor} rounded-full font-semibold hover:bg-secondary transition duration-300 ${className}`;

  if (to) {
    return (
      <Link to={to} className={baseClass}>
        {text}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseClass}>
      {text}
    </button>
  );
}
