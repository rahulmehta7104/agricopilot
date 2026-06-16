import { Cloud, Sprout, BarChart3, Bot, MapPin, Droplets, Sun, Wind, Bell } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden p-4 md:p-8">
      {/* Background gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-emerald-100/40 blur-[100px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-100/40 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Section - Welcome Banner */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Welcome back, John</h1>
            <div className="flex items-center text-slate-500 mt-3 gap-2 font-medium">
              <MapPin className="h-4 w-4 text-emerald-500" />
              <span>Green Acres Farm, California</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-3 bg-white/60 backdrop-blur-xl rounded-full border border-white/60 shadow-sm text-slate-600 hover:text-emerald-600 hover:bg-white transition-all">
              <Bell className="h-5 w-5" />
            </button>
            <div className="text-sm font-semibold text-slate-600 bg-white/60 backdrop-blur-xl px-5 py-3 rounded-full shadow-sm border border-white/60">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </div>
          </div>
        </header>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard 
            title="Weather Score" 
            value="85/100" 
            trend="+2%" 
            trendUp={true}
            icon={Cloud} 
            color="blue"
          />
          <StatCard 
            title="Crop Health" 
            value="Optimal" 
            trend="Stable" 
            trendUp={true}
            icon={Sprout} 
            color="emerald"
          />
          <StatCard 
            title="Yield Forecast" 
            value="1,240 lbs" 
            trend="+12%" 
            trendUp={true}
            icon={BarChart3} 
            color="indigo"
          />
          <StatCard 
            title="AI Insights" 
            value="4 New" 
            trend="Action Req." 
            trendUp={false}
            icon={Bot} 
            color="amber"
          />
        </div>

        {/* Main Dashboard Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Weather Widget */}
            <div className="bg-white/60 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-amber-100/30 blur-[80px] rounded-full pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Micro-Climate Overview</h2>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 pb-10 border-b border-slate-200/50 gap-8">
                  <div className="flex items-center gap-6">
                    <Sun className="h-20 w-20 text-amber-400 drop-shadow-md" />
                    <div>
                      <div className="text-5xl font-extrabold text-slate-900 tracking-tighter">72°</div>
                      <div className="text-slate-500 font-medium mt-1">Partly Cloudy</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-10 gap-y-5 bg-white/50 p-6 rounded-3xl border border-white">
                    <div className="flex items-center gap-3 text-slate-700 font-medium">
                      <Droplets className="h-6 w-6 text-blue-500" />
                      <span>Humidity 45%</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700 font-medium">
                      <Wind className="h-6 w-6 text-teal-500" />
                      <span>Wind 12 mph</span>
                    </div>
                  </div>
                </div>
                {/* Fake Chart Area */}
                <div className="h-48 w-full flex items-end px-2 gap-3 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-50/50 to-transparent rounded-2xl border-b-2 border-emerald-200" />
                  {[40, 50, 45, 60, 70, 65, 80, 75, 85, 90, 85, 80].map((h, i) => (
                    <div key={i} className="relative z-10 w-full rounded-t-lg bg-gradient-to-t from-emerald-500 to-emerald-300 opacity-90 shadow-sm hover:opacity-100 transition-opacity cursor-pointer group" style={{ height: `${h}%` }}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">{h}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Crop Recommendations Widget */}
            <div className="bg-white/60 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Active Crop Sectors</h2>
                <button className="text-sm text-emerald-600 font-semibold hover:text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full hover:bg-emerald-100 transition-colors">View All</button>
              </div>
              <div className="space-y-4">
                <CropRow name="Winter Wheat" area="Sector A - 40 acres" health={92} />
                <CropRow name="Soybeans" area="Sector B - 25 acres" health={78} />
                <CropRow name="Corn" area="Sector C - 50 acres" health={88} />
              </div>
            </div>

          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            
            {/* AI Insights Widget */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl shadow-emerald-900/10 border border-slate-800 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-500/10 blur-[60px] rounded-full pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 bg-emerald-500/20 rounded-xl text-emerald-400 border border-emerald-500/30">
                    <Bot className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold">AI Copilot Insights</h2>
                </div>
                <div className="space-y-4">
                  <InsightCard 
                    title="Irrigation Warning" 
                    desc="Soil moisture dropping in Sector B. Suggest irrigating tomorrow morning." 
                    urgent={true} 
                  />
                  <InsightCard 
                    title="Favorable Market" 
                    desc="Corn futures are up 3% today. Consider forward contracting." 
                    urgent={false} 
                  />
                  <InsightCard 
                    title="Pest Forecast" 
                    desc="Conditions ripe for aphids next week. Prepare preventative measures." 
                    urgent={false} 
                  />
                </div>
                <button className="w-full mt-8 py-4 px-4 bg-emerald-600 hover:bg-emerald-500 rounded-2xl text-sm font-semibold shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all transform hover:-translate-y-0.5 cursor-pointer">
                  Chat with Copilot
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/60 backdrop-blur-2xl rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Recent Activity</h2>
              <div className="relative pl-5 space-y-8 border-l-2 border-slate-100 ml-3">
                <ActivityItem title="Fertilizer applied" time="2 hours ago" desc="Sector A - Nitrogen mix" />
                <ActivityItem title="AI Report generated" time="Yesterday" desc="Weekly yield forecast completed." />
                <ActivityItem title="System update" time="2 days ago" desc="New weather model deployed successfully." />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, trendUp, icon: Icon, color }) {
  const colorMap = {
    blue: 'text-blue-600 bg-blue-50 border-blue-100/50',
    emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100/50',
    indigo: 'text-indigo-600 bg-indigo-50 border-indigo-100/50',
    amber: 'text-amber-600 bg-amber-50 border-amber-100/50',
  };

  return (
    <div className="bg-white/60 backdrop-blur-xl p-6 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-white/60 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3.5 rounded-2xl border ${colorMap[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <span className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-sm ${trendUp ? 'bg-emerald-50 text-emerald-700 border border-emerald-100/50' : 'bg-amber-50 text-amber-700 border border-amber-100/50'}`}>
          {trend}
        </span>
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-500 mb-1">{title}</p>
        <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</p>
      </div>
    </div>
  );
}

function CropRow({ name, area, health }) {
  return (
    <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-50/80 border border-slate-100 hover:bg-slate-50 transition-colors">
      <div className="flex items-center gap-5">
        <div className="h-12 w-12 rounded-2xl bg-emerald-100/50 flex items-center justify-center border border-emerald-100">
          <Sprout className="h-6 w-6 text-emerald-600" />
        </div>
        <div>
          <h4 className="font-bold text-slate-900">{name}</h4>
          <p className="text-sm text-slate-500 font-medium">{area}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm font-extrabold text-slate-900 mb-2">{health}% Health</div>
        <div className="w-32 h-2.5 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full" style={{ width: `${health}%` }}></div>
        </div>
      </div>
    </div>
  );
}

function InsightCard({ title, desc, urgent }) {
  return (
    <div className={`p-5 rounded-2xl border backdrop-blur-md ${urgent ? 'bg-red-500/10 border-red-500/20' : 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-800 transition-colors'}`}>
      <div className="flex items-center gap-3 mb-2">
        {urgent && <div className="h-2.5 w-2.5 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.8)] animate-pulse" />}
        <h4 className="font-bold text-sm text-white">{title}</h4>
      </div>
      <p className="text-slate-300 text-sm leading-relaxed font-light">{desc}</p>
    </div>
  );
}

function ActivityItem({ title, time, desc }) {
  return (
    <div className="relative">
      <div className="absolute -left-[29px] top-1.5 h-4 w-4 rounded-full border-[3px] border-emerald-500 bg-white shadow-sm" />
      <h4 className="text-base font-bold text-slate-900">{title}</h4>
      <p className="text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">{time}</p>
      <p className="text-sm text-slate-600 font-medium">{desc}</p>
    </div>
  );
}
