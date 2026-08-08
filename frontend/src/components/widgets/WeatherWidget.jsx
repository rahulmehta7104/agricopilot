import { useState, useEffect } from 'react';
import { Cloud, Droplets, Wind, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WeatherWidget({ lat = 28.6139, lon = 77.2090, locationName = 'India' }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/services/weather?lat=${lat}&lon=${lon}`);
        const data = await res.json();
        setWeather(data);
      } catch (error) {
        console.error("Failed to fetch weather", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [lat, lon]);

  if (loading) {
    return <div className="glass-panel p-6 rounded-2xl animate-pulse h-48 w-full flex items-center justify-center text-emerald-300">Loading Weather...</div>;
  }

  if (!weather || weather.error) {
    return <div className="glass-panel p-6 rounded-2xl text-red-400">Unable to load weather data.</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/60 dark:bg-slate-800/80 backdrop-blur-[24px] rounded-[2rem] p-8 border border-slate-200 dark:border-emerald-500/20 shadow-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] relative overflow-hidden group h-full flex flex-col"
    >
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-500/15 blur-[80px] rounded-full pointer-events-none group-hover:bg-emerald-500/25 transition-colors duration-700" />
      
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity z-10">
        <Cloud className="w-32 h-32 text-emerald-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white flex justify-between items-center w-full relative z-20">
        <span className="flex items-center gap-2"><Sun className="w-6 h-6 text-emerald-500 dark:text-emerald-400" /> Local Weather</span>
        <span className="text-xs font-bold text-slate-700 dark:text-emerald-100/70 bg-white/80 dark:bg-emerald-500/10 px-3 py-1.5 rounded-full border border-slate-200 dark:border-emerald-500/20 shadow-inner uppercase tracking-wider">{locationName}</span>
      </h3>
      
      <div className="flex-1 flex flex-col justify-center relative z-20 mt-6">
        <div className="flex items-end gap-4 mb-2">
        <span className="text-6xl font-bold text-slate-900 dark:text-white drop-shadow-md">
          {Math.round(weather.main?.temp || 0)}°
        </span>
        <span className="text-2xl text-slate-600 dark:text-slate-300 mb-2">C</span>
      </div>

        <p className="text-lg text-slate-700 dark:text-emerald-100 capitalize font-medium mb-8">{weather.weather?.[0]?.description || 'Clear'}</p>

        <div className="grid grid-cols-2 gap-4 border-t border-slate-200 dark:border-slate-700/50 pt-6 mb-6">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5"><Droplets className="w-3.5 h-3.5" /> Humidity</span>
            <span className="text-lg font-bold text-slate-900 dark:text-white">{weather.main?.humidity}%</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5"><Wind className="w-3.5 h-3.5" /> Wind Speed</span>
            <span className="text-lg font-bold text-slate-900 dark:text-white">{weather.wind?.speed} m/s</span>
          </div>
        </div>

        {/* Dynamic Insight Box to fill space and look premium */}
        <div className="mt-auto bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 rounded-2xl p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
          <h4 className="text-emerald-700 dark:text-emerald-300 text-sm font-semibold mb-2">Field Condition</h4>
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            {weather.wind?.speed > 5 
              ? "High wind speeds detected. Delay aerial spraying or chemical application to prevent drift."
              : weather.main?.temp > 35
              ? "High temperatures detected. Ensure crops have adequate irrigation and avoid field labor during peak hours."
              : weather.weather?.[0]?.main === 'Rain'
              ? "Rain expected. Delay irrigation and ensure proper field drainage."
              : "Current weather conditions are highly favorable for standard field activities and crop growth."}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
