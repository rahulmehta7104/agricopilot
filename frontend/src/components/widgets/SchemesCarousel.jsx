import { useState, useEffect } from 'react';
import { Landmark, ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SchemesCarousel({ profile = 'Small farmer in India growing wheat and rice.' }) {
  const [schemes, setSchemes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchemes = async () => {
      const cacheKey = `agricopilot_schemes_${profile}`;
      const cachedData = sessionStorage.getItem(cacheKey);
      
      if (cachedData) {
        setSchemes(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:3000/api/services/schemes?profile=${encodeURIComponent(profile)}`);
        const data = await res.json();
        
        let parsedData;
        try {
          parsedData = JSON.parse(data.schemes);
        } catch (e) {
          parsedData = { isText: true, text: data.schemes };
        }
        
        setSchemes(parsedData);
        sessionStorage.setItem(cacheKey, JSON.stringify(parsedData));
      } catch (error) {
        console.error("Failed to fetch schemes", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSchemes();
  }, [profile]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-panel rounded-[2rem] p-8 border border-slate-500/20 shadow-lg relative overflow-hidden h-full flex flex-col group"
    >
      <div className="absolute -right-10 -bottom-10 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none">
        <Landmark className="w-64 h-64 text-white" />
      </div>

      <div className="flex justify-between items-center mb-6 border-b border-slate-500/20 pb-4 relative z-10">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <Landmark className="w-6 h-6 text-emerald-400" /> Recommended Subsidies
        </h3>
        <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
          AI Matched
        </span>
      </div>
      
      <div className="flex-1 relative z-10 overflow-y-auto custom-scrollbar pr-2">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4 text-emerald-400/70 animate-pulse">
            <div className="w-12 h-12 border-4 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
            <p className="font-medium text-sm">Scanning government databases...</p>
          </div>
        ) : !schemes ? (
          <div className="text-slate-400 text-sm h-full flex items-center justify-center">No schemes found for this profile.</div>
        ) : schemes.isText ? (
          <div className="text-slate-300 text-sm whitespace-pre-line leading-relaxed font-light">
            {schemes.text}
          </div>
        ) : (
          <div className="space-y-4 pb-4">
            {schemes.map((scheme, idx) => (
              <motion.div 
                key={scheme.id || idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-800/40 border border-slate-700/50 hover:border-emerald-500/30 rounded-2xl p-5 transition-all duration-300 hover:bg-slate-800/60 group/card cursor-default shadow-sm hover:shadow-md relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/50 group-hover/card:bg-emerald-400 transition-colors" />
                <div className="flex justify-between items-start gap-4 mb-3">
                  <h4 className="font-bold text-white text-lg">{scheme.name}</h4>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-inner">
                    {scheme.benefit}
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed font-light mb-4">{scheme.description}</p>
                <div className="flex justify-end">
                  <a 
                    href={`https://${scheme.link}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-400/10 hover:bg-emerald-400/20 px-4 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    View Details <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-2 flex justify-end relative z-10 border-t border-slate-500/20 pt-4">
        <button className="text-emerald-400 text-sm font-medium flex items-center gap-1 hover:text-emerald-300 transition-colors group/btn">
          View full eligibility catalog 
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
