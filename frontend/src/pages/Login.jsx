import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-emerald-200/40 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-green-200/30 blur-[120px]" />
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Card */}
        <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_60px_rgb(0,0,0,0.05)] border border-white/80 p-8 sm:p-12">
          
          <div className="text-center mb-10">
            <div className="mx-auto h-16 w-16 bg-gradient-to-br from-emerald-100 to-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <Leaf className="h-8 w-8 text-emerald-600" />
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Welcome back</h2>
            <p className="mt-3 text-base text-slate-500 font-medium">
              Sign in to your AgriCopilot account
            </p>
          </div>

          <form className="space-y-6" action="#" method="POST" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">
                  Email address
                </label>
                <div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="farmer@example.com"
                    className="appearance-none block w-full px-5 py-3.5 bg-white/50 border border-slate-200 rounded-2xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent sm:text-sm font-medium transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-bold text-slate-700 mb-2">
                  Password
                </label>
                <div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="••••••••"
                    className="appearance-none block w-full px-5 py-3.5 bg-white/50 border border-slate-200 rounded-2xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent sm:text-sm font-medium transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm font-semibold text-slate-600 cursor-pointer">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-bold text-emerald-600 hover:text-emerald-500 transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-[0_8px_20px_rgba(16,185,129,0.2)] text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                Sign in
              </button>
            </div>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500 font-medium">
              Don't have an account?{' '}
              <a href="#" className="font-bold text-emerald-600 hover:text-emerald-500 cursor-pointer">
                Contact sales
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
