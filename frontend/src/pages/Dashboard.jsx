import { Cloud, Sprout, BarChart3, Bot, MapPin, Droplets, Sun, Wind, Bell, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, Button } from '../components/ui';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 relative overflow-hidden p-4 md:p-8 transition-colors duration-300">
      {/* Background gradients for a subtle, premium look */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Section - Welcome Banner */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Overview
            </h1>
            <div className="flex items-center text-slate-500 dark:text-slate-400 mt-2 gap-2 font-medium text-sm">
              <MapPin className="h-4 w-4 text-emerald-500" />
              <span>Green Acres Farm, California</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button className="p-2.5 rounded-xl text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-700 transition-colors dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 shrink-0">
                <Bell className="h-5 w-5" />
              </button>
              <div className="flex-1 sm:flex-none text-center sm:text-left text-sm font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 truncate">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </div>
            </div>
            <Button className="w-full sm:w-auto">Generate Report</Button>
          </div>
        </header>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard 
            title="Weather Score" 
            value="85/100" 
            trend="+2.4%" 
            trendUp={true}
            icon={Cloud} 
            color="text-blue-500"
            bg="bg-blue-500/10"
          />
          <StatCard 
            title="Crop Health" 
            value="92%" 
            trend="+1.2%" 
            trendUp={true}
            icon={Sprout} 
            color="text-emerald-500"
            bg="bg-emerald-500/10"
          />
          <StatCard 
            title="Yield Forecast" 
            value="1,240 lbs" 
            trend="-0.4%" 
            trendUp={false}
            icon={BarChart3} 
            color="text-indigo-500"
            bg="bg-indigo-500/10"
          />
          <StatCard 
            title="Active Alerts" 
            value="4 New" 
            trend="Action Req." 
            trendUp={false}
            icon={Bot} 
            color="text-amber-500"
            bg="bg-amber-500/10"
          />
        </div>

        {/* Main Dashboard Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Weather Widget */}
            <Card className="relative overflow-hidden p-0 border-0 shadow-lg dark:shadow-none bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800/50">
              <div className="p-8 md:p-10">
                <div className="flex justify-between items-start mb-8">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Micro-Climate</h2>
                  <Button variant="outline" size="sm">Details</Button>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 mb-8">
                  <div className="flex items-center gap-6">
                    <Sun className="h-16 w-16 text-amber-400 drop-shadow-sm" />
                    <div>
                      <div className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tighter">72°</div>
                      <div className="text-slate-500 dark:text-slate-400 font-medium mt-1">Partly Cloudy</div>
                    </div>
                  </div>
                  <div className="flex gap-6 sm:gap-10">
                    <div>
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1 text-sm font-medium">
                        <Droplets className="h-4 w-4 text-blue-500" /> Humidity
                      </div>
                      <div className="text-xl font-bold text-slate-900 dark:text-white">45%</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1 text-sm font-medium">
                        <Wind className="h-4 w-4 text-teal-500" /> Wind
                      </div>
                      <div className="text-xl font-bold text-slate-900 dark:text-white">12 mph</div>
                    </div>
                  </div>
                </div>

                {/* Micro-chart */}
                <div className="h-32 w-full flex items-end gap-2 mt-8">
                  {[40, 50, 45, 60, 70, 65, 80, 75, 85, 90, 85, 80].map((h, i) => (
                    <div key={i} className="flex-1 w-full relative group">
                      <div 
                        className="w-full bg-emerald-500/20 hover:bg-emerald-500 dark:bg-emerald-500/30 dark:hover:bg-emerald-400 rounded-t-md transition-colors duration-300"
                        style={{ height: `${h}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Crop Recommendations Widget */}
            <Card className="p-8 border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Active Crop Sectors</h2>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              <div className="space-y-3">
                <CropRow name="Winter Wheat" area="Sector A • 40 acres" health={92} />
                <CropRow name="Soybeans" area="Sector B • 25 acres" health={78} />
                <CropRow name="Corn" area="Sector C • 50 acres" health={88} />
              </div>
            </Card>

          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            
            {/* AI Insights Widget */}
            <Card className="bg-slate-900 border-slate-800 text-white relative overflow-hidden shadow-xl dark:shadow-none p-8">
              <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400 border border-emerald-500/30">
                    <Bot className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-bold">Copilot Insights</h2>
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
                </div>
                
                <Button className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 text-white border-0 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  Chat with Copilot
                </Button>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-8 border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Recent Activity</h2>
              <div className="relative pl-4 space-y-6 border-l border-slate-200 dark:border-slate-700 ml-2">
                <ActivityItem title="Fertilizer applied" time="2 hours ago" desc="Sector A - Nitrogen mix" />
                <ActivityItem title="AI Report generated" time="Yesterday" desc="Weekly yield forecast completed." />
                <ActivityItem title="System update" time="2 days ago" desc="New weather model deployed successfully." />
              </div>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, trendUp, icon: Icon, color, bg }) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-xl ${bg} ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${trendUp ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'}`}>
          {trendUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {trend}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</p>
        <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{value}</p>
      </div>
    </Card>
  );
}

function CropRow({ name, area, health }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100/50 dark:border-slate-800/60 dark:bg-slate-800/30 dark:hover:bg-slate-800/50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-lg bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center">
          <Sprout className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-slate-100">{name}</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{area}</p>
        </div>
      </div>
      <div className="text-right w-24">
        <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
          <span>Health</span>
          <span>{health}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${health}%` }}></div>
        </div>
      </div>
    </div>
  );
}

function InsightCard({ title, desc, urgent }) {
  return (
    <div className={`p-4 rounded-xl border ${urgent ? 'bg-red-500/10 border-red-500/20' : 'bg-slate-800/50 border-slate-700/50'}`}>
      <div className="flex items-center gap-2.5 mb-2">
        {urgent && <div className="h-2 w-2 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)] animate-pulse" />}
        <h4 className="font-semibold text-sm text-white">{title}</h4>
      </div>
      <p className="text-slate-300 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function ActivityItem({ title, time, desc }) {
  return (
    <div className="relative">
      <div className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-emerald-500 bg-white dark:bg-slate-900" />
      <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h4>
      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium my-1">{desc}</p>
      <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">{time}</p>
    </div>
  );
}
