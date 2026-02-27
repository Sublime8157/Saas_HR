import { useEffect } from "react";

const Modal = ({
  open,
  onClose,
  variant = "large",
  className = "",
  children,
}) => {
  const variants = {
    large: "w-full max-w-2xl",
    medium: "w-full max-w-xl",
    small: "w-full max-w-md",
  };

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative h-full w-full flex items-center justify-center p-4">
        <div
          className={`p-6 rounded-2xl bg-white shadow-xl border border-gray-100 ${variants[variant]}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
