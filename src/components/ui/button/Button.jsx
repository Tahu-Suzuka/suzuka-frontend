export default function Button({
  type = "button",
  text,
  onClick,
  width = "w-full",
  py = "py-3",
  bgColor = "bg-primary",
  textColor = "text-white",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${width} ${py} ${bgColor} ${textColor} rounded-full font-semibold hover:bg-indigo-600 transition duration-300 ${className}`}
    >
      {text}
    </button>
  );
}
