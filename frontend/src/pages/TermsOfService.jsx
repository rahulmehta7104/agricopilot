import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export default function TermsOfService() {
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
        style={{ backgroundImage: 'url(/dashboard_bg.png)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950/95"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-slate-900/60 backdrop-blur-xl p-10 md:p-16 rounded-[3rem] shadow-2xl border border-white/10 text-slate-200">
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-brand-secondary/20 text-brand-secondary mb-8 border border-brand-secondary/30 shadow-[0_0_15px_rgba(14,165,233,0.2)]">
            <FileText className="h-8 w-8" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Terms of Service</h1>
          <p className="mb-8 text-lg font-light">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-8 font-light leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
              <p>By accessing or using the AgriCopilot platform, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Service Usage</h2>
              <p>AgriCopilot provides AI-driven recommendations based on available data. While we strive for extreme accuracy, agricultural outcomes are inherently affected by unpredictable natural factors. Our insights should be used as highly informed guidance rather than absolute guarantees.</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Account Responsibilities</h2>
              <p>You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password. You must provide accurate farm data to ensure the integrity of the AI models.</p>
            </section>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
