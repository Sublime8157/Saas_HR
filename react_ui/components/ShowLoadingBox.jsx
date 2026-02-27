export default function ShowLoadingBox({message}) {
  return (
    <div className="absolute z-50 bg-black/40 h-full inset-0">
      <div className="h-full flex items-center justify-center">
        <div className="flex gap-2 flex-col items-center">
            <div className="loader"></div>
            <span className="text-xs" >{message}....</span>
        </div>
      </div>
    </div>
  );
}
