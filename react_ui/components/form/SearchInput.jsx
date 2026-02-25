const Search = ({ placeholder, className, onChange }) => {
  return (
    <div className="relative flex items-center">
      <ion-icon
        name="search-outline"
        className="ps-2 text-xs z-50 absolute"
      ></ion-icon>
      <input
        type="text"
        className={`px-6 py-2     
          border-0 border-b-2 border-gray-300
          focus:outline-none
          focus:border-b-2
          focus:border-blue-500
          transition-all duration-50 ${className}`}
        placeholder={placeholder} onChange={onChange}
      ></input>
    </div>
  );
};

export default Search;
