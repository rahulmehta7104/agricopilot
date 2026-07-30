import { useState, useEffect } from 'react';
import { Cloud, Droplets, Wind, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WeatherWidget({ lat = 28.6139, lon = 77.2090, locationName = 'India' }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/services/weather?lat=${lat}&lon=${lon}`);
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
      className="glass-panel rounded-[2rem] p-8 border border-emerald-400/20 shadow-lg relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
        <Cloud className="w-32 h-32 text-emerald-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-emerald-300 mb-6 flex justify-between items-center w-full">
        <span className="flex items-center gap-2"><Sun className="w-6 h-6" /> Local Weather</span>
        <span className="text-sm text-emerald-100/70 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">{locationName}</span>
      </h3>
      
      <div className="flex items-end gap-4 mb-6">
        <span className="text-6xl font-bold text-white drop-shadow-md">
          {Math.round(weather.main?.temp || 0)}°
        </span>
        <span className="text-2xl text-slate-300 mb-2">C</span>
      </div>

      <p className="text-lg text-emerald-100 capitalize mb-6">{weather.weather?.[0]?.description || 'Clear'}</p>

      <div className="grid grid-cols-2 gap-4 border-t border-emerald-400/20 pt-4">
        <div className="flex items-center gap-2 text-slate-300">
          <Droplets className="w-4 h-4 text-emerald-400" />
          <span>Humidity: {weather.main?.humidity}%</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <Wind className="w-4 h-4 text-emerald-400" />
          <span>Wind: {weather.wind?.speed} m/s</span>
        </div>
      </div>
    </motion.div>
  );
}
