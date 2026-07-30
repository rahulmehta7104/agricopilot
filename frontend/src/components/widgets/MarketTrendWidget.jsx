import { useState, useEffect, useRef } from 'react';
import { LineChart as ChartIcon, TrendingUp, TrendingDown, AlertCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MarketTrendWidget({ crops = ['Wheat'], location = 'Punjab' }) {
  const [selectedCrop, setSelectedCrop] = useState(crops[0] || 'Wheat');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync state if crops prop changes
  useEffect(() => {
    if (crops.length > 0 && !crops.includes(selectedCrop)) {
      setSelectedCrop(crops[0]);
    }
  }, [crops, selectedCrop]);

  useEffect(() => {
    const fetchPrediction = async () => {
      setLoading(true);
      const cacheKey = `agricopilot_market_${selectedCrop}_${location}`;
      const cachedData = sessionStorage.getItem(cacheKey);
      
      if (cachedData) {
        setPrediction(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:3000/api/services/market-prediction?crop=${selectedCrop}&location=${location}`);
        const data = await res.json();
        
        let parsedData;
        try {
          parsedData = JSON.parse(data.prediction);
        } catch (e) {
          // Fallback if parsing completely fails, though backend guarantees JSON
          parsedData = {
            trend: "STABLE",
            percentage: "0.0%",
            currentPrice: "Data Unavailable",
            advice: "Could not parse structured data from server.",
            factors: []
          };
        }
        
        setPrediction(parsedData);
        sessionStorage.setItem(cacheKey, JSON.stringify(parsedData));
      } catch (error) {
        console.error("Failed to fetch market prediction", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrediction();
  }, [selectedCrop, location]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel rounded-[2rem] p-8 border border-slate-500/20 shadow-lg h-full flex flex-col group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-emerald-500/20 transition-colors duration-700" />
      
      <div className="flex justify-between items-center mb-6 border-b border-slate-500/20 pb-4 relative z-30">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <ChartIcon className="w-6 h-6 text-emerald-400" /> Market AI Prediction
        </h3>
        <div className="flex items-center gap-2">
          {/* Custom Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-3 py-1.5 bg-slate-800/80 rounded-xl text-emerald-300 text-xs font-bold border border-emerald-500/30 shadow-inner hover:bg-slate-700/80 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 cursor-pointer"
            >
              {selectedCrop}
              <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-32 bg-slate-800 border border-slate-600/50 rounded-xl shadow-xl overflow-hidden z-50 backdrop-blur-md"
                >
                  <ul className="py-1">
                    {[
                      ...crops,
                      ...(crops.length <= 1 && !crops.includes('Rice') ? ['Rice'] : []),
                      ...(crops.length <= 1 && !crops.includes('Cotton') ? ['Cotton'] : []),
                      ...(crops.length <= 1 && !crops.includes('Sugarcane') ? ['Sugarcane'] : [])
                    ].map((c) => (
                      <li key={c}>
                        <button
                          onClick={() => {
                            setSelectedCrop(c);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors ${
                            selectedCrop === c 
                              ? 'bg-emerald-500/20 text-emerald-300' 
                              : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                          }`}
                        >
                          {c}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="px-4 py-1.5 bg-slate-800/80 rounded-full text-slate-200 text-xs font-semibold border border-slate-600/50 flex items-center gap-1.5 shadow-inner hidden sm:flex">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            {location}
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar relative z-10">
        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="flex gap-4">
              <div className="h-20 w-32 bg-slate-700/50 rounded-2xl"></div>
              <div className="h-20 flex-1 bg-slate-700/50 rounded-2xl"></div>
            </div>
            <div className="h-32 bg-slate-700/50 rounded-2xl w-full"></div>
          </div>
        ) : !prediction ? (
          <div className="text-sm text-slate-400 flex items-center justify-center h-full">No prediction available.</div>
        ) : (
          <div className="space-y-6">
            {/* Top Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 flex flex-col justify-center">
                <span className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Current Price</span>
                <div className="text-2xl font-bold text-white flex items-center gap-1">
                  {prediction.currentPrice}
                </div>
              </div>
              <div className={`border rounded-2xl p-4 flex flex-col justify-center relative overflow-hidden ${prediction.trend === 'UPWARD' ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                <div className={`absolute -right-4 -top-4 opacity-10 ${prediction.trend === 'UPWARD' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {prediction.trend === 'UPWARD' ? <TrendingUp className="w-24 h-24" /> : <TrendingDown className="w-24 h-24" />}
                </div>
                <span className={`text-xs font-semibold uppercase tracking-wider mb-1 ${prediction.trend === 'UPWARD' ? 'text-emerald-400/80' : 'text-red-400/80'}`}>
                  Expected Trend
                </span>
                <div className="text-2xl font-bold text-white flex items-center gap-2">
                  {prediction.trend}
                  <span className={`text-sm px-2 py-0.5 rounded-full ${prediction.trend === 'UPWARD' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>
                    {prediction.percentage}
                  </span>
                </div>
              </div>
            </div>

            {/* Actionable Advice */}
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20 rounded-2xl p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
              <h4 className="text-indigo-300 text-sm font-semibold mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Actionable Advice
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">{prediction.advice}</p>
            </div>

            {/* Driving Factors */}
            {prediction.factors && (
              <div>
                <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3 pl-1">Driving Factors</h4>
                <div className="space-y-2">
                  {prediction.factors.map((factor, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-slate-800/30 border border-slate-700/30 rounded-xl p-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-sm text-slate-300 font-light">{factor}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
