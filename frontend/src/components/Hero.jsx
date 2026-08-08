import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div 
      className="relative flex flex-col items-center justify-center min-h-screen pt-20 pb-40 overflow-hidden bg-slate-900 -mt-20"
      style={{
        backgroundImage: 'url(/indian_farm_home_1785433633952.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark Gradient Overlay for sharp text */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/90 z-0 pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-20"
      >
        <div className="text-center w-full mx-auto">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/40 backdrop-blur-md border border-brand-primary/40 shadow-[0_0_20px_rgba(16,185,129,0.3)] text-brand-primary text-sm font-semibold mb-10 hover:scale-105 transition-transform cursor-pointer"
          >
            <Sparkles className="h-4 w-4 text-brand-primary animate-pulse" />
            <span>AgriCopilot 2.0 AI Core is Online</span>
          </motion.div>

          <h1 className="text-6xl sm:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-extrabold tracking-tight mb-8 leading-[1.1] text-white drop-shadow-lg">
            Smarter Farming <br className="hidden md:block"/>
            <span className="text-gradient">Driven By Intelligence</span>
          </h1>
          
          <p className="mt-6 text-xl lg:text-2xl xl:text-3xl text-slate-200 max-w-4xl mx-auto mb-12 leading-relaxed font-light drop-shadow-md">
            Harness real-time weather analytics, market predictions, and AI-driven scheme recommendations in one immersive, intelligent interface.
          </p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link
              to="/dashboard"
              className="w-full sm:w-auto relative group inline-flex items-center justify-center px-10 py-5 text-lg font-bold rounded-full text-white bg-gradient-primary overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(16,185,129,0.6)]"
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-500 ease-out skew-x-12"></div>
              <span className="relative flex items-center">
                Launch Platform
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 text-lg font-bold rounded-full text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Explore Tech
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
