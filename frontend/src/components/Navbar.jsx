import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, LogOut } from 'lucide-react';
import { ThemeToggle } from './ui';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hideOnRoutes = ['/login', '/register'];
  if (hideOnRoutes.includes(location.pathname)) {
    return null;
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <nav 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'glass-panel border-b border-emerald-500/20 shadow-lg' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
            <div className="p-2 glass-panel rounded-2xl group-hover:scale-110 group-hover:rotate-3 group-hover:bg-emerald-500/20 transition-all duration-300 border border-emerald-400/30">
              <Leaf className="h-7 w-7 text-emerald-400" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors drop-shadow-md">
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
                    isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                  }`}>
                    {link.name}
                  </span>
                  
                  {/* Animated Underline */}
                  <span 
                    className={`absolute bottom-0 left-0 h-0.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} 
                  />
                </Link>
              );
            })}
          </div>

          {/* Right side - Theme Toggle & Premium Login Button */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-emerald-100">
                  {user.name || user.email || 'Logged In'}
                </span>
                <button
                  onClick={logout}
                  className="inline-flex items-center justify-center p-2 text-sm font-bold rounded-full text-slate-300 glass-panel hover:text-white hover:bg-emerald-500/20 transition-all duration-300"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold rounded-full text-white bg-emerald-600/90 backdrop-blur-sm border border-emerald-400/50 hover:bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all duration-300 transform hover:scale-105"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 focus:outline-none p-2 glass-panel rounded-xl transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute w-full left-0 origin-top overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 border-b border-emerald-500/20 shadow-xl glass-panel' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-4 pb-8 space-y-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-2xl text-base font-bold transition-all ${
                  isActive
                    ? 'text-emerald-300 bg-emerald-500/20 border border-emerald-400/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]'
                    : 'text-slate-200 hover:text-emerald-300 hover:bg-emerald-500/10'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-4 px-2">
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold rounded-full text-slate-200 glass-panel hover:bg-emerald-500/20 hover:text-white"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-6 py-3.5 text-base font-bold rounded-full text-white bg-emerald-600/90 border border-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
