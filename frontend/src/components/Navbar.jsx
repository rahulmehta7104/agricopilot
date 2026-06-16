import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Add subtle shadow when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)]' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
            <div className="p-2 bg-emerald-100/50 rounded-2xl group-hover:scale-110 group-hover:rotate-3 group-hover:bg-emerald-100 transition-all duration-300">
              <Leaf className="h-7 w-7 text-emerald-600" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
              AgriCopilot
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative group py-2"
                >
                  <span className={`text-sm font-semibold transition-colors duration-300 ${
                    isActive ? 'text-emerald-600' : 'text-slate-600 group-hover:text-emerald-600'
                  }`}>
                    {link.name}
                  </span>
                  
                  {/* Animated Underline */}
                  <span 
                    className={`absolute bottom-0 left-0 h-0.5 bg-emerald-500 rounded-full transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} 
                  />
                </Link>
              );
            })}
          </div>

          {/* Right side - Premium Login Button */}
          <div className="hidden md:flex items-center">
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold rounded-full text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all duration-300 transform hover:scale-105"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-500 hover:text-emerald-600 focus:outline-none p-2 bg-slate-50 rounded-xl transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute w-full left-0 origin-top overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 border-b border-white/20 shadow-xl' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/80 backdrop-blur-2xl px-4 pt-4 pb-8 space-y-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-2xl text-base font-bold transition-all ${
                  isActive
                    ? 'text-emerald-600 bg-emerald-50/80 shadow-sm border border-emerald-100/50'
                    : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50/80'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-4 px-2">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-6 py-3.5 text-base font-bold rounded-full text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-[0_4px_15px_rgba(16,185,129,0.3)]"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
