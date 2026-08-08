import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Cloud, Sprout, BarChart3, Bot, MapPin, Bell, ArrowUpRight, ArrowDownRight, Plus, Trash2, LayoutDashboard, LineChart, Landmark, Sparkles } from 'lucide-react';
import { Button } from '../components/ui';
import { motion, AnimatePresence } from 'framer-motion';
import { getDashboardData, deleteFarmCrop } from '../services/api';
import toast from 'react-hot-toast';
import FarmSetup from '../components/FarmSetup';
import AddCropModal from '../components/AddCropModal';
import AiChatModal from '../components/AiChatModal';
import WeatherWidget from '../components/widgets/WeatherWidget';
import MarketTrendWidget from '../components/widgets/MarketTrendWidget';
import SchemesCarousel from '../components/widgets/SchemesCarousel';
import CropRecommendationWidget from '../components/widgets/CropRecommendationWidget';

const TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'recommendations', label: 'AI Crop Planner', icon: Sparkles },
  { id: 'market', label: 'Market & Weather', icon: LineChart },
  { id: 'schemes', label: 'Subsidies & Schemes', icon: Landmark },
];

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [needsSetup, setNeedsSetup] = useState(false);
  const [isAddCropModalOpen, setIsAddCropModalOpen] = useState(false);
  const [isAiChatModalOpen, setIsAiChatModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const fetchDashboard = useCallback(async () => {
    try {
      // Check cache first for instant load
      let cached = null;
      try {
        cached = sessionStorage.getItem('agricopilot_dashboard_cache');
      } catch (e) {}
      
      if (cached) {
        setDashboard(JSON.parse(cached));
        setLoading(false);
        // Fetch in background to update silently
        getDashboardData().then(res => {
          setDashboard(res.data.data);
          try {
            sessionStorage.setItem('agricopilot_dashboard_cache', JSON.stringify(res.data.data));
          } catch (e) {}
        }).catch(() => {});
        return;
      }

      setLoading(true);
      setError(null);
      const response = await getDashboardData();
      setDashboard(response.data.data);
      try {
        sessionStorage.setItem('agricopilot_dashboard_cache', JSON.stringify(response.data.data));
      } catch (e) {}
      setNeedsSetup(false);
      setLoading(false);
    } catch (err) {
      if (err.response?.status === 404 && err.response?.data?.message?.includes('farm profile')) {
        setNeedsSetup(true);
      } else {
        setError('Failed to load dashboard data. Please try again.');
      }
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const handleDeleteCrop = useCallback(async (cropId) => {
    try {
      await deleteFarmCrop(cropId);
      toast.success('Crop deleted successfully');
      fetchDashboard();
    } catch (err) {
      toast.error('Failed to delete crop');
    }
  }, [fetchDashboard]);

  const crops = dashboard?.crops || [];

  const renderedCrops = useMemo(() => {
    if (!crops || crops.length === 0) {
      return (
        <div className="text-center py-8 text-slate-500 dark:text-emerald-100/50 text-sm">
          <Sprout className="w-12 h-12 text-slate-300 dark:text-emerald-400/50 mx-auto mb-3" />
          <p>No crops found in this farm.</p>
        </div>
      );
    }
    return crops.map((crop) => (
      <CropRow 
        key={crop.id} 
        id={crop.id}
        name={crop.cropName} 
        area={`${crop.season} • ${crop.soilType}`} 
        health={crop.health} 
        onDelete={handleDeleteCrop}
      />
    ));
  }, [crops, handleDeleteCrop]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-brand-primary border-r-transparent"></div>
          <p className="mt-4 text-brand-primary font-medium">Booting AI Core...</p>
        </div>
      </div>
    );
  }

  if (needsSetup) {
    return <FarmSetup onComplete={fetchDashboard} />;
  }

  if (error || !dashboard) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center p-8 glass-panel max-w-md w-full">
          <p className="text-red-500 font-medium mb-4">{error || "Failed to parse data"}</p>
          <Button onClick={fetchDashboard}>Retry Connection</Button>
        </div>
      </div>
    );
  }

  const { farmId, farmName, stats, insights, activities } = dashboard;

  return (
    <div className="min-h-screen relative overflow-hidden p-4 md:p-8 pt-28 md:pt-32 transition-colors duration-700 bg-slate-50 dark:bg-slate-950">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-20 z-0 pointer-events-none"></div>
      
      {/* Floating Glows */}
      <div className="absolute top-[10%] right-[10%] w-[40%] h-[40%] bg-brand-primary/20 dark:bg-brand-primary/10 rounded-full blur-[120px] animate-pulse-glow z-0 pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-[10%] w-[30%] h-[30%] bg-brand-accent/20 dark:bg-brand-accent/10 rounded-full blur-[120px] animate-pulse-glow z-0 pointer-events-none" style={{ animationDelay: '1.5s' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Section - Welcome Banner */}
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight drop-shadow-sm">
              Command Center
            </h1>
            <div className="flex items-center text-slate-600 dark:text-emerald-200/80 mt-2 gap-2 font-medium text-sm">
              <MapPin className="h-4 w-4 text-brand-primary" />
              <span>{farmName} • {dashboard.location?.name || 'India'}</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button className="p-2.5 rounded-xl glass-panel text-slate-600 dark:text-emerald-100 hover:text-brand-primary dark:hover:text-white transition-colors shrink-0">
                <Bell className="h-5 w-5" />
              </button>
              <div className="flex-1 sm:flex-none text-center sm:text-left text-sm font-semibold text-slate-700 dark:text-emerald-100 glass-panel px-4 py-2.5 rounded-xl truncate">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </div>
            </div>
            <Button onClick={() => setIsAiChatModalOpen(true)} className="w-full sm:w-auto bg-gradient-primary hover:scale-105 transition-transform border-none shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              Chat with Copilot
            </Button>
          </motion.div>
        </header>

        {/* Dashboard Sub-Navigation */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex overflow-x-auto custom-scrollbar gap-2 mb-10 p-2 rounded-2xl border border-slate-200 dark:border-emerald-500/20 backdrop-blur-[24px] bg-white/60 dark:bg-slate-800/80 shadow-sm">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-gradient-primary text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] scale-100' 
                  : 'text-slate-600 dark:text-emerald-100/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 scale-95'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Dynamic Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <>
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 perspective-1000">
                  <StatCard 
                    title="Weather Score" 
                    value={stats.weatherScore.value} 
                    trend={stats.weatherScore.trend} 
                    trendUp={stats.weatherScore.trendUp}
                    icon={Cloud} 
                    color="text-blue-500 dark:text-blue-400"
                    bg="bg-blue-500/10 dark:bg-blue-400/20"
                  />
                  <StatCard 
                    title="Crop Health" 
                    value={stats.cropHealth.value} 
                    trend={stats.cropHealth.trend} 
                    trendUp={stats.cropHealth.trendUp}
                    icon={Sprout} 
                    color="text-emerald-500 dark:text-emerald-400"
                    bg="bg-emerald-500/10 dark:bg-emerald-400/20"
                  />
                  <StatCard 
                    title="Yield Forecast" 
                    value={stats.yieldForecast.value} 
                    trend={stats.yieldForecast.trend} 
                    trendUp={stats.yieldForecast.trendUp}
                    icon={BarChart3} 
                    color="text-indigo-500 dark:text-indigo-400"
                    bg="bg-indigo-500/10 dark:bg-indigo-400/20"
                  />
                  <StatCard 
                    title="Active Alerts" 
                    value={stats.activeAlerts.value} 
                    trend={stats.activeAlerts.trend} 
                    trendUp={stats.activeAlerts.trendUp}
                    icon={Bot} 
                    color="text-amber-500 dark:text-amber-400"
                    bg="bg-amber-500/10 dark:bg-amber-400/20"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Active Crops */}
                  <div className="lg:col-span-2 p-8 rounded-[2rem] bg-white/60 dark:bg-slate-800/80 backdrop-blur-[24px] border border-slate-200 dark:border-emerald-500/20 shadow-lg">
                    <div className="flex justify-between items-center mb-6 border-b border-slate-200 dark:border-emerald-500/20 pb-4">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Active Crop Sectors</h2>
                      <Button variant="outline" size="sm" onClick={() => setIsAddCropModalOpen(true)} className="flex items-center gap-1 text-brand-primary border-brand-primary/40 hover:bg-brand-primary/10 bg-transparent">
                        <Plus className="w-4 h-4" /> Add Crop
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {renderedCrops}
                    </div>
                  </div>

                  {/* Sidebar Column */}
                  <div className="space-y-8">
                    {/* AI Insights Widget */}
                    <div className="p-8 rounded-[2rem] relative overflow-hidden group bg-white/60 dark:bg-slate-800/80 backdrop-blur-[24px] border border-slate-200 dark:border-emerald-500/20 shadow-lg">
                      <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-brand-primary/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-brand-primary/20 transition-colors" />
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6 border-b border-slate-200 dark:border-emerald-500/20 pb-4">
                          <div className="p-2 bg-brand-primary/10 rounded-lg text-brand-primary border border-brand-primary/20">
                            <Bot className="h-5 w-5" />
                          </div>
                          <h2 className="text-xl font-bold text-slate-900 dark:text-emerald-300">Copilot Insights</h2>
                        </div>
                        
                        <div className="space-y-4">
                          {insights.length === 0 ? (
                            <div className="text-slate-500 dark:text-emerald-100/50 text-sm">No new insights.</div>
                          ) : (
                            insights.map(insight => (
                              <InsightCard 
                                key={insight.id}
                                title={insight.title} 
                                desc={insight.desc} 
                                urgent={insight.urgent} 
                              />
                            ))
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="p-8 rounded-[2rem] bg-white/60 dark:bg-slate-800/80 backdrop-blur-[24px] border border-slate-200 dark:border-emerald-500/20 shadow-lg">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-emerald-500/20 pb-4">Recent Activity</h2>
                      <div className="relative pl-4 space-y-6 border-l border-slate-300 dark:border-emerald-500/30 ml-2">
                        {activities.length === 0 ? (
                          <div className="text-slate-500 dark:text-emerald-100/50 text-sm">No recent activity.</div>
                        ) : (
                          activities.map(activity => (
                            <ActivityItem 
                              key={activity.id}
                              title={activity.title} 
                              time={activity.time} 
                              desc={activity.desc} 
                            />
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'market' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full min-h-[60vh]">
                <WeatherWidget lat={dashboard.location?.latitude || 28.6139} lon={dashboard.location?.longitude || 77.2090} locationName={dashboard.location?.name || 'India'} />
                <MarketTrendWidget 
                  crops={dashboard.crops?.length > 0 ? dashboard.crops.map(c => c.cropName) : ['Wheat']} 
                  location={dashboard.location?.name || 'Punjab, India'} 
                />
              </div>
            )}

            {activeTab === 'recommendations' && (
              <div className="max-w-5xl mx-auto h-full min-h-[60vh]">
                <CropRecommendationWidget 
                  location={dashboard.location?.name || 'India'} 
                  initialSoilType={dashboard.soilType || 'Loamy'} 
                />
              </div>
            )}

            {activeTab === 'schemes' && (
              <div className="max-w-4xl mx-auto h-full min-h-[60vh]">
                <SchemesCarousel profile={`Farm: ${farmName}. Small scale farmer in India.`} />
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      <AddCropModal 
        isOpen={isAddCropModalOpen} 
        onClose={() => setIsAddCropModalOpen(false)} 
        farmId={farmId}
        onCropAdded={fetchDashboard}
      />

      <AiChatModal 
        isOpen={isAiChatModalOpen} 
        onClose={() => setIsAiChatModalOpen(false)} 
      />
    </div>
  );
}

function StatCard({ title, value, trend, trendUp, icon: Icon, color, bg }) {
  // Extract color name for dynamic shadows
  const colorName = color.split('-')[1];
  const shadowColor = colorName === 'emerald' ? 'rgba(16,185,129,0.3)' : 
                      colorName === 'blue' ? 'rgba(59,130,246,0.3)' : 
                      colorName === 'indigo' ? 'rgba(99,102,241,0.3)' : 
                      'rgba(245,158,11,0.3)';

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`relative p-6 rounded-[2rem] shadow-lg hover:shadow-xl transition-all duration-300 bg-white/60 dark:bg-slate-800/80 backdrop-blur-[24px] border border-slate-200 dark:border-emerald-500/20 overflow-hidden group`}
    >
      {/* Decorative radial gradient background */}
      <div className={`absolute -top-6 -right-6 w-32 h-32 ${bg} blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500`}></div>

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div 
          className={`p-3 rounded-2xl ${bg} ${color} border border-${colorName}-500/20`}
          style={{ boxShadow: `0 0 15px ${shadowColor}` }}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full border ${trendUp ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/30' : 'bg-red-500/10 text-red-600 dark:text-red-300 border-red-500/30'}`}>
          {trendUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {trend}
        </div>
      </div>
      <div className="relative z-10">
        <p className="text-sm font-medium text-slate-500 dark:text-emerald-100/70 mb-1">{title}</p>
        <p className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{value}</p>
      </div>
    </motion.div>
  );
}

function CropRow({ id, name, area, health, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      setIsDeleting(true);
      await onDelete(id);
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-emerald-500/20 bg-slate-50 dark:bg-slate-800/50 hover:bg-gradient-to-r hover:from-emerald-500/5 hover:to-transparent dark:hover:from-emerald-500/20 dark:hover:to-transparent transition-all duration-300 shadow-sm group">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 flex items-center justify-center">
          <Sprout className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-white">{name}</h4>
          <p className="text-xs text-slate-500 dark:text-emerald-100/60 font-medium mt-0.5">{area}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 text-right">
        <div className="w-24 hidden sm:block">
          <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-emerald-100/80 mb-1.5">
            <span>Health</span>
            <span>{health}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 dark:bg-emerald-900/50 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" style={{ width: `${health}%` }}></div>
          </div>
        </div>
        <button 
          onClick={handleDelete}
          disabled={isDeleting}
          className="p-2 text-slate-400 dark:text-emerald-100/40 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/20 rounded-lg transition-colors"
          title="Delete Crop"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function InsightCard({ title, desc, urgent }) {
  return (
    <div className={`p-4 rounded-xl border ${urgent ? 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-400/40' : 'bg-emerald-50 dark:bg-emerald-500/5 border-emerald-200 dark:border-emerald-500/20'}`}>
      <div className="flex items-center gap-2.5 mb-2">
        {urgent && <div className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse" />}
        <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{title}</h4>
      </div>
      <p className="text-slate-600 dark:text-emerald-100/70 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function ActivityItem({ title, time, desc }) {
  return (
    <div className="relative">
      <div className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-brand-primary bg-white dark:bg-slate-900 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h4>
      <p className="text-xs text-slate-600 dark:text-emerald-100/70 font-medium my-1">{desc}</p>
      <p className="text-[10px] text-brand-primary uppercase tracking-wider font-semibold">{time}</p>
    </div>
  );
}
