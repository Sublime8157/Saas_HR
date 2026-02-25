const Close = ({ className = "", onClick = "" }) => {
  return (
    <div className="" onClick={onClick}>
      <ion-icon
        name="close-outline"
        className="p-1 border text-gray-500 hover:opacity-50 cursor-pointer border-gray-500 rounded-sm"
      ></ion-icon>
    </div>
  );
};

export default Close;
