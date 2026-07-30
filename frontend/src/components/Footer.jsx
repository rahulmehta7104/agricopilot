import { Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="glass-panel border-t border-emerald-500/20 py-8 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* LEFT: Branding */}
          <div className="flex items-center gap-3">
            <div className="p-2 glass-panel rounded-xl border border-emerald-400/30">
              <Leaf className="h-5 w-5 text-emerald-400" />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white drop-shadow-md">
              AgriCopilot
            </span>
          </div>
          
          {/* CENTER: Tagline */}
          <div className="text-sm font-medium text-slate-600 dark:text-emerald-100/70 text-center">
            AI-Powered Farming Intelligence
          </div>
          
          {/* RIGHT: Copyright */}
          <div className="text-sm font-medium text-slate-500 dark:text-emerald-100/50">
            &copy; {new Date().getFullYear()} AgriCopilot
          </div>
          
        </div>
      </div>
    </footer>
  );
}
