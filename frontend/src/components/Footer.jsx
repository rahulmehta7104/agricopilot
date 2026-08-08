import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="glass-panel border-t border-slate-200 dark:border-white/10 pt-16 pb-8 mt-auto relative z-10">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          
          {/* Brand Column (takes 2 columns space) */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 glass-panel rounded-xl border border-brand-primary/30">
                <Leaf className="h-6 w-6 text-brand-primary" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                AgriCopilot
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-sm">
              Empowering modern agriculture with AI-driven insights, predictive analytics, and autonomous operational intelligence.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-6">Product</h4>
            <ul className="space-y-4">
              <li><Link to="/features" className="text-slate-600 dark:text-slate-400 hover:text-brand-primary transition-colors">Features</Link></li>
              <li><Link to="/dashboard" className="text-slate-600 dark:text-slate-400 hover:text-brand-primary transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-slate-600 dark:text-slate-400 hover:text-brand-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-slate-600 dark:text-slate-400 hover:text-brand-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><Link to="/privacy" className="text-slate-600 dark:text-slate-400 hover:text-brand-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-slate-600 dark:text-slate-400 hover:text-brand-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-200 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} AgriCopilot. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
