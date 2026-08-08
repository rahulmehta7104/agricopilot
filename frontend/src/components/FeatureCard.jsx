import { motion } from 'framer-motion';

export default function FeatureCard({ icon: Icon, title, description, image }) {
  return (
    <div className="group relative w-full h-[400px] cursor-pointer rounded-[2rem] overflow-hidden bg-slate-900 border border-transparent dark:border-white/10 shadow-lg">
      
      {/* Background Image that zooms on hover */}
      <div 
        className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-110"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* Dark overlay that darkens on hover to reveal text better */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10 transition-opacity duration-500 opacity-80 group-hover:opacity-95"></div>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
        <div className="transform transition-transform duration-500 ease-out translate-y-8 group-hover:translate-y-0">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-brand-primary/20 text-brand-primary mb-4 backdrop-blur-md border border-brand-primary/30 shadow-sm">
            <Icon className="h-6 w-6" />
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          
          {/* Description fades in and slides up */}
          <p className="text-slate-300 leading-relaxed font-light text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
