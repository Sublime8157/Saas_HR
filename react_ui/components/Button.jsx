const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-400 text-white",
    danger: "bg-red-600 hover:bg-red-400 text-white",
    outline: "border border-gray-400"
  };
  return (
    <button className={`cursor-pointer px-4 py-2 rounded ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
