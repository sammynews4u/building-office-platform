
import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  Sparkles,
  ShoppingCart,
  Hammer,
  ArrowRight,
  Package,
  HardHat,
  Receipt,
  X,
  Download,
  Printer,
  ChevronRight,
  Building2,
  Calendar,
  DollarSign,
  Construction,
  ShieldCheck,
  Truck,
  FileText,
  Workflow,
  UserPlus,
  Network,
  Globe,
  Coins,
  Banknote,
  Search,
  Zap,
  Loader2,
  Radar,
  FileCheck,
  CreditCard,
  History
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getProjectInsights } from '../services/geminiService';
import { AppView } from '../types';

interface DashboardViewProps {
  setView?: (view: AppView) => void;
}

const mockChartData = [
  { name: 'Mon', revenue: 4500, costs: 3800 },
  { name: 'Tue', revenue: 5200, costs: 4100 },
  { name: 'Wed', revenue: 4800, costs: 4500 },
  { name: 'Thu', revenue: 6100, costs: 4200 },
  { name: 'Fri', revenue: 5500, costs: 4800 },
  { name: 'Sat', revenue: 2000, costs: 1500 },
  { name: 'Sun', revenue: 1500, costs: 1200 },
];

const mockRevenueTransactions = [
  { id: 'TX-9901', client: 'Skyline Developers', project: 'Riverside Residency', amount: 45000, date: 'Oct 22, 2024', status: 'Cleared' },
  { id: 'TX-9902', client: 'Urban-X Corp', project: 'Metro Hub Ph 1', amount: 12500, date: 'Oct 20, 2024', status: 'Cleared' },
  { id: 'TX-9903', client: 'Green Valley Villas', project: 'Lakeside Heights', amount: 84000, date: 'Oct 18, 2024', status: 'Cleared' },
  { id: 'TX-9904', client: 'Indus-Heavy Co', project: 'Indus Factory Expansion', amount: 22000, date: 'Oct 15, 2024', status: 'Cleared' },
];

const DashboardView: React.FC<DashboardViewProps> = ({ setView }) => {
  const [aiInsight, setAiInsight] = useState<any>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [isScraping, setIsScraping] = useState(false);
  const [showRevenueLedger, setShowRevenueLedger] = useState(false);
  const [selectedTxForReceipt, setSelectedTxForReceipt] = useState<any>(null);

  useEffect(() => {
    const fetchAiInsights = async () => {
      setLoadingAi(true);
      const data = await getProjectInsights({
        projectCount: 12,
        activeWorkers: 156,
        budgetUtilization: 0.82,
        delays: 2
      });
      setAiInsight(data);
      setLoadingAi(false);
    };
    fetchAiInsights();
  }, []);

  const handleTriggerScraper = () => {
    setIsScraping(true);
    setTimeout(() => {
      setIsScraping(false);
      setView?.(AppView.JOBS);
    }, 2000);
  };

  const stats = [
    { id: 'projects', label: 'Active Projects', value: '12', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-100' },
    { id: 'workforce', label: 'Workforce', value: '156', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
    { id: 'revenue', label: 'Revenue (MTD)', value: '$240k', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100', interactive: true },
    { id: 'delays', label: 'Delayed Tasks', value: '8', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-100' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500 relative pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic uppercase">Operations Hub</h1>
          <p className="text-slate-500 font-medium">Unified command for your construction enterprise assets.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-black text-slate-700 hover:bg-slate-50 shadow-sm transition-all italic">Intelligence PDF</button>
          <button className="px-8 py-3 bg-amber-500 text-slate-900 rounded-2xl text-sm font-black hover:bg-amber-600 shadow-xl shadow-amber-500/20 transition-all italic">+ New Site Launch</button>
        </div>
      </div>

      {/* 1. Marketplaces (Buy/Rent) */}
      <div className="space-y-6">
        <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.4em] px-2 flex items-center gap-3">
          <span className="w-8 h-px bg-slate-200"></span> 01. Inbound Sourcing
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <button 
            onClick={() => setView?.(AppView.MARKETPLACE)}
            className="bg-slate-900 p-10 rounded-[3rem] text-white flex flex-col md:flex-row items-start md:items-center gap-10 text-left group hover:scale-[1.01] transition-all shadow-2xl relative overflow-hidden"
          >
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                <Package size={300} />
              </div>
              <div className="h-20 w-20 rounded-3xl bg-amber-500 text-slate-900 flex items-center justify-center shrink-0 shadow-xl group-hover:rotate-6 transition-transform">
                <ShoppingCart size={32} />
              </div>
              <div className="flex-1 relative z-10 space-y-4">
                <div>
                  <h3 className="text-2xl font-black italic tracking-tighter mb-1 uppercase">Procurement Marketplace</h3>
                  <p className="text-slate-400 text-xs font-black uppercase tracking-widest italic opacity-60">Buy Materials & Rent Equipment</p>
                </div>
                
                <p className="text-xs text-slate-500 leading-relaxed max-w-md italic font-medium">
                  Entails digital sourcing of bulk raw materials (steel, cement) and heavy machinery rentals with regional delivery logistics.
                </p>

                <div className="pt-4 flex items-center gap-2 text-amber-500 font-black text-[10px] uppercase tracking-[0.2em]">
                    Source Assets <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
          </button>

          <button 
            onClick={() => setView?.(AppView.SERVICES_MARKETPLACE)}
            className="bg-white p-10 rounded-[3rem] border-4 border-slate-100 flex flex-col md:flex-row items-start md:items-center gap-10 text-left group hover:scale-[1.01] hover:border-amber-500 transition-all shadow-xl relative overflow-hidden"
          >
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
                <HardHat size={300} />
              </div>
              <div className="h-20 w-20 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-sm group-hover:-rotate-6 transition-transform">
                <Hammer size={32} />
              </div>
              <div className="flex-1 relative z-10 space-y-4">
                <div>
                  <h3 className="text-2xl font-black italic tracking-tighter mb-1 text-slate-900 uppercase">Subcontractor Services</h3>
                  <p className="text-slate-500 text-xs font-black uppercase tracking-widest italic opacity-60">Hire Specialized Labor</p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed max-w-md italic font-medium">
                  Entails bidding for trade-specific labor contracts, compliance verification, and milestone-linked payout protection.
                </p>

                <div className="pt-4 flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.2em]">
                    Invite Tenders <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
          </button>
        </div>
      </div>

      {/* 2. Active Products (Projects) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
           <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.4em] flex items-center gap-3">
             <span className="w-8 h-px bg-slate-200"></span> 02. Active Project Portfolio
           </h2>
           <button onClick={() => setView?.(AppView.PROJECTS)} className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline italic">Operational Command</button>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    <th className="pb-8">Active Worksite</th>
                    <th className="pb-8">Location</th>
                    <th className="pb-8">Milestone Progress</th>
                    <th className="pb-8">Sync Status</th>
                    <th className="pb-8 text-right">Access</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[1, 2, 3].map((p) => (
                    <tr key={p} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => setView?.(AppView.PROJECTS)}>
                      <td className="py-8 font-black text-slate-900 italic text-lg leading-none">Riverside Residency Ph {p}</td>
                      <td className="py-8 text-slate-500 text-xs font-black uppercase tracking-tight italic">Downtown Sector {p * 4}</td>
                      <td className="py-8 w-64">
                        <div className="flex items-center gap-4">
                          <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden shadow-inner">
                            <div className="bg-amber-500 h-full rounded-full transition-all duration-1000" style={{width: `${75 - p * 15}%`}}></div>
                          </div>
                          <span className="text-[11px] font-black text-slate-900 italic">{75 - p * 15}%</span>
                        </div>
                      </td>
                      <td className="py-8">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm">
                          <CheckCircle2 size={12} /> Active
                        </span>
                      </td>
                      <td className="py-8 text-right">
                         <button className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:text-amber-500 group-hover:bg-amber-50 transition-all shadow-sm">
                            <ChevronRight size={20} />
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
      </div>

      {/* 3 & 4. Outbound Outreach (Hiring & Selling) */}
      <div className="space-y-6">
        <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.4em] px-2 flex items-center gap-3">
          <span className="w-8 h-px bg-slate-200"></span> 03 & 04. Outreach & Liquidation
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* 3. Freelance Module */}
           <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group border border-white/5">
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                 <UserPlus size={300} />
              </div>
              <div className="relative z-10 space-y-6">
                 <div>
                    <h3 className="text-3xl font-black italic tracking-tighter leading-none mb-2">Freelance Tender Hub</h3>
                    <p className="text-slate-400 text-sm font-black uppercase tracking-widest italic opacity-60">Hire Independent Talent</p>
                 </div>
                 <p className="text-sm text-slate-400 font-medium italic leading-relaxed">
                    Entails opening specific project roles to the global independent workforce for day-rate site support.
                 </p>
                 <div className="flex gap-3 pt-2">
                    <button 
                      onClick={() => setView?.(AppView.JOBS)}
                      className="px-8 py-4 bg-amber-500 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-amber-400 transition-all flex items-center gap-2 active:scale-95 shadow-xl italic"
                    >
                      <UserPlus size={16} /> Publish Tender
                    </button>
                 </div>
              </div>
           </div>

           {/* 4. Material Sales Module */}
           <div className="bg-white p-10 rounded-[3.5rem] border-4 border-slate-100 shadow-xl relative overflow-hidden group hover:border-emerald-500 transition-all">
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                 <Coins size={300} />
              </div>
              <div className="relative z-10 space-y-6">
                 <div>
                    <h3 className="text-3xl font-black italic tracking-tighter leading-none mb-2 text-slate-900">Inventory Liquidation</h3>
                    <p className="text-slate-400 text-sm font-black uppercase tracking-widest italic opacity-60">Sell Construction Assets</p>
                 </div>
                 <p className="text-sm text-slate-500 font-medium italic leading-relaxed">
                    Entails listing surplus materials and idle machinery for direct sale or auction to other firms on BuildOS.
                 </p>
                 <div className="flex gap-3 pt-2">
                    <button 
                      onClick={() => setView?.(AppView.MARKETPLACE)}
                      className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center gap-2 active:scale-95 shadow-xl italic"
                    >
                      <Banknote size={16} /> List for Sale
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* 5 & 6. Intelligence & Billing */}
      <div className="space-y-6">
        <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.4em] px-2 flex items-center gap-3">
          <span className="w-8 h-px bg-slate-200"></span> 05 & 06. Discovery & Billing
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* 5. Job Scraping Module */}
           <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group border-2 border-amber-500/20">
              <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                 <Zap size={350} />
              </div>
              <div className="relative z-10 space-y-6">
                 <div>
                    <div className="flex items-center gap-3 text-amber-500 mb-2">
                       <Zap size={20} />
                       <span className="font-black text-[10px] tracking-[0.3em] uppercase">Intelligence Engine</span>
                    </div>
                    <h3 className="text-3xl font-black italic tracking-tighter leading-none">Automated Lead Scraping</h3>
                 </div>
                 <p className="text-sm text-slate-400 font-medium italic leading-relaxed">
                    Entails triggering AI to scan government portals for high-value tenders matching your firm's profile.
                 </p>
                 <div className="flex gap-3 pt-2">
                    <button 
                      onClick={handleTriggerScraper}
                      disabled={isScraping}
                      className="px-8 py-4 bg-amber-500 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-amber-400 shadow-2xl transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50 italic"
                    >
                      {isScraping ? <Loader2 size={18} className="animate-spin" /> : <Radar size={18} />}
                      {isScraping ? 'Scraping...' : 'Discover Tenders'}
                    </button>
                 </div>
              </div>
           </div>

           {/* 6. Invoicing & Receipting Module (New: For Project Owners) */}
           <div className="bg-white p-10 rounded-[3.5rem] border-4 border-slate-100 shadow-xl relative overflow-hidden group hover:border-emerald-500 transition-all">
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                 <Receipt size={300} />
              </div>
              <div className="relative z-10 space-y-6">
                 <div>
                    <h3 className="text-3xl font-black italic tracking-tighter leading-none mb-2 text-slate-900">Client Billing Hub</h3>
                    <p className="text-slate-400 text-sm font-black uppercase tracking-widest italic opacity-60">Invoice Project Owners</p>
                 </div>
                 <p className="text-sm text-slate-500 font-medium italic leading-relaxed">
                    Entails generating official tax invoices, tracking outstanding project balances, and issuing verified receipts upon payment.
                 </p>
                 <div className="flex gap-3 pt-2">
                    <button 
                      onClick={() => setView?.(AppView.INVOICE_GENERATOR)}
                      className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2 active:scale-95 shadow-xl italic"
                    >
                      <FileCheck size={16} /> Create Invoice
                    </button>
                    <button 
                      onClick={() => setShowRevenueLedger(true)}
                      className="px-6 py-4 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-100 transition-all italic"
                    >
                       Issue Receipt
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Performance Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <button 
            key={i} 
            disabled={!stat.interactive}
            onClick={() => stat.id === 'revenue' && setShowRevenueLedger(true)}
            className={`bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm text-left transition-all group ${stat.interactive ? 'hover:border-emerald-500 hover:shadow-xl active:scale-95 cursor-pointer ring-offset-2 focus:ring-2 focus:ring-emerald-500 outline-none' : 'cursor-default'}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform shadow-sm`}>
                <stat.icon size={22} />
              </div>
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">+12%</span>
            </div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest italic">{stat.label}</p>
            <div className="flex items-end justify-between mt-1">
              <h3 className="text-3xl font-black text-slate-900 italic tracking-tighter">{stat.value}</h3>
              {stat.interactive && <ArrowRight size={18} className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-all" />}
            </div>
          </button>
        ))}
      </div>

      {/* Financial Dynamics & Gemini Intel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm h-full">
            <div className="flex items-center justify-between mb-10">
              <h3 className="font-black text-xl italic uppercase tracking-tighter">Finance Dynamics</h3>
              <select className="text-[10px] font-black uppercase tracking-widest bg-slate-50 border-none rounded-2xl py-3 px-6 outline-none shadow-inner italic">
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
              </select>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 'bold'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.2)'}}
                  />
                  <Bar dataKey="revenue" fill="#f59e0b" radius={[8, 8, 0, 0]} barSize={28} />
                  <Bar dataKey="costs" fill="#0f172a" radius={[8, 8, 0, 0]} barSize={28} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-1000">
              <Sparkles size={180} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8 text-amber-500">
                <Sparkles size={28} />
                <span className="font-black text-xs tracking-[0.3em] uppercase">Gemini Intel</span>
              </div>
              {loadingAi ? (
                <div className="space-y-6 animate-pulse">
                  <div className="h-4 bg-white/5 rounded w-3/4"></div>
                  <div className="h-12 bg-white/5 rounded-[2rem] w-full"></div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2 italic">Portfolio Risk Level</p>
                    <span className="px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-400 text-[11px] font-black border border-rose-500/30 uppercase tracking-[0.2em]">
                      {aiInsight?.riskLevel || 'Nominal'}
                    </span>
                  </div>
                  <p className="text-base text-slate-300 italic leading-relaxed font-medium">
                    "{aiInsight?.summary || 'Analyzing global logistics data for material cost volatility...'}"
                  </p>
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    {aiInsight?.actionItems?.map((item: string, idx: number) => (
                      <div key={idx} className="flex gap-4 text-xs group/item">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.6)]"></div>
                        <span className="text-slate-400 font-medium group-hover/item:text-slate-200 transition-colors italic leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmed Revenue Ledger Modal (Receipt Generator) */}
      {showRevenueLedger && (
        <div className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
             <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-6">
                   <div className="p-5 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-500/20"><TrendingUp size={32} /></div>
                   <div>
                      <h2 className="text-3xl font-black text-slate-900 italic tracking-tight">Confirmed Revenue Ledger</h2>
                      <p className="text-[11px] text-slate-500 font-black tracking-[0.2em] uppercase italic">Verified Site Inflows • Oct 2024</p>
                   </div>
                </div>
                <button onClick={() => setShowRevenueLedger(false)} className="p-4 hover:bg-slate-200 rounded-full text-slate-400 transition-colors"><X size={28}/></button>
             </div>
             
             <div className="flex-1 overflow-y-auto p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                   <div className="p-10 bg-slate-900 text-white rounded-[3rem] shadow-xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform"><DollarSign size={120}/></div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic opacity-60">Total Monthly Clearing</p>
                      <h3 className="text-5xl font-black italic tracking-tighter">$163,500.00</h3>
                      <p className="text-[11px] text-emerald-400 font-black mt-6 flex items-center gap-2 uppercase tracking-widest"><CheckCircle2 size={16}/> All transactions PCI compliant</p>
                   </div>
                   <div className="p-10 bg-emerald-50 text-emerald-900 rounded-[3rem] border border-emerald-100 flex flex-col justify-center">
                      <h4 className="font-black text-xl mb-3 italic tracking-tight uppercase">Receipt Generation Service</h4>
                      <p className="text-sm text-emerald-700 font-medium italic leading-relaxed opacity-80">Select any cleared transaction below to generate an immutable, digital receipt for your enterprise clients.</p>
                   </div>
                </div>

                <div className="space-y-4">
                   {mockRevenueTransactions.map(tx => (
                      <div key={tx.id} className="p-8 bg-white border border-slate-100 rounded-[2.5rem] flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-emerald-500 hover:shadow-xl transition-all group">
                         <div className="flex items-center gap-6">
                            <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors shadow-inner">
                               <Receipt size={28}/>
                            </div>
                            <div>
                               <p className="font-black text-slate-900 italic text-xl leading-none mb-2">{tx.client}</p>
                               <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest">{tx.project} • {tx.date}</p>
                            </div>
                         </div>
                         <div className="flex items-center justify-between sm:justify-end gap-10">
                            <div className="text-right">
                               <p className="text-2xl font-black text-slate-900 italic tracking-tighter">${tx.amount.toLocaleString()}</p>
                               <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest mt-1 italic">{tx.status}</p>
                            </div>
                            <button 
                              onClick={() => setSelectedTxForReceipt(tx)}
                              className="px-6 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 shadow-lg transition-all flex items-center gap-2 active:scale-95 italic"
                            >
                               Generate <ChevronRight size={14}/>
                            </button>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Generated Receipt Viewer */}
      {selectedTxForReceipt && (
        <div className="fixed inset-0 z-[110] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-500 relative flex flex-col">
             <button 
               onClick={() => setSelectedTxForReceipt(null)}
               className="absolute top-8 right-8 p-3 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-400 transition-colors z-10 shadow-sm"
             >
                <X size={24}/>
             </button>

             <div className="flex-1 p-12 overflow-y-auto scrollbar-hide">
                <div className="border-4 border-slate-900 p-10 space-y-12 bg-white relative">
                   {/* Logo / Header */}
                   <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                         <div className="bg-slate-900 p-2 rounded-lg text-amber-500 shadow-lg"><Construction size={24}/></div>
                         <h1 className="text-2xl font-black italic tracking-tighter uppercase">BuildOS Enterprise</h1>
                      </div>
                      <div className="text-right">
                         <h2 className="text-3xl font-black italic text-slate-900 uppercase tracking-tighter leading-none">Official Receipt</h2>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">ID: {selectedTxForReceipt.id}</p>
                      </div>
                   </div>

                   {/* Details */}
                   <div className="grid grid-cols-2 gap-12 border-y border-slate-100 py-10">
                      <div className="space-y-4">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Received From:</p>
                         <div className="space-y-1">
                            <p className="text-lg font-black text-slate-900 italic">{selectedTxForReceipt.client}</p>
                            <p className="text-xs text-slate-500 font-medium italic">Project: {selectedTxForReceipt.project}</p>
                         </div>
                      </div>
                      <div className="space-y-4 text-right">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Date of Issue:</p>
                         <p className="text-lg font-black text-slate-900 italic">{selectedTxForReceipt.date}</p>
                         <div className="pt-4">
                            <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-lg uppercase border border-emerald-200">Verified Paid</span>
                         </div>
                      </div>
                   </div>

                   {/* Amount Table */}
                   <div className="space-y-6">
                      <div className="flex justify-between items-end border-b border-slate-100 pb-6">
                         <div>
                            <p className="text-sm font-black text-slate-900 italic">Project Milestone Drawdown</p>
                            <p className="text-[10px] text-slate-400 font-medium italic leading-relaxed max-w-[300px]">Electronic settlement for authorized site mobilization and architectural enclosures.</p>
                         </div>
                         <p className="text-xl font-black text-slate-900 italic">${selectedTxForReceipt.amount.toLocaleString()}.00</p>
                      </div>
                      <div className="flex justify-end pt-4">
                         <div className="w-64 space-y-3">
                            <div className="flex justify-between text-xs font-bold text-slate-400 uppercase italic">
                               <span>Subtotal</span>
                               <span>${selectedTxForReceipt.amount.toLocaleString()}.00</span>
                            </div>
                            <div className="flex justify-between text-xs font-bold text-slate-400 uppercase italic">
                               <span>Service Fee (0%)</span>
                               <span>$0.00</span>
                            </div>
                            <div className="h-px bg-slate-900/10"></div>
                            <div className="flex justify-between text-2xl font-black text-slate-900 italic tracking-tighter">
                               <span>Total Verified</span>
                               <span>${selectedTxForReceipt.amount.toLocaleString()}.00</span>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Security / Verification */}
                   <div className="pt-10 flex items-center justify-between opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                      <div className="flex items-center gap-3">
                         <ShieldCheck size={40} className="text-slate-300" />
                         <div>
                            <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest">BuildOS Verified Settlement</p>
                            <p className="text-[8px] font-mono text-slate-300 break-all max-w-[200px]">SHA256: 82a1c9e88b...d01f2</p>
                         </div>
                      </div>
                      <div className="h-16 w-16 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center">
                         <Building2 size={32} className="text-slate-200"/>
                      </div>
                   </div>
                </div>
             </div>

             <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
                <button className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-95 italic">
                   <Download size={18}/> Download PDF
                </button>
                <button className="flex-1 py-4 bg-white border-2 border-slate-200 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2 italic">
                   <Printer size={18}/> Print Copy
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardView;
