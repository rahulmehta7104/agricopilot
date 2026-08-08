import { motion } from 'framer-motion';
import { Cloud, Sprout, Bot, LineChart, Shield, Database } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';

export default function Features() {
  const featuresList = [
    {
      title: "Real-Time Weather Analytics",
      description: "Micro-climate precision forecasting powered by global satellite data. Never get caught off-guard by sudden changes.",
      icon: Cloud,
      image: "/weather_analytics_1786158572564.jpg"
    },
    {
      title: "AI Crop Suggestions",
      description: "Gemini-powered insights for maximizing yield based on precise soil data and historical analysis.",
      icon: Sprout,
      image: "/ai_crop_suggestions_1786158591105.jpg"
    },
    {
      title: "Automated Government Schemes",
      description: "Instantly match with subsidies and grants based on your exact farm profile and location.",
      icon: Shield,
      image: "/gov_schemes_1786158642763.jpg"
    },
    {
      title: "Market Prediction Engine",
      description: "Track commodity prices across multiple APMC markets to sell exactly at the peak price.",
      icon: LineChart,
      image: "/market_prediction_1786158606663.jpg"
    },
    {
      title: "24/7 Agronomy Assistant",
      description: "Chat with a specialized AI agent trained on the latest agronomic research to diagnose issues instantly.",
      icon: Bot,
      image: "/agronomy_assistant_1786158622041.jpg"
    },
    {
      title: "Data Vault",
      description: "Securely store historic yield data to train personalized models over time for your specific land.",
      icon: Database,
      image: "/data_vault_1786158659666.jpg"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-slate-900 transition-colors"
    >
      {/* Immersive Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: 'url(/farm_bg.png)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950/95"></div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-sm font-medium mb-6 backdrop-blur-md">
            <Bot className="h-4 w-4" />
            Core Capabilities
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 text-white tracking-tight drop-shadow-md">
            The Ultimate <span className="text-gradient">Farming Toolkit</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
            Explore the advanced modules that make AgriCopilot the most powerful agricultural intelligence platform.
          </p>
        </motion.div>
        
        {/* Animated Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {featuresList.map((item, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <FeatureCard 
                icon={item.icon}
                title={item.title}
                description={item.description}
                image={item.image}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
