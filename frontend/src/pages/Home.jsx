import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import { Cloud, Sprout, Bot, ClipboardEdit, BrainCircuit, LineChart } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      {/* Global Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-200/20 dark:bg-emerald-500/10 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[50%] rounded-full bg-green-200/20 dark:bg-emerald-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <section id="features" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-6">
                <Sprout className="h-4 w-4" />
                Powerful Features
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-5xl tracking-tight">Everything you need to optimize your harvest</h2>
              <p className="mt-6 text-xl text-slate-600 dark:text-slate-400">Advanced AI models and real-time data combined into one intuitive platform.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={Cloud} 
                title="Weather Analysis" 
                description="Get real-time weather insights, historical data, and micro-climate forecasts tailored for your farm's exact coordinates." 
              />
              <FeatureCard 
                icon={Sprout} 
                title="Crop Recommendations" 
                description="Discover the best crops to plant based on soil conditions, local climate trends, and current market demand." 
              />
              <FeatureCard 
                icon={Bot} 
                title="AI Copilot" 
                description="Chat with your personal agricultural assistant to diagnose issues, plan rotations, and get expert agronomic advice." 
              />
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-5xl tracking-tight">How AgriCopilot Works</h2>
              <p className="mt-6 text-xl text-slate-600 dark:text-slate-400">Three simple steps to smarter, data-driven farming.</p>
            </div>
            
            <div className="relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-12 left-32 right-32 h-[2px] bg-gradient-to-r from-emerald-100 via-emerald-300 to-emerald-100 dark:from-emerald-900 dark:via-emerald-700 dark:to-emerald-900" aria-hidden="true" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
                <div className="flex flex-col items-center text-center group">
                  <div className="h-24 w-24 rounded-[2rem] bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/50 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-center justify-center mb-8 group-hover:-translate-y-2 transition-transform duration-500">
                    <ClipboardEdit className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Enter Farm Info</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Provide details about your location, soil type, current crops, and historic yield data.</p>
                </div>
                
                <div className="flex flex-col items-center text-center group">
                  <div className="h-24 w-24 rounded-[2rem] bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/50 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-center justify-center mb-8 group-hover:-translate-y-2 transition-transform duration-500">
                    <BrainCircuit className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. AI Agents Analyze</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Our multi-agent system continuously processes weather satellites, market trends, and agronomic models.</p>
                </div>

                <div className="flex flex-col items-center text-center group">
                  <div className="h-24 w-24 rounded-[2rem] bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/50 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-center justify-center mb-8 group-hover:-translate-y-2 transition-transform duration-500">
                    <LineChart className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. Smart Results</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Receive actionable intelligence, profit forecasts, alerts, and personalized daily recommendations.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
