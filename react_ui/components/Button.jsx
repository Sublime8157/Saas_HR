const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-400 text-white",
    danger: "bg-red-600 hover:bg-red-400 text-white",
    outline: "border border-gray-400 hover:opacity-70"
  };
  return (
    <button className={`transition cursor-pointer px-4 py-2 rounded ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
