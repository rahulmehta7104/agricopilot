import { Target, AlertCircle, Bot, Rocket, Cpu, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div 
      className="min-h-screen relative overflow-hidden transition-colors duration-300"
      style={{
        backgroundImage: 'url(/indian_farm_about_1785433644542.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-slate-900/70 z-0 backdrop-blur-[2px]"></div>

      <div className="relative z-10 pt-32 pb-20 sm:pt-40">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-2xl glass-panel text-emerald-400 mb-6 border border-emerald-400/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Globe className="h-6 w-6" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white drop-shadow-xl">
            Farming <span className="text-gradient">Reimagined</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 font-light max-w-2xl mx-auto drop-shadow-md">
            Empowering a new generation of farmers with advanced AI, data science, and predictive intelligence.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 perspective-1000">
          
          {/* Mission Section */}
          <motion.section 
            initial={{ opacity: 0, rotateX: 10 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            animate={{ y: [0, -10, 0], rotateZ: [0, 0.5, -0.5, 0] }}
            transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut" }, rotateZ: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
            viewport={{ once: true }}
            className="glass-panel p-10 md:p-14 rounded-[2.5rem] transform-style-3d hover:border-emerald-500/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] transition-all duration-500 hover:rotate-x-2"
          >
            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="p-5 bg-emerald-500/20 rounded-3xl text-emerald-400 border border-emerald-400/30 shadow-[0_0_15px_rgba(16,185,129,0.2)] shrink-0">
                <Target className="h-10 w-10" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-slate-300 leading-relaxed text-lg font-light">
                  To democratize access to advanced agricultural intelligence, helping farmers globally maximize their yield, minimize resource waste, and seamlessly adapt to rapidly changing climate conditions through the power of Artificial Intelligence.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Problem Statement */}
          <motion.section 
            initial={{ opacity: 0, rotateX: -10 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            animate={{ y: [0, 10, 0], rotateZ: [0, -0.5, 0.5, 0] }}
            transition={{ y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" }, rotateZ: { duration: 6.5, repeat: Infinity, ease: "easeInOut" } }}
            viewport={{ once: true }}
            className="glass-panel p-10 md:p-14 rounded-[2.5rem] transform-style-3d hover:border-amber-500/40 hover:shadow-[0_0_40px_rgba(245,158,11,0.15)] transition-all duration-500 hover:rotate-x-2"
          >
            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="p-5 bg-amber-500/20 rounded-3xl text-amber-400 border border-amber-400/30 shadow-[0_0_15px_rgba(245,158,11,0.2)] shrink-0">
                <AlertCircle className="h-10 w-10" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">The Challenge</h2>
                <p className="text-slate-300 leading-relaxed text-lg font-light">
                  Modern agriculture faces unprecedented challenges. Unpredictable weather patterns, soil degradation, and fluctuating market prices make farming riskier than ever. Traditional intuition alone is no longer enough to ensure a profitable and sustainable harvest.
                </p>
              </div>
            </div>
          </motion.section>

          {/* AI Agent Overview */}
          <section className="glass-panel p-10 md:p-14 rounded-[2.5rem] relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-emerald-500/20 transition-colors duration-700" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-5 bg-emerald-500/20 rounded-3xl text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <Cpu className="h-10 w-10" />
                </div>
                <h2 className="text-3xl font-bold text-white">Multi-Agent AI System</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity }}
                  className="p-8 rounded-[2rem] bg-slate-900/40 hover:bg-slate-900/60 transition-colors border border-slate-700/50 hover:border-blue-400/40"
                >
                  <h3 className="font-semibold text-blue-400 mb-2 text-lg">Weather Agent</h3>
                  <p className="text-slate-300 leading-relaxed font-light">Monitors satellite data and forecasts to predict precise local weather impacts.</p>
                </motion.div>
                <motion.div 
                  animate={{ y: [0, 5, 0] }} transition={{ duration: 5, repeat: Infinity }}
                  className="p-8 rounded-[2rem] bg-slate-900/40 hover:bg-slate-900/60 transition-colors border border-slate-700/50 hover:border-emerald-400/40"
                >
                  <h3 className="font-semibold text-emerald-400 mb-2 text-lg">Agronomy Agent</h3>
                  <p className="text-slate-300 leading-relaxed font-light">Analyzes soil composition and crop requirements for optimal growth trajectories.</p>
                </motion.div>
                <motion.div 
                  animate={{ y: [0, -5, 0] }} transition={{ duration: 6, repeat: Infinity }}
                  className="p-8 rounded-[2rem] bg-slate-900/40 hover:bg-slate-900/60 transition-colors border border-slate-700/50 hover:border-indigo-400/40"
                >
                  <h3 className="font-semibold text-indigo-400 mb-2 text-lg">Market Agent</h3>
                  <p className="text-slate-300 leading-relaxed font-light">Tracks commodity prices globally to recommend the most profitable harvest timing.</p>
                </motion.div>
                <motion.div 
                  animate={{ y: [0, 5, 0] }} transition={{ duration: 4.5, repeat: Infinity }}
                  className="p-8 rounded-[2rem] bg-slate-900/40 hover:bg-slate-900/60 transition-colors border border-slate-700/50 hover:border-purple-400/40"
                >
                  <h3 className="font-semibold text-purple-400 mb-2 text-lg">Orchestrator Core</h3>
                  <p className="text-slate-300 leading-relaxed font-light">Synthesizes insights from all specialized agents to provide a unified daily action plan.</p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Future Vision */}
          <motion.section 
            animate={{ y: [0, -8, 0], rotateY: [0, 2, -2, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="glass-panel p-10 md:p-14 rounded-[2.5rem] text-white relative overflow-hidden group transform-style-3d hover:border-indigo-500/40 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] transition-colors"
          >
            <div className="absolute top-[-10%] right-[-5%] p-8 opacity-20 transform rotate-12 group-hover:rotate-45 group-hover:scale-110 transition-transform duration-700">
              <Rocket className="h-64 w-64 text-emerald-400" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-5 bg-emerald-500/20 backdrop-blur-md rounded-3xl text-emerald-300 border border-emerald-400/30">
                  <Rocket className="h-10 w-10" />
                </div>
                <h2 className="text-3xl font-bold">The Future Vision</h2>
              </div>
              <p className="text-emerald-50/90 leading-relaxed text-lg max-w-3xl font-light">
                We envision a future where every farm, regardless of size, operates with the precision of a high-tech laboratory. By seamlessly integrating IoT sensors, autonomous machinery, and our unified AI platform, AgriCopilot will become the central nervous system for sustainable farms worldwide.
              </p>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
