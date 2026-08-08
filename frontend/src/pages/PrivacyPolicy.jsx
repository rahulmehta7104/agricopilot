import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function PrivacyPolicy() {
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
        style={{ backgroundImage: 'url(/indian_farm_about_1785433644542.png)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950/95"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-slate-900/60 backdrop-blur-xl p-10 md:p-16 rounded-[3rem] shadow-2xl border border-white/10 text-slate-200">
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-brand-primary/20 text-brand-primary mb-8 border border-brand-primary/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Shield className="h-8 w-8" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Privacy Policy</h1>
          <p className="mb-8 text-lg font-light">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-8 font-light leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
              <p>When you use AgriCopilot, we collect data regarding your farm location, soil type, and historical yield. We only collect the minimal amount of data required to run our advanced AI models and generate personalized insights for you.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Data</h2>
              <p>Your agricultural data is processed in real-time through our multi-agent architecture. It is strictly used to forecast market trends, predict weather impacts, and recommend optimal crops. We do not sell your farm data to third parties.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Data Security</h2>
              <p>Our Data Vault utilizes state-of-the-art encryption to ensure that your historical yields and farm details are securely stored. Your data is isolated and protected against unauthorized access.</p>
            </section>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
