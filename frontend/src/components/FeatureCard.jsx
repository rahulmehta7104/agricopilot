export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="group relative p-8 rounded-[2rem] bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(16,185,129,0.08)] hover:border-emerald-200/50 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-emerald-50/80 text-emerald-600 mb-6 group-hover:scale-110 group-hover:bg-emerald-100 transition-all duration-500 shadow-sm border border-emerald-100/50">
          <Icon className="h-7 w-7" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
