import { Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200/60 py-10 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* LEFT: Branding */}
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-emerald-100/50 rounded-xl">
              <Leaf className="h-5 w-5 text-emerald-600" />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">
              AgriCopilot
            </span>
          </div>
          
          {/* CENTER: Tagline */}
          <div className="text-sm font-medium text-slate-500 text-center">
            AI-Powered Farming Intelligence
          </div>
          
          {/* RIGHT: Copyright */}
          <div className="text-sm font-medium text-slate-400">
            &copy; {new Date().getFullYear()} AgriCopilot
          </div>
          
        </div>
      </div>
    </footer>
  );
}
