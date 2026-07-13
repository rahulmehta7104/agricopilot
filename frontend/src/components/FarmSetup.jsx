import React, { useState } from 'react';
import { Sprout } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../services/api';

export default function FarmSetup({ onComplete }) {
  const [fullName, setFullName] = useState('');
  const [farmName, setFarmName] = useState('');
  const [size, setSize] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.post('/farms/setup', {
        fullName,
        farmName,
        size: Number(size),
      });
      
      toast.success('Farm profile created successfully!');
      if (onComplete) onComplete();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to setup farm');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full relative z-10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_60px_rgb(0,0,0,0.05)] border border-slate-200 dark:border-slate-800 p-8 sm:p-12">
        <div className="text-center mb-10">
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/50 dark:to-emerald-800/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
            <Sprout className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Welcome to AgriCopilot!</h2>
          <p className="mt-3 text-base text-slate-500 dark:text-slate-400 font-medium">
            Let's set up your first farm to get started.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullName" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Your Full Name
            </label>
            <input
              id="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Jane Doe"
              className="appearance-none block w-full px-5 py-3.5 bg-white/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm placeholder-slate-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent sm:text-sm font-medium transition-all"
            />
          </div>

          <div>
            <label htmlFor="farmName" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Farm Name
            </label>
            <input
              id="farmName"
              type="text"
              required
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
              placeholder="e.g. Green Acres"
              className="appearance-none block w-full px-5 py-3.5 bg-white/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm placeholder-slate-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent sm:text-sm font-medium transition-all"
            />
          </div>

          <div>
            <label htmlFor="size" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Total Farm Size (Acres)
            </label>
            <input
              id="size"
              type="number"
              required
              min="0.1"
              step="0.1"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder="e.g. 50"
              className="appearance-none block w-full px-5 py-3.5 bg-white/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm placeholder-slate-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent sm:text-sm font-medium transition-all"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-[0_8px_20px_rgba(16,185,129,0.2)] text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Farm...' : 'Set Up Farm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
