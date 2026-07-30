import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative pt-32 pb-40 overflow-hidden flex flex-col items-center justify-center min-h-[85vh]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full"
      >
        <div className="text-center max-w-5xl mx-auto">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel border border-emerald-400/30 shadow-[0_0_20px_rgba(16,185,129,0.2)] text-emerald-300 text-sm font-semibold mb-10 hover:scale-105 transition-transform cursor-pointer"
          >
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span>AgriCopilot 2.0 AI Core is Online</span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1] text-white drop-shadow-2xl">
            Smarter Farming <br className="hidden md:block"/>
            <span className="text-gradient">Driven By Intelligence</span>
          </h1>
          
          <p className="mt-6 text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto mb-12 leading-relaxed font-light drop-shadow-md">
            Harness real-time weather analytics, market predictions, and AI-driven scheme recommendations in one immersive 3D interface.
          </p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link
              to="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 text-lg font-bold rounded-full text-white bg-emerald-600/90 backdrop-blur-sm hover:bg-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:shadow-[0_0_60px_rgba(16,185,129,0.7)] transition-all duration-300 transform hover:-translate-y-1 border border-emerald-400/50"
            >
              Launch Platform
              <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 text-lg font-bold rounded-full text-white glass-panel hover:bg-white/10 shadow-lg transition-all duration-300"
            >
              Explore Tech
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
