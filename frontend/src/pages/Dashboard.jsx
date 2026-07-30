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
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, bg: '/indian_farm_dashboard_1785433655292.png' },
  { id: 'recommendations', label: 'AI Crop Planner', icon: Sparkles, bg: '/farm_bg.png' },
  { id: 'market', label: 'Market & Weather', icon: LineChart, bg: '/indian_farm_about_1785433644542.png' },
  { id: 'schemes', label: 'Subsidies & Schemes', icon: Landmark, bg: '/indian_farm_home_1785433633952.png' },
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
      setLoading(true);
      setError(null);
      const response = await getDashboardData();
      setDashboard(response.data.data);
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
        <div className="text-center py-8 text-emerald-100/50 text-sm">
          <Sprout className="w-12 h-12 text-emerald-400/50 mx-auto mb-3" />
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
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-500 border-r-transparent"></div>
          <p className="mt-4 text-emerald-400 font-medium">Booting AI Core...</p>
        </div>
      </div>
    );
  }

  if (needsSetup) {
    return <FarmSetup onComplete={fetchDashboard} />;
  }

  if (error || !dashboard) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="text-center p-8 glass-panel max-w-md w-full">
          <p className="text-red-400 font-medium mb-4">{error || "Failed to parse data"}</p>
          <Button onClick={fetchDashboard}>Retry Connection</Button>
        </div>
      </div>
    );
  }

  const { farmId, farmName, stats, insights, activities } = dashboard;
  const currentBg = TABS.find(t => t.id === activeTab)?.bg;

  return (
    <div 
      className="min-h-screen relative overflow-hidden p-4 md:p-8 pt-28 md:pt-32 transition-colors duration-700"
      style={{
        backgroundImage: `url(${currentBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-slate-900/80 z-0 backdrop-blur-[4px] transition-all duration-700"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Section - Welcome Banner */}
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
              Command Center
            </h1>
            <div className="flex items-center text-emerald-200/80 mt-2 gap-2 font-medium text-sm">
              <MapPin className="h-4 w-4 text-emerald-400" />
              <span>{farmName} • {dashboard.location?.name || 'India'}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button className="p-2.5 rounded-xl glass-panel text-emerald-100 hover:text-white transition-colors shrink-0">
                <Bell className="h-5 w-5" />
              </button>
              <div className="flex-1 sm:flex-none text-center sm:text-left text-sm font-semibold text-emerald-100 glass-panel px-4 py-2.5 rounded-xl truncate">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </div>
            </div>
            <Button onClick={() => setIsAiChatModalOpen(true)} className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 border-none shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              Chat with Copilot
            </Button>
          </div>
        </header>

        {/* Dashboard Sub-Navigation */}
        <div className="flex overflow-x-auto custom-scrollbar gap-2 mb-10 p-2 glass-panel rounded-2xl border border-emerald-500/20 backdrop-blur-md">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] scale-100' 
                  : 'text-emerald-100/70 hover:text-white hover:bg-white/10 scale-95'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

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
                    color="text-blue-400"
                    bg="bg-blue-400/20"
                    cardBg="bg-slate-900/40 border-slate-700/50 hover:border-blue-500/50"
                  />
                  <StatCard 
                    title="Crop Health" 
                    value={stats.cropHealth.value} 
                    trend={stats.cropHealth.trend} 
                    trendUp={stats.cropHealth.trendUp}
                    icon={Sprout} 
                    color="text-emerald-400"
                    bg="bg-emerald-400/20"
                    cardBg="bg-slate-900/40 border-slate-700/50 hover:border-emerald-500/50"
                  />
                  <StatCard 
                    title="Yield Forecast" 
                    value={stats.yieldForecast.value} 
                    trend={stats.yieldForecast.trend} 
                    trendUp={stats.yieldForecast.trendUp}
                    icon={BarChart3} 
                    color="text-indigo-400"
                    bg="bg-indigo-400/20"
                    cardBg="bg-slate-900/40 border-slate-700/50 hover:border-indigo-500/50"
                  />
                  <StatCard 
                    title="Active Alerts" 
                    value={stats.activeAlerts.value} 
                    trend={stats.activeAlerts.trend} 
                    trendUp={stats.activeAlerts.trendUp}
                    icon={Bot} 
                    color="text-amber-400"
                    bg="bg-amber-400/20"
                    cardBg="bg-slate-900/40 border-slate-700/50 hover:border-amber-500/50"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Active Crops */}
                  <div className="lg:col-span-2 glass-panel p-8 rounded-[2rem] border-emerald-500/20 shadow-lg bg-slate-900/50">
                    <div className="flex justify-between items-center mb-6 border-b border-emerald-500/20 pb-4">
                      <h2 className="text-xl font-bold text-white">Active Crop Sectors</h2>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setIsAddCropModalOpen(true)} className="flex items-center gap-1 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/20 bg-transparent">
                          <Plus className="w-4 h-4" /> Add Crop
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {renderedCrops}
                    </div>
                  </div>

                  {/* Sidebar Column */}
                  <div className="space-y-8">
                    {/* AI Insights Widget */}
                    <div className="glass-panel p-8 rounded-[2rem] border-emerald-500/20 shadow-lg relative overflow-hidden bg-slate-900/50">
                      <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-emerald-500/20 blur-[60px] rounded-full pointer-events-none" />
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6 border-b border-emerald-500/20 pb-4">
                          <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400 border border-emerald-500/30">
                            <Bot className="h-5 w-5" />
                          </div>
                          <h2 className="text-xl font-bold text-emerald-300">Copilot Insights</h2>
                        </div>
                        
                        <div className="space-y-4">
                          {insights.length === 0 ? (
                            <div className="text-emerald-100/50 text-sm">No new insights.</div>
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
                    <div className="glass-panel p-8 rounded-[2rem] border-emerald-500/20 shadow-lg bg-slate-900/50">
                      <h2 className="text-xl font-bold text-white mb-6 border-b border-emerald-500/20 pb-4">Recent Activity</h2>
                      <div className="relative pl-4 space-y-6 border-l border-emerald-500/30 ml-2">
                        {activities.length === 0 ? (
                          <div className="text-emerald-100/50 text-sm">No recent activity.</div>
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

function StatCard({ title, value, trend, trendUp, icon: Icon, color, bg, cardBg = "glass-panel" }) {
  return (
    <motion.div 
      animate={{ y: [0, -5, 0], rotateZ: [0, 0.5, -0.5, 0] }}
      transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
      className={`${cardBg} p-6 rounded-[2rem] transform-style-3d shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-shadow duration-500`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${bg} ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full border ${trendUp ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-red-500/20 text-red-300 border-red-500/30'}`}>
          {trendUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {trend}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-emerald-100/70 mb-1">{title}</p>
        <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
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
    <div className="flex items-center justify-between p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
          <Sprout className="h-5 w-5 text-emerald-400" />
        </div>
        <div>
          <h4 className="font-semibold text-white">{name}</h4>
          <p className="text-xs text-emerald-100/60 font-medium mt-0.5">{area}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 text-right">
        <div className="w-24">
          <div className="flex justify-between text-xs font-bold text-emerald-100/80 mb-1.5">
            <span>Health</span>
            <span>{health}%</span>
          </div>
          <div className="w-full h-1.5 bg-emerald-900/50 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.8)]" style={{ width: `${health}%` }}></div>
          </div>
        </div>
        <button 
          onClick={handleDelete}
          disabled={isDeleting}
          className="p-2 text-emerald-100/40 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
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
    <div className={`p-4 rounded-xl border ${urgent ? 'bg-red-500/20 border-red-400/40' : 'bg-emerald-500/10 border-emerald-500/20'}`}>
      <div className="flex items-center gap-2.5 mb-2">
        {urgent && <div className="h-2 w-2 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)] animate-pulse" />}
        <h4 className="font-semibold text-sm text-white">{title}</h4>
      </div>
      <p className="text-emerald-100/70 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function ActivityItem({ title, time, desc }) {
  return (
    <div className="relative">
      <div className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-emerald-400 bg-slate-900 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
      <h4 className="text-sm font-semibold text-white">{title}</h4>
      <p className="text-xs text-emerald-100/70 font-medium my-1">{desc}</p>
      <p className="text-[10px] text-emerald-400/80 uppercase tracking-wider font-semibold">{time}</p>
    </div>
  );
}
