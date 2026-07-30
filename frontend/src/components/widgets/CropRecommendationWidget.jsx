import { useState } from 'react';
import { Sprout, Sparkles, MapPin, Target, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SOIL_TYPES = ['Loamy', 'Clay', 'Sandy', 'Black', 'Red', 'Alluvial'];
const SEASONS = ['Kharif', 'Rabi', 'Zaid'];

export default function CropRecommendationWidget({ location = 'India', initialSoilType = 'Loamy' }) {
  // Ensure the initial soil type from DB is included in our list, otherwise default to it
  const validInitialSoilType = SOIL_TYPES.includes(initialSoilType) ? initialSoilType : 'Loamy';
  
  const [soilType, setSoilType] = useState(validInitialSoilType);
  const [season, setSeason] = useState('Kharif');
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecommendation = async () => {
    setLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      const res = await fetch(`http://localhost:3000/api/services/crop-recommendation?location=${location}&soilType=${soilType}&season=${season}`);
      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      let parsedData;
      try {
        parsedData = JSON.parse(data.prediction);
      } catch (e) {
        throw new Error("Invalid response format from AI.");
      }
      
      setRecommendations(parsedData);
    } catch (err) {
      console.error("Failed to fetch recommendation", err);
      setError("Unable to generate recommendation at this time. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Input Section */}
      <div className="glass-panel rounded-[2rem] p-8 border border-emerald-500/20 shadow-lg relative overflow-hidden bg-slate-900/50">
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-emerald-500/10 blur-[60px] rounded-full pointer-events-none" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-emerald-400" /> AI Crop Planner
            </h3>
            <p className="text-emerald-100/60 text-sm">Get expert AI advice on what to plant next based on your specific conditions.</p>
          </div>
          
          <div className="flex flex-wrap items-end gap-4 w-full md:w-auto">
            <div className="flex flex-col gap-1.5 flex-1 min-w-[140px]">
              <label className="text-xs font-semibold text-emerald-100/80 uppercase tracking-wider pl-1">Soil Type</label>
              <select 
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-800/80 rounded-xl text-emerald-50 text-sm font-medium border border-emerald-500/30 shadow-inner focus:outline-none focus:ring-2 focus:ring-emerald-500/50 cursor-pointer appearance-none"
              >
                {/* Always show the user's DB soil type as the first 'Current' option if it's in the list */}
                {SOIL_TYPES.includes(initialSoilType) && (
                  <option value={initialSoilType}>{initialSoilType} (Current Profile)</option>
                )}
                {SOIL_TYPES.filter(s => s !== initialSoilType).map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            
            <div className="flex flex-col gap-1.5 flex-1 min-w-[140px]">
              <label className="text-xs font-semibold text-emerald-100/80 uppercase tracking-wider pl-1">Season</label>
              <select 
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-800/80 rounded-xl text-emerald-50 text-sm font-medium border border-emerald-500/30 shadow-inner focus:outline-none focus:ring-2 focus:ring-emerald-500/50 cursor-pointer appearance-none"
              >
                {SEASONS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            
            <button 
              onClick={fetchRecommendation}
              disabled={loading}
              className="w-full md:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 h-[42px]"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Generate Plan'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="p-6 bg-red-500/10 border border-red-500/20 rounded-[2rem] text-center"
          >
            <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
            <p className="text-red-300 font-medium">{error}</p>
          </motion.div>
        )}

        {recommendations && !loading && !error && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {recommendations.map((rec, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }}
                className={`glass-panel p-6 rounded-[2rem] border relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 ${idx === 0 ? 'bg-emerald-900/40 border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.15)]' : 'bg-slate-900/40 border-slate-700/50 hover:border-emerald-500/30'}`}
              >
                {idx === 0 && (
                  <div className="absolute top-0 right-0 bg-emerald-500 text-emerald-950 text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10 uppercase tracking-widest shadow-md">
                    Top Pick
                  </div>
                )}
                
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-2xl ${idx === 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-emerald-300'}`}>
                    <Sprout className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white leading-tight">{rec.name}</h4>
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                      {rec.confidence} Match
                    </span>
                  </div>
                </div>
                
                <p className="text-slate-300 text-sm leading-relaxed mb-6 min-h-[60px] line-clamp-3">
                  {rec.reason}
                </p>
                
                <div className="space-y-3 pt-4 border-t border-slate-700/50">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400 flex items-center gap-1.5"><Target className="w-4 h-4" /> Est. Yield</span>
                    <span className="font-bold text-white">{rec.expectedYield}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400 flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Market Demand</span>
                    <span className={`font-bold px-2 py-0.5 rounded text-xs ${
                      rec.marketDemand === 'HIGH' ? 'bg-emerald-500/20 text-emerald-400' : 
                      rec.marketDemand === 'MEDIUM' ? 'bg-amber-500/20 text-amber-400' : 
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {rec.marketDemand}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {!recommendations && !loading && !error && (
          <div className="glass-panel p-12 rounded-[2rem] border border-slate-700/50 text-center flex flex-col items-center justify-center min-h-[300px]">
            <Sprout className="w-16 h-16 text-slate-700 mb-4" />
            <h4 className="text-xl font-semibold text-slate-300 mb-2">Ready to plan your season?</h4>
            <p className="text-slate-500 max-w-md">Select your soil type and upcoming season above, and our AI will crunch historical data and market trends to recommend the best crops for your farm.</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
