const Button = ({ children, onClick, type = "button", variant = "primary", className = "" }) => {
  const variants = {
    primary: "bg-blue-600 text-white shadow-blue-100 hover:bg-blue-700",
    dark: "bg-slate-900 text-white hover:bg-black",
    outline: "border-2 border-slate-100 text-slate-600 hover:bg-slate-50",
  };
  return (
    <button type={type} onClick={onClick} className={`px-6 py-3 rounded-2xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2 ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};
export default Button;