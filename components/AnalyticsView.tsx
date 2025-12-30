
import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Truck, 
  Sparkles, 
  AlertTriangle, 
  PieChart, 
  Activity, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownLeft,
  ArrowLeft,
  ChevronRight,
  Info,
  Clock,
  Briefcase,
  Zap,
  Target,
  ShieldAlert,
  Gauge,
  History,
  Timer,
  Wallet,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar, 
  Cell, 
  PieChart as RePieChart, 
  Pie,
  LineChart,
  Line
} from 'recharts';
import { getProjectInsights, getDeepIntelligence } from '../services/geminiService';
import { AppView } from '../types';

interface AnalyticsViewProps {
  setView?: (view: AppView) => void;
}

type AnalyticsTab = 'intelligence' | 'financials' | 'projects' | 'workforce' | 'assets';

const mockFinanceData = [
  { name: 'Jul', revenue: 180000, costs: 140000, profit: 40000 },
  { name: 'Aug', revenue: 220000, costs: 165000, profit: 55000 },
  { name: 'Sep', revenue: 210000, costs: 180000, profit: 30000 },
  { name: 'Oct', revenue: 280000, costs: 195000, profit: 85000 },
  { name: 'Nov', revenue: 310000, costs: 210000, profit: 100000 },
  { name: 'Dec', revenue: 350000, costs: 230000, profit: 120000 },
];

const mockProjectPulse = [
  { id: '1', name: 'Grand Oak Apartments', progress: 72, schedule: 68, budget: 1.2, actual: 1.1, health: 'good' },
  { id: '2', name: 'Riverside Residency Ph 1', progress: 45, schedule: 55, budget: 2.4, actual: 2.2, health: 'warning' },
  { id: '3', name: 'Metro Hub Commercial', progress: 15, schedule: 12, budget: 4.8, actual: 4.9, health: 'critical' },
  { id: '4', name: 'Indus Factory Expansion', progress: 92, schedule: 95, budget: 0.8, actual: 0.82, health: 'good' },
];

const mockProductivity = [
  { day: 'Mon', completion: 82, attendance: 96 },
  { day: 'Tue', completion: 88, attendance: 94 },
  { day: 'Wed', completion: 75, attendance: 92 },
  { day: 'Thu', completion: 92, attendance: 98 },
  { day: 'Fri', completion: 94, attendance: 95 },
  { day: 'Sat', completion: 40, attendance: 30 },
  { day: 'Sun', completion: 20, attendance: 15 },
];

const mockAssetUsage = [
  { name: 'Tower Cranes', value: 85, color: '#f59e0b' },
  { name: 'Excavators', value: 62, color: '#3b82f6' },
  { name: 'Mixers', value: 45, color: '#10b981' },
  { name: 'Scaffolding', value: 94, color: '#6366f1' },
];

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<AnalyticsTab>('intelligence');
  const [aiInsight, setAiInsight] = useState<any>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [deepIntelligence, setDeepIntelligence] = useState<Record<string, any>>({});

  useEffect(() => {
    const fetchGeneralInsights = async () => {
      setLoadingAi(true);
      const data = await getProjectInsights({
        activeView: activeTab,
        stats: activeTab === 'financials' ? mockFinanceData : mockProjectPulse
      });
      setAiInsight(data);
      setLoadingAi(false);
    };
    fetchGeneralInsights();

    if (activeTab === 'intelligence') {
      const fetchDeepIntel = async () => {
        const types: Array<'cost' | 'delay' | 'risk' | 'benchmarking'> = ['cost', 'delay', 'risk', 'benchmarking'];
        const results: any = {};
        for (const type of types) {
          results[type] = await getDeepIntelligence(type, { projects: mockProjectPulse, finance: mockFinanceData });
        }
        setDeepIntelligence(results);
      };
      fetchDeepIntel();
    }
  }, [activeTab]);

  const renderIntelligenceCard = (key: string, icon: any, color: string, title: string) => {
    const data = deepIntelligence[key];
    const Icon = icon;

    return (
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8 flex flex-col group hover:border-amber-500 transition-all">
        <div className="flex justify-between items-start mb-6">
          <div className={`p-4 rounded-2xl ${color} shadow-lg shadow-black/5 group-hover:scale-110 transition-transform`}>
            <Icon size={24} />
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Confidence Score</p>
            <p className={`text-xl font-black italic ${data?.score > 80 ? 'text-emerald-500' : 'text-amber-500'}`}>
              {data?.score ? `${data.score}%` : '---'}
            </p>
          </div>
        </div>
        
        <h3 className="text-xl font-black text-slate-900 mb-2 italic">{title}</h3>
        
        {!data ? (
          <div className="flex-1 flex flex-col justify-center space-y-4 animate-pulse">
            <div className="h-4 bg-slate-100 rounded w-full"></div>
            <div className="h-4 bg-slate-100 rounded w-3/4"></div>
            <div className="h-10 bg-slate-50 rounded-xl w-full mt-4"></div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            <p className="text-sm text-slate-500 font-medium leading-relaxed italic mb-6">"{data.headline}"</p>
            
            <div className="space-y-4 mb-8">
              {data.warnings.slice(0, 2).map((w: string, i: number) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(244,63,94,0.3)]"></div>
                  <p className="text-xs text-slate-700 font-bold leading-tight italic">{w}</p>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-6 border-t border-slate-50">
               <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-800 transition-all">
                 Review Full Analysis <ArrowRight size={14} />
               </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <button 
        onClick={() => setView?.(AppView.DASHBOARD)}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-black uppercase text-[10px] tracking-widest transition-colors group mb-2"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight italic">Intelligence & Predictive Analytics</h1>
          <p className="text-slate-500 italic font-medium">Advanced data modeling for real-time construction oversight.</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-slate-900 rounded-2xl text-white shadow-xl shadow-slate-900/10 border border-slate-800">
          <Zap size={18} className="text-amber-500 fill-amber-500" />
          <span className="text-xs font-black uppercase tracking-widest italic">BuildOS Neural Active</span>
        </div>
      </div>

      <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm w-fit overflow-x-auto scrollbar-hide">
        {[
          { id: 'intelligence', label: 'AI Intelligence', icon: Sparkles },
          { id: 'financials', label: 'Financial Health', icon: TrendingUp },
          { id: 'projects', label: 'Project Performance', icon: Briefcase },
          { id: 'workforce', label: 'Workforce Output', icon: Users },
          { id: 'assets', label: 'Asset Utilization', icon: Truck },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as AnalyticsTab)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'intelligence' && (
        <div className="space-y-6 animate-in zoom-in-95 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {renderIntelligenceCard('cost', Wallet, 'bg-emerald-100 text-emerald-600', 'Cost Overrun Prediction')}
            {renderIntelligenceCard('delay', Timer, 'bg-amber-100 text-amber-600', 'Project Delay Forecasting')}
            {renderIntelligenceCard('risk', ShieldAlert, 'bg-rose-100 text-rose-600', 'Critical Risk Analysis')}
            {renderIntelligenceCard('benchmarking', Gauge, 'bg-blue-100 text-blue-600', 'Market Price Benchmark')}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-12 opacity-5 scale-125">
                <Target size={300} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-amber-500 text-slate-900 rounded-2xl shadow-xl shadow-amber-500/20"><Zap size={24} /></div>
                  <h2 className="text-3xl font-black italic tracking-tighter">Strategic Portfolio Projection</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
                   <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 italic">Projected Completion</p>
                      <p className="text-3xl font-black italic text-emerald-400 tracking-tighter">92.4%</p>
                      <p className="text-xs text-slate-400 mt-1 italic font-medium">Weighted Site Average</p>
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 italic">Estimated Margin</p>
                      <p className="text-3xl font-black italic text-white tracking-tighter">24.2%</p>
                      <p className="text-xs text-slate-400 mt-1 italic font-medium">Post-inflation adjusted</p>
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 italic">Risk Exposure</p>
                      <p className="text-3xl font-black italic text-rose-400 tracking-tighter">Low</p>
                      <p className="text-xs text-slate-400 mt-1 italic font-medium">Gemini AI Shield Active</p>
                   </div>
                </div>

                <div className="h-64 w-full">
                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockFinanceData}>
                         <defs>
                            <linearGradient id="colorProj" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/>
                               <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                            </linearGradient>
                         </defs>
                         <Area type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={4} fill="url(#colorProj)" />
                      </AreaChart>
                   </ResponsiveContainer>
                </div>
                <p className="text-center text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mt-6 italic">Next 6 Months Estimated Growth Pattern</p>
              </div>
            </div>

            <div className="space-y-6">
               <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-1000"><Briefcase size={120}/></div>
                  <h3 className="font-black text-lg text-slate-900 mb-6 italic">Job Matching Intelligence</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium mb-8 italic">
                    "3 tenders in your region perfectly match your available equipment fleet and verified masonry expertise."
                  </p>
                  <div className="space-y-4 mb-8">
                     {[
                        { title: "Metro Hub Expansion", score: 98 },
                        { title: "City Bridge Refit", score: 94 },
                     ].map((job, i) => (
                        <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                           <span className="text-xs font-black text-slate-900 italic">{job.title}</span>
                           <span className="text-xs font-black text-amber-500 italic">{job.score}% Match</span>
                        </div>
                     ))}
                  </div>
                  <button className="w-full py-4 bg-amber-500 text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-amber-500/20 hover:bg-amber-400 transition-all">
                     Open Bid Intelligence
                  </button>
               </div>

               <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                  <h3 className="font-black text-lg text-slate-900 mb-6 italic">Smart Alerts</h3>
                  <div className="space-y-4">
                     <div className="flex gap-4 p-4 bg-rose-50 rounded-2xl border border-rose-100 group cursor-pointer hover:bg-rose-100 transition-all">
                        <AlertTriangle className="text-rose-500 shrink-0" size={20} />
                        <div>
                           <p className="text-xs font-black text-rose-900 italic">Steel Price Drift</p>
                           <p className="text-[10px] text-rose-600 font-medium italic">Regional prices up 4% this morning.</p>
                        </div>
                     </div>
                     <div className="flex gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-100 group cursor-pointer hover:bg-blue-100 transition-all">
                        <Clock className="text-blue-500 shrink-0" size={20} />
                        <div>
                           <p className="text-xs font-black text-blue-900 italic">Weather Shutdown Risk</p>
                           <p className="text-[10px] text-blue-600 font-medium italic">80% Rain probability for Site Alpha.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'financials' && (
        <div className="space-y-6 animate-in slide-in-from-left-4 duration-500">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                 <h3 className="font-black text-xl italic mb-8">Revenue vs Costs Trend</h3>
                 <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={mockFinanceData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 'bold'}} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                          <Tooltip 
                            contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)'}}
                          />
                          <Area type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={4} fill="#f59e0b" fillOpacity={0.1} />
                          <Area type="monotone" dataKey="costs" stroke="#0f172a" strokeWidth={2} fill="#0f172a" fillOpacity={0.05} />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                 <h3 className="font-black text-xl italic mb-8">Monthly Profit Margin</h3>
                 <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={mockFinanceData}>
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                          <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none'}} />
                          <Bar dataKey="profit" fill="#10b981" radius={[10, 10, 0, 0]} />
                       </BarChart>
                    </ResponsiveContainer>
                 </div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
           <div className="grid grid-cols-1 gap-6">
              {mockProjectPulse.map((project) => (
                <div key={project.id} className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm hover:border-amber-500 transition-all group overflow-hidden relative">
                   <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><Activity size={150}/></div>
                   
                   <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10 relative z-10">
                      <div className="flex items-center gap-6">
                         <div className={`p-4 rounded-2xl shadow-xl shadow-black/5 ${
                           project.health === 'good' ? 'bg-emerald-100 text-emerald-600' : 
                           project.health === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'
                         }`}>
                           <Activity size={28} />
                         </div>
                         <div>
                            <h3 className="text-2xl font-black text-slate-900 italic tracking-tight mb-1">{project.name}</h3>
                            <div className="flex items-center gap-2">
                               <span className={`h-2 w-2 rounded-full ${project.health === 'good' ? 'bg-emerald-500' : project.health === 'warning' ? 'bg-amber-500' : 'bg-rose-500 animate-pulse'}`}></span>
                               <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] italic">Status: {project.health}</p>
                            </div>
                         </div>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                         <div className="px-6 border-l border-slate-100">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Schedule</p>
                            <p className={`text-lg font-black italic ${project.schedule >= project.progress ? 'text-emerald-500' : 'text-rose-500'}`}>
                               {project.schedule}%
                            </p>
                         </div>
                         <div className="px-6 border-l border-slate-100">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Budget</p>
                            <p className="text-lg font-black text-slate-900 italic">${project.budget}M</p>
                         </div>
                         <div className="px-6 border-l border-slate-100">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Actual</p>
                            <p className="text-lg font-black text-slate-900 italic">${project.actual}M</p>
                         </div>
                         <div className="px-6 border-l border-slate-100">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Variance</p>
                            <p className={`text-lg font-black italic ${project.actual <= project.budget ? 'text-emerald-500' : 'text-rose-500'}`}>
                               {project.actual <= project.budget ? '+' : '-'}{Math.abs(((project.budget - project.actual) / project.budget) * 100).toFixed(1)}%
                            </p>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-4 relative z-10">
                      <div className="flex justify-between items-end">
                         <div className="flex items-center gap-2">
                            <Target size={16} className="text-amber-500" />
                            <span className="text-xs font-black text-slate-500 uppercase tracking-widest italic">Construction Progress Ledger</span>
                         </div>
                         <div className="flex items-end gap-1">
                            <span className="text-3xl font-black text-slate-900 italic tracking-tighter">{project.progress}</span>
                            <span className="text-xs text-slate-400 font-bold mb-1.5 uppercase">%</span>
                         </div>
                      </div>
                      
                      {/* Visual Progress Bar Requested */}
                      <div className="h-6 bg-slate-50 rounded-full overflow-hidden shadow-inner border border-slate-100 p-1 group/bar relative">
                         <div 
                           className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-1000 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.5)]" 
                           style={{ width: `${project.progress}%` }}
                         >
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[progress-bar-stripes_1s_linear_infinite]"></div>
                         </div>
                      </div>

                      <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase italic tracking-widest">
                         <span className="flex items-center gap-1.5"><Clock size={12}/> Est. Handover: Q4 2024</span>
                         <span className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-emerald-500" /> Milestone 4 Cleared</span>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}

      {activeTab === 'workforce' && (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <h3 className="font-black text-xl italic mb-8">Site Output & Attendance</h3>
              <div className="h-80 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockProductivity}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 'bold'}} dy={10} />
                       <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                       <Tooltip contentStyle={{borderRadius: '16px', border: 'none'}} />
                       <Line type="monotone" dataKey="completion" stroke="#f59e0b" strokeWidth={4} dot={{r: 6, fill: '#f59e0b'}} />
                       <Line type="monotone" dataKey="attendance" stroke="#3b82f6" strokeWidth={2} dot={{r: 4, fill: '#3b82f6'}} />
                    </LineChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'assets' && (
        <div className="space-y-6 animate-in zoom-in-95 duration-500">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col items-center">
                 <h3 className="font-black text-xl italic mb-10 w-full text-left">Equipment Utilization</h3>
                 <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <RePieChart>
                          <Pie 
                            data={mockAssetUsage} 
                            innerRadius={60} 
                            outerRadius={80} 
                            paddingAngle={5} 
                            dataKey="value"
                          >
                             {mockAssetUsage.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={entry.color} />
                             ))}
                          </Pie>
                          <Tooltip />
                       </RePieChart>
                    </ResponsiveContainer>
                 </div>
                 <div className="grid grid-cols-2 gap-6 mt-6 w-full">
                    {mockAssetUsage.map((asset, i) => (
                       <div key={i} className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full" style={{backgroundColor: asset.color}}></div>
                          <span className="text-xs font-black text-slate-600 uppercase italic">{asset.name}</span>
                          <span className="text-xs font-bold text-slate-900 ml-auto">{asset.value}%</span>
                       </div>
                    ))}
                 </div>
              </div>
              <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white flex flex-col justify-between overflow-hidden relative">
                 <div className="absolute top-0 right-0 p-8 opacity-10"><Truck size={120}/></div>
                 <div className="relative z-10">
                    <h3 className="font-black text-xl italic text-amber-500 mb-6 uppercase tracking-tighter">Maintenance Pulse</h3>
                    <p className="text-sm text-slate-400 italic mb-10">All specialized machinery currently operating at 94% efficiency. Zero critical faults reported in last 24h.</p>
                 </div>
                 <button className="relative z-10 w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-amber-500 transition-all">
                    Full Fleet Diagnostics
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsView;
