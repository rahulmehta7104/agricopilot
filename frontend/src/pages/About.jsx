import { Target, AlertCircle, Cpu, Globe, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative overflow-hidden bg-slate-900 transition-colors duration-300"
    >
      {/* Immersive Full Screen Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: 'url(/modern_farm_landscape.jpg)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950/95"></div>
      </div>

      <div className="relative z-10 pt-32 pb-20 sm:pt-40">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-center mb-32"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-brand-primary/10 backdrop-blur-md text-brand-primary mb-6 border border-brand-primary/30">
            <Globe className="h-6 w-6" />
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 text-white drop-shadow-lg">
            Farming <span className="text-gradient">Reimagined</span>
          </h1>
          <p className="text-xl md:text-3xl text-slate-200 font-light max-w-4xl mx-auto leading-relaxed drop-shadow-md">
            Empowering a new generation of farmers with advanced AI, data science, and predictive intelligence.
          </p>
        </motion.div>

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-24 perspective-1000">
          
          {/* Mission & Vision Narrative */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="group relative w-full rounded-[2.5rem] overflow-hidden bg-slate-900 border border-transparent dark:border-white/10 shadow-lg min-h-[400px]"
            >
              <div 
                className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-110"
                style={{ backgroundImage: 'url(/indian_farm_home_1785433633952.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60 z-10"></div>
              
              <div className="relative z-20 flex flex-col justify-end p-10 h-full">
                <div className="p-4 bg-brand-primary/20 backdrop-blur-md rounded-2xl inline-flex self-start text-brand-primary mb-6 border border-brand-primary/30">
                  <Target className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-slate-200 leading-relaxed text-lg font-light">
                  To democratize access to advanced agricultural intelligence, helping farmers globally maximize their yield, minimize resource waste, and seamlessly adapt to rapidly changing climate conditions through the power of Artificial Intelligence.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative w-full rounded-[2.5rem] overflow-hidden bg-slate-900 border border-transparent dark:border-white/10 shadow-lg min-h-[400px]"
            >
              <div 
                className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-110"
                style={{ backgroundImage: 'url(/dashboard_bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60 z-10"></div>
              
              <div className="relative z-20 flex flex-col justify-end p-10 h-full">
                <div className="p-4 bg-amber-500/20 backdrop-blur-md rounded-2xl inline-flex self-start text-amber-500 mb-6 border border-amber-500/30">
                  <AlertCircle className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">The Challenge</h2>
                <p className="text-slate-200 leading-relaxed text-lg font-light">
                  Modern agriculture faces unprecedented challenges. Unpredictable weather, soil degradation, and fluctuating market prices make farming riskier than ever. Traditional intuition alone is no longer enough to ensure a profitable harvest.
                </p>
              </div>
            </motion.div>
          </div>

          {/* AI Architecture Journey */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative py-20"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">The AgriCopilot Engine</h2>
              <p className="text-slate-300 font-light text-xl">A symphony of specialized AI agents working for your farm.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Weather Agent", desc: "Monitors satellite data and predicts precise local weather impacts.", color: "blue", img: "/indian_farm_dashboard_1785433655292.png" },
                { title: "Agronomy Agent", desc: "Analyzes soil composition and crop requirements for optimal growth.", color: "emerald", img: "/indian_farm_about_1785433644542.png" },
                { title: "Market Agent", desc: "Tracks commodity prices globally to recommend profitable timing.", color: "indigo", img: "/indian_farm_home_1785433633952.png" },
                { title: "Orchestrator", desc: "Synthesizes insights to provide a unified daily action plan.", color: "purple", img: "/farm_bg.png" }
              ].map((agent, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/10 shadow-lg min-h-[300px]"
                >
                  <div 
                    className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{ backgroundImage: `url(${agent.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40 z-10 transition-opacity duration-500 opacity-90 group-hover:opacity-100"></div>
                  
                  <div className="relative z-20 p-8 h-full flex flex-col justify-end">
                    <Cpu className={`h-8 w-8 mb-6 text-${agent.color}-400 drop-shadow-md`} />
                    <h3 className={`font-bold text-xl mb-3 text-white`}>{agent.title}</h3>
                    <p className="text-slate-300 font-light text-sm leading-relaxed">{agent.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Future Vision */}
          <motion.section 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative rounded-[3rem] overflow-hidden shadow-2xl min-h-[500px] flex items-center justify-center border border-white/10"
          >
            <div 
              className="absolute inset-0 z-0 transition-transform duration-1000 ease-out group-hover:scale-105"
              style={{ backgroundImage: 'url(/about_bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            ></div>
            <div className="absolute inset-0 bg-slate-950/70 z-10 backdrop-blur-[2px]"></div>
            
            <div className="relative z-20 flex flex-col items-center text-center p-12 md:p-20">
              <div className="p-6 bg-brand-primary/30 backdrop-blur-md rounded-[2rem] text-brand-primary border border-brand-primary/50 mb-8 animate-float shadow-lg">
                <Rocket className="h-12 w-12 text-emerald-400" />
              </div>
              <h2 className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg">The Future Vision</h2>
              <p className="text-slate-200 leading-relaxed text-2xl max-w-5xl font-light drop-shadow-md">
                We envision a future where every farm, regardless of size, operates with the precision of a high-tech laboratory. By seamlessly integrating IoT sensors, autonomous machinery, and our unified AI platform, AgriCopilot will become the central nervous system for sustainable farms worldwide.
              </p>
            </div>
          </motion.section>
        </div>
      </div>
    </motion.div>
  );
}
