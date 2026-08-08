import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import { Cloud, Sprout, Bot, ClipboardEdit, BrainCircuit, LineChart, Database } from 'lucide-react';

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="relative z-10">
        <Hero />

        {/* Platform Capabilities Section (Z-Pattern) */}
        <section id="capabilities" className="py-24 relative bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-white/5">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
            
            {/* Block 1: AI Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative rounded-[2.5rem] overflow-hidden shadow-2xl group"
              >
                <div className="absolute inset-0 bg-brand-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-overlay"></div>
                <img 
                  src="/ai_crop_suggestions_1786158591105.jpg" 
                  alt="AI Crop Analysis" 
                  className="w-full h-[500px] object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-brand-primary/30 text-brand-primary text-sm font-medium mb-6 shadow-sm">
                  <Sprout className="h-4 w-4" />
                  Hyper-Local Intelligence
                </div>
                <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
                  Precision Agronomy, <br/><span className="text-gradient">Powered by AI.</span>
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-8">
                  Our models don't just give generic advice. By cross-referencing your exact soil type, historical yield data, and real-time micro-climate sensors, AgriCopilot tells you exactly what to plant, when to fertilize, and how to maximize your harvest.
                </p>
                <ul className="space-y-4">
                  {[
                    "Soil composition analysis via satellite imagery",
                    "Customized crop rotation planning",
                    "Predictive disease and pest alerts"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                      <div className="h-2 w-2 rounded-full bg-brand-primary"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Block 2: Financial Markets */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="order-2 lg:order-1"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-brand-secondary/30 text-brand-secondary text-sm font-medium mb-6 shadow-sm">
                  <LineChart className="h-4 w-4" />
                  Market Mastery
                </div>
                <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
                  Never Sell at <br/><span className="text-gradient-blue">the Wrong Time.</span>
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-8">
                  Stop guessing market trends. AgriCopilot aggregates real-time APMC data, global commodity indices, and local demand to predict the perfect time to harvest and sell for maximum profit.
                </p>
                <ul className="space-y-4">
                  {[
                    "Live price tracking across multiple mandis",
                    "AI-driven price forecasting (7 to 30 days)",
                    "Automated alerts for price spikes"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                      <div className="h-2 w-2 rounded-full bg-brand-secondary"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative rounded-[2.5rem] overflow-hidden shadow-2xl group order-1 lg:order-2"
              >
                <div className="absolute inset-0 bg-brand-secondary/20 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-overlay"></div>
                <img 
                  src="/market_prediction_1786158606663.jpg" 
                  alt="Market Predictions" 
                  className="w-full h-[500px] object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </motion.div>
            </div>

          </div>
        </section>

        {/* How it Works Section (Vertical Timeline) */}
        <section className="py-32 relative overflow-hidden border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
          
          {/* Subtle Image Background Overlay */}
          <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10 pointer-events-none transition-opacity duration-300" style={{ backgroundImage: 'url(/indian_farm_home_1785433633952.png)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(100%)' }}></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10 pointer-events-none z-0"></div>

          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-32 max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-sm font-medium mb-6">
                <BrainCircuit className="h-4 w-4" />
                The Intelligence Pipeline
              </div>
              <h2 className="text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight drop-shadow-md">
                How AgriCopilot <span className="text-gradient">Works</span>
              </h2>
              <p className="mt-6 text-xl text-slate-600 dark:text-slate-300 font-light">
                A seamless integration of local farm data and global intelligence.
              </p>
            </motion.div>
            
            <div className="max-w-4xl mx-auto relative">
              {/* Vertical Glowing Line */}
              <div className="absolute left-12 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand-primary/10 via-brand-primary to-brand-primary/10 transform md:-translate-x-1/2"></div>
              
              {[
                { icon: ClipboardEdit, title: "1. Farm Context", desc: "You provide basic details about your location, soil type, and current crops. AgriCopilot creates a digital twin of your farm.", align: "right" },
                { icon: Database, title: "2. Data Aggregation", desc: "Our system automatically pulls in global weather satellite data, local APMC mandi prices, and soil moisture indices in real-time.", align: "left" },
                { icon: BrainCircuit, title: "3. Multi-Agent Analysis", desc: "Specialized AI agents debate and cross-reference the data, analyzing thousands of agronomic variables simultaneously.", align: "right" },
                { icon: LineChart, title: "4. Actionable Output", desc: "You receive a unified, prioritized daily dashboard with exact instructions on when to water, fertilize, and sell.", align: "left" }
              ].map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: step.align === 'left' ? -50 : 50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className={`relative flex items-center mb-16 md:mb-24 ${step.align === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'} flex-row`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-12 md:left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white dark:bg-slate-900 border-4 border-brand-primary flex items-center justify-center z-10 shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                    <div className="w-3 h-3 rounded-full bg-brand-primary animate-ping"></div>
                  </div>

                  {/* Content Card */}
                  <div className="w-full md:w-1/2 pl-24 md:pl-0 md:px-16 relative">
                    <div className={`glass-panel p-8 rounded-[2rem] border border-slate-200 dark:border-white/10 hover:border-brand-primary/40 transition-colors shadow-2xl relative overflow-hidden group text-left ${step.align === 'left' ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-[40px] -mr-10 -mt-10 group-hover:bg-brand-primary/20 transition-colors pointer-events-none"></div>
                      
                      <div className={`inline-flex items-center justify-center p-3 rounded-2xl bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary mb-6 border border-brand-primary/30 ${step.align === 'left' ? 'md:ml-auto md:mr-0' : ''}`}>
                        <step.icon className="h-6 w-6" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{step.title}</h3>
                      <p className="text-slate-600 dark:text-slate-300 font-light leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
