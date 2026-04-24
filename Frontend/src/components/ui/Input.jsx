const Input = ({ label, ...props }) => (
  <div className="w-full">
    {label && <label className="text-xs font-black text-slate-400 uppercase ml-2 tracking-widest">{label}</label>}
    <input {...props} className="w-full mt-1 bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm text-slate-700" />
  </div>
);
export default Input;