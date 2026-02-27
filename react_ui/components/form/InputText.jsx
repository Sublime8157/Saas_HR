const Input = ({
  className = "",
  placeHolder,
  label,
  name,
  isRequired = false,
  onChange,
  value,
}) => {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm">
        {label}
        {isRequired && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        className={`focus:outline-none border-gray-200 rounded-sm  w-full bg-gray-100 h-8 text-sm p-2 ${className}`}
        type="text"
        name={name}
        placeholder={placeHolder}
        required={isRequired}
        onChange={onChange}
        value={value}
        autocomplete="off"
      ></input>
    </div>
  );
};

export default Input;
