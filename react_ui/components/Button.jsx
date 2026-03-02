const Button = ({
  children,
  variant = "primary",
  className = "",
  disabled = false,
  ...props
}) => {
  const baseVariants = {
    primary: "bg-blue-600 text-white",
    danger: "bg-red-600 text-white",
    outline: "border border-gray-400",
  };

  const hoverVariants = {
    primary: "hover:bg-blue-400",
    danger: "hover:bg-red-400",
    outline: "hover:opacity-70",
  };

  const stateClasses = disabled
    ? "opacity-40 cursor-not-allowed pointer-events-none"
    : `cursor-pointer ${hoverVariants[variant]}`;

  return (
    <button
      {...props}
      disabled={disabled}
      className={`transition px-4 py-2 rounded ${baseVariants[variant]} ${className} ${stateClasses}`}
    >
      {children}
    </button>
  );
};

export default Button;