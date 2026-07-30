import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FeatureCard({ icon: Icon, title, description, details = "Explore more features that power your agricultural success with real-time AI and continuous monitoring." }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="perspective-1000 group relative w-full h-[320px] cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full transform-style-3d relative transition-all duration-700 ease-out"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front Face */}
        <div className="absolute inset-0 backface-hidden glass-panel rounded-[2rem] p-8 flex flex-col items-center text-center justify-center border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]">
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-emerald-500/20 text-emerald-400 mb-6 shadow-sm border border-emerald-400/30">
            <Icon className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-3">{title}</h3>
          <p className="text-slate-300 leading-relaxed font-light">{description}</p>
        </div>

        {/* Back Face */}
        <div 
          className="absolute inset-0 backface-hidden glass-panel rounded-[2rem] p-8 flex flex-col items-center text-center justify-center bg-emerald-900/40 border-emerald-400/40"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-emerald-500/20 text-emerald-300 mb-4">
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Deep Dive</h3>
          <p className="text-emerald-100/90 leading-relaxed text-sm">
            {details}
          </p>
          <Link to="/about" className="mt-6 px-5 py-2 rounded-full glass-panel border border-emerald-400/30 text-emerald-400 font-bold hover:bg-emerald-500/20 hover:text-white transition-colors cursor-pointer inline-block text-center shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            Learn More
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
