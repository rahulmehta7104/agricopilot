import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import { Cloud, Sprout, Bot, ClipboardEdit, BrainCircuit, LineChart } from 'lucide-react';

export default function Home() {
  return (
    <div 
      className="min-h-screen relative overflow-hidden transition-colors duration-300"
      style={{
        backgroundImage: 'url(/indian_farm_home_1785433633952.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-slate-900/60 z-0"></div>

      <div className="relative z-10">
        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <section id="features" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-emerald-400/30 text-emerald-300 text-sm font-medium mb-6 shadow-lg">
                <Sprout className="h-4 w-4" />
                Powerful AI Features
              </div>
              <h2 className="text-4xl font-extrabold text-white sm:text-6xl tracking-tight drop-shadow-xl">
                Optimize your harvest <br/> in 3D Real-Time
              </h2>
              <p className="mt-6 text-xl text-slate-200">
                Advanced AI models and real-time market data combined into one intuitive, premium platform.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <FeatureCard 
                icon={Cloud} 
                title="Weather Analytics" 
                description="Get real-time weather insights, historical data, and micro-climate forecasts tailored for your farm's exact coordinates." 
                details="Integrates with OpenWeatherMap to bring you real-time precipitation, wind, and severe weather alerts instantly."
              />
              <FeatureCard 
                icon={Sprout} 
                title="Market Prediction" 
                description="Discover the best crops to plant based on soil conditions, local climate trends, and current market demand."
                details="Our Gemini AI model analyzes historical APMC prices to predict high-yield, high-profit crop rotations for you." 
              />
              <FeatureCard 
                icon={Bot} 
                title="Gov Schemes AI" 
                description="Chat with your personal agricultural assistant to diagnose issues, plan rotations, and get expert agronomic advice." 
                details="We parse local MSP data and government schemes to automatically recommend free money and subsidies you qualify for."
              />
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-24 max-w-3xl mx-auto">
              <h2 className="text-4xl font-extrabold text-white sm:text-6xl tracking-tight drop-shadow-xl">How AgriCopilot Works</h2>
              <p className="mt-6 text-xl text-slate-200 drop-shadow">Three simple steps to smarter, data-driven farming.</p>
            </div>
            
            <div className="relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-12 left-32 right-32 h-[2px] bg-gradient-to-r from-emerald-400/10 via-emerald-400/60 to-emerald-400/10" aria-hidden="true" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
                <div className="flex flex-col items-center text-center group perspective-1000">
                  <div className="h-24 w-24 rounded-[2rem] glass-panel flex items-center justify-center mb-8 group-hover:-translate-y-4 group-hover:rotate-y-12 transition-all duration-500 border border-emerald-400/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <ClipboardEdit className="h-10 w-10 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">1. Farm Context</h3>
                  <p className="text-slate-300 leading-relaxed">Provide details about your location, soil type, current crops, and historic yield data.</p>
                </div>
                
                <div className="flex flex-col items-center text-center group perspective-1000">
                  <div className="h-24 w-24 rounded-[2rem] glass-panel flex items-center justify-center mb-8 group-hover:-translate-y-4 group-hover:rotate-y-12 transition-all duration-500 border border-emerald-400/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <BrainCircuit className="h-10 w-10 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">2. AI Analysis</h3>
                  <p className="text-slate-300 leading-relaxed">Our multi-agent system continuously processes weather satellites, market trends, and agronomic models.</p>
                </div>

                <div className="flex flex-col items-center text-center group perspective-1000">
                  <div className="h-24 w-24 rounded-[2rem] glass-panel flex items-center justify-center mb-8 group-hover:-translate-y-4 group-hover:rotate-y-12 transition-all duration-500 border border-emerald-400/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <LineChart className="h-10 w-10 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">3. Smart Output</h3>
                  <p className="text-slate-300 leading-relaxed">Receive actionable intelligence, profit forecasts, alerts, and personalized daily recommendations.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
