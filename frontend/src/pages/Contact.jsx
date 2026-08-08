import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [focusedInput, setFocusedInput] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '36bfe2a1-d9c4-4e0a-9ce5-514fceb95132',
          ...formData
        })
      });

      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
        style={{ backgroundImage: 'url(/indian_farm_home_1785433633952.png)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-950/80 to-slate-950/95"></div>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-sm font-medium mb-6 backdrop-blur-md">
            <Mail className="h-4 w-4" />
            Get in Touch
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white tracking-tight drop-shadow-md">
            Ready to <span className="text-gradient">Upgrade</span>?
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
            Have questions about enterprise deployment, API access, or just want to chat? Send us a message and we'll get back to you directly.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 md:p-14 rounded-[2.5rem] relative overflow-hidden shadow-2xl group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none mix-blend-overlay"></div>
            
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-20 relative z-10"
                >
                  <div className="h-24 w-24 rounded-full bg-emerald-500/20 flex items-center justify-center mb-8 border border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="h-12 w-12 text-emerald-400" />
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-4">Message Sent Successfully!</h2>
                  <p className="text-slate-300 text-lg mb-8 max-w-md mx-auto font-light">
                    Thank you for reaching out, {formData.name.split(' ')[0] || 'there'}. We have received your message and will reply to {formData.email} shortly.
                  </p>
                  <button 
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({ name: '', email: '', message: '' });
                    }}
                    className="px-8 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-all"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-10 relative z-10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Name Input */}
                    <div className="relative group">
                      <input 
                        type="text" 
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        onFocus={() => setFocusedInput('name')}
                        onBlur={() => setFocusedInput(null)}
                        className="block w-full px-4 pt-6 pb-3 text-white bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-primary focus:bg-white/10 transition-all peer"
                        placeholder=" "
                      />
                      <label 
                        htmlFor="name" 
                        className={`absolute left-4 top-5 text-slate-400 pointer-events-none transition-all duration-300 transform -translate-y-4 scale-75 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-brand-primary ${focusedInput === 'name' || formData.name ? 'text-brand-primary scale-75 -translate-y-4' : ''}`}
                      >
                        Full Name
                      </label>
                    </div>

                    {/* Email Input */}
                    <div className="relative group">
                      <input 
                        type="email" 
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        onFocus={() => setFocusedInput('email')}
                        onBlur={() => setFocusedInput(null)}
                        className="block w-full px-4 pt-6 pb-3 text-white bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-primary focus:bg-white/10 transition-all peer"
                        placeholder=" "
                      />
                      <label 
                        htmlFor="email" 
                        className={`absolute left-4 top-5 text-slate-400 pointer-events-none transition-all duration-300 transform -translate-y-4 scale-75 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-brand-primary ${focusedInput === 'email' || formData.email ? 'text-brand-primary scale-75 -translate-y-4' : ''}`}
                      >
                        Email Address
                      </label>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="relative group">
                    <textarea 
                      id="message"
                      rows="5"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      onFocus={() => setFocusedInput('message')}
                      onBlur={() => setFocusedInput(null)}
                      className="block w-full px-4 pt-6 pb-3 text-white bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-brand-primary focus:bg-white/10 transition-all peer resize-none"
                      placeholder=" "
                    ></textarea>
                    <label 
                      htmlFor="message" 
                      className={`absolute left-4 top-5 text-slate-400 pointer-events-none transition-all duration-300 transform -translate-y-4 scale-75 origin-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-brand-primary ${focusedInput === 'message' || formData.message ? 'text-brand-primary scale-75 -translate-y-4' : ''}`}
                    >
                      How can we help you?
                    </label>
                  </div>

                  <motion.button 
                    type="submit" 
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className={`w-full sm:w-auto inline-flex items-center justify-center px-12 py-4 text-lg font-bold rounded-xl text-white ${isSubmitting ? 'bg-emerald-800 cursor-not-allowed' : 'bg-gradient-primary shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]'} transition-all mt-4`}
                  >
                    {isSubmitting ? (
                      <div className="h-6 w-6 border-2 border-white border-r-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-3 h-5 w-5" />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
