const StatsGrid = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
    {["Total", "Pending", "Completed"].map((label, i) => (
      <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{label} Tasks</p>
        <h2 className="text-4xl font-black mt-2 text-slate-900">{stats[label.toLowerCase()] || 0}</h2>
      </div>
    ))}
  </div>
);
export default StatsGrid;