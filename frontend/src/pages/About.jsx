import { Target, AlertCircle, Bot, Rocket, Cpu, Globe } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Decorative Backgrounds */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-emerald-200/20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-blue-200/20 blur-[120px]" />
      </div>

      <div className="relative z-10 pt-24 pb-20 sm:pt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24">
          <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-emerald-100/50 text-emerald-600 mb-6 shadow-sm border border-emerald-100">
            <Globe className="h-6 w-6" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-900">
            Farming <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Reimagined</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 font-light max-w-2xl mx-auto">
            Empowering a new generation of farmers with advanced AI, data science, and predictive intelligence.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Mission Section */}
          <section className="bg-white/60 backdrop-blur-2xl p-10 md:p-14 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 hover:shadow-[0_20px_40px_rgba(16,185,129,0.05)] transition-all duration-500">
            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="p-4 bg-emerald-50 rounded-3xl text-emerald-600 border border-emerald-100/50 shadow-sm shrink-0">
                <Target className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
                <p className="text-slate-600 leading-relaxed text-lg font-light">
                  To democratize access to advanced agricultural intelligence, helping farmers globally maximize their yield, minimize resource waste, and seamlessly adapt to rapidly changing climate conditions through the power of Artificial Intelligence.
                </p>
              </div>
            </div>
          </section>

          {/* Problem Statement */}
          <section className="bg-white/60 backdrop-blur-2xl p-10 md:p-14 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 hover:shadow-[0_20px_40px_rgba(245,158,11,0.05)] transition-all duration-500">
            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="p-4 bg-amber-50 rounded-3xl text-amber-600 border border-amber-100/50 shadow-sm shrink-0">
                <AlertCircle className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">The Challenge</h2>
                <p className="text-slate-600 leading-relaxed text-lg font-light">
                  Modern agriculture faces unprecedented challenges. Unpredictable weather patterns, soil degradation, and fluctuating market prices make farming riskier than ever. Traditional intuition alone is no longer enough to ensure a profitable and sustainable harvest.
                </p>
              </div>
            </div>
          </section>

          {/* AI Agent Overview */}
          <section className="bg-slate-900 p-10 md:p-14 rounded-[2.5rem] shadow-2xl border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-4 bg-slate-800 rounded-3xl text-emerald-400 border border-slate-700 shadow-inner">
                  <Cpu className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-bold text-white">Multi-Agent AI System</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 rounded-[2rem] bg-slate-800/50 backdrop-blur-md border border-slate-700/50 hover:bg-slate-800 transition-colors">
                  <h3 className="font-semibold text-white mb-2 text-lg">Weather Agent</h3>
                  <p className="text-slate-400 leading-relaxed font-light">Monitors satellite data and forecasts to predict precise local weather impacts.</p>
                </div>
                <div className="p-8 rounded-[2rem] bg-slate-800/50 backdrop-blur-md border border-slate-700/50 hover:bg-slate-800 transition-colors">
                  <h3 className="font-semibold text-white mb-2 text-lg">Agronomy Agent</h3>
                  <p className="text-slate-400 leading-relaxed font-light">Analyzes soil composition and crop requirements for optimal growth trajectories.</p>
                </div>
                <div className="p-8 rounded-[2rem] bg-slate-800/50 backdrop-blur-md border border-slate-700/50 hover:bg-slate-800 transition-colors">
                  <h3 className="font-semibold text-white mb-2 text-lg">Market Agent</h3>
                  <p className="text-slate-400 leading-relaxed font-light">Tracks commodity prices globally to recommend the most profitable harvest timing.</p>
                </div>
                <div className="p-8 rounded-[2rem] bg-slate-800/50 backdrop-blur-md border border-slate-700/50 hover:bg-slate-800 transition-colors">
                  <h3 className="font-semibold text-emerald-400 mb-2 text-lg">Orchestrator Core</h3>
                  <p className="text-slate-400 leading-relaxed font-light">Synthesizes insights from all specialized agents to provide a unified daily action plan.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Future Vision */}
          <section className="bg-gradient-to-br from-emerald-600 to-teal-700 p-10 md:p-14 rounded-[2.5rem] shadow-2xl shadow-emerald-900/20 border border-emerald-500/30 text-white relative overflow-hidden">
            <div className="absolute top-[-10%] right-[-5%] p-8 opacity-10 transform rotate-12">
              <Rocket className="h-64 w-64" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-emerald-900/40 backdrop-blur-md rounded-3xl text-emerald-100 border border-emerald-500/30">
                  <Rocket className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-bold">The Future Vision</h2>
              </div>
              <p className="text-emerald-50/90 leading-relaxed text-lg max-w-3xl font-light">
                We envision a future where every farm, regardless of size, operates with the precision of a high-tech laboratory. By seamlessly integrating IoT sensors, autonomous machinery, and our unified AI platform, AgriCopilot will become the central nervous system for sustainable farms worldwide.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
