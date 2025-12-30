
import React, { useState } from 'react';
import { 
  Files, 
  Search, 
  Filter, 
  Plus, 
  FileText, 
  ShieldCheck, 
  Download, 
  History, 
  MoreVertical, 
  AlertCircle,
  Folder,
  ChevronRight,
  ShieldAlert,
  ArrowUpRight,
  ArrowLeft,
  Lock,
  HardHat,
  Scale,
  Briefcase,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Activity,
  Gavel,
  Shield,
  Bell
} from 'lucide-react';
import { ProjectDocument, ComplianceRequirement, AppView } from '../types';

interface DocumentsViewProps {
  setView?: (view: AppView) => void;
}

const mockGlobalDocuments: ProjectDocument[] = [
  { id: 'g1', name: 'Standard Employment Agreement', category: 'Contract', type: 'PDF', size: '1.8 MB', updatedAt: '2024-05-12', versions: [{ version: 'v3', date: '2024-05-12', author: 'HR', url: '#' }] },
  { id: 'g2', name: 'General Safety Protocol v4', category: 'Report', type: 'PDF', size: '5.4 MB', updatedAt: '2024-08-20', versions: [{ version: 'v4', date: '2024-08-20', author: 'HSE Dept', url: '#' }] },
  { id: 'g3', name: 'Company Insurance Master', category: 'Insurance', type: 'PDF', size: '12.1 MB', updatedAt: '2024-01-01', versions: [{ version: 'v1', date: '2024-01-01', author: 'Admin', url: '#' }] },
];

const mockGlobalCompliance: ComplianceRequirement[] = [
  { id: 'c1', title: 'State Licensing Renewal', category: 'Legal', status: 'Compliant', expiryDate: '2025-12-01', reminderSent: false },
  { id: 'c2', title: 'Heavy Mach. HSE Audit', category: 'Safety', status: 'Pending', reminderSent: false },
  { id: 'c3', title: 'Worksite Liability Bond', category: 'Insurance', status: 'Action Required', expiryDate: '2024-11-15', reminderSent: true },
];

const mockIncidentStats = [
  { label: 'Safety Incidents', count: 2, trend: 'Down 12%', color: 'text-amber-500' },
  { label: 'Env. Breaches', count: 0, trend: 'Stable', color: 'text-emerald-500' },
  { label: 'Regulatory Fines', count: 1, trend: 'New', color: 'text-rose-500' },
];

const DocumentsView: React.FC<DocumentsViewProps> = ({ setView }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <button 
        onClick={() => setView?.(AppView.DASHBOARD)}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-black uppercase text-[10px] tracking-widest transition-colors group mb-2"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
      </button>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500">Compliance & Legal Center</h1>
          <p className="text-slate-500 italic">Enterprise digital asset vault and regulatory oversight center.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition-all">
            <ShieldCheck size={18} className="text-blue-500" /> Compliance Audit
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 shadow-xl transition-all">
            <Plus size={18} /> New Document
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar Nav & Expiry Alerts */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Folder size={18} className="text-amber-500" /> Vault Folders
             </h3>
             <div className="space-y-2">
                {[
                  { label: 'All Documents', count: 42, icon: Files },
                  { label: 'Project Contracts', count: 12, icon: FileText },
                  { label: 'Blueprints & DWG', count: 8, icon: HardHat },
                  { label: 'Legal & Permits', count: 15, icon: Scale },
                  { label: 'Insurance & HSE', count: 7, icon: ShieldCheck },
                ].map((folder, i) => (
                   <button
                     key={i}
                     onClick={() => setActiveCategory(folder.label)}
                     className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${activeCategory === folder.label ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
                   >
                      <div className="flex items-center gap-3">
                         <folder.icon size={16} />
                         {folder.label}
                      </div>
                      <span className="text-[10px] opacity-60 font-black">{folder.count}</span>
                   </button>
                ))}
             </div>
          </div>

          <div className="bg-rose-600 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <ShieldAlert size={150} />
             </div>
             <div className="relative z-10">
                <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-4 flex items-center gap-2">
                   <AlertCircle size={14} /> Critical Expiry alerts
                </h4>
                <div className="space-y-4">
                  <div className="p-3 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-md">
                    <p className="text-[10px] font-black uppercase mb-1">Insurance Bond #22</p>
                    <p className="text-sm font-bold italic">Expires in 3 days</p>
                  </div>
                  <div className="p-3 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-md">
                    <p className="text-[10px] font-black uppercase mb-1">State Crane Permit</p>
                    <p className="text-sm font-bold italic">Expired Oct 20</p>
                  </div>
                </div>
                <button className="w-full py-3 mt-6 bg-white text-rose-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                   Manage Alerts
                </button>
             </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Gavel size={18} className="text-blue-500" /> Regulatory Watch
             </h3>
             <div className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                   <p className="text-[10px] font-black text-blue-600 uppercase mb-1">Municipal Update</p>
                   <p className="text-xs text-slate-600 leading-relaxed font-medium">New earthquake retrofitting laws effective Jan 1st.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                   <p className="text-[10px] font-black text-amber-600 uppercase mb-1">HSE Directive</p>
                   <p className="text-xs text-slate-600 leading-relaxed font-medium">Mandatory Heat Stress protocols for sites &gt;30°C.</p>
                </div>
             </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-9 space-y-6">
           {/* Global Safety & Incident Summary */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockIncidentStats.map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-between">
                   <div className="flex justify-between items-start mb-4">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                      <span className={`text-[9px] font-black uppercase ${stat.trend.includes('Down') ? 'text-emerald-500' : 'text-amber-500'}`}>{stat.trend}</span>
                   </div>
                   <div className="flex items-end justify-between">
                      <p className={`text-4xl font-black italic tracking-tighter ${stat.color}`}>{stat.count}</p>
                      <button className="text-[10px] font-black text-blue-500 uppercase hover:underline">View</button>
                   </div>
                </div>
              ))}
           </div>

           {/* Enterprise Document Registry */}
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                 <div>
                    <h3 className="text-xl font-black text-slate-900 italic">Enterprise Registry</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Master Digital Ledger</p>
                 </div>
                 <div className="relative w-64 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500" size={16} />
                    <input type="text" placeholder="Search master files..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-amber-500" />
                 </div>
              </div>

              <div className="space-y-4">
                 {mockGlobalDocuments.map(doc => (
                    <div key={doc.id} className="p-5 bg-slate-50 border border-slate-100 rounded-3xl hover:bg-white hover:border-amber-500 hover:shadow-lg transition-all group flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="p-3 bg-white rounded-2xl shadow-sm"><FileText size={20} className="text-slate-400" /></div>
                          <div>
                             <p className="text-sm font-black text-slate-900">{doc.name}</p>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{doc.category} • {doc.size} • v{doc.versions[0].version} • Updated {doc.updatedAt}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-3">
                          <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors" title="History"><History size={18}/></button>
                          <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors" title="Download"><Download size={18}/></button>
                          <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><MoreVertical size={18}/></button>
                       </div>
                    </div>
                 ))}
              </div>
              <button className="w-full mt-8 py-4 bg-slate-50 text-slate-400 border border-slate-200 border-dashed rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-amber-500 hover:text-amber-500 transition-all">
                Load Archive (2480+ Files)
              </button>
           </div>

           {/* Legal Compliance Matrix */}
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
              <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2 italic">
                 <ShieldCheck size={24} className="text-emerald-500" /> Global Compliance Matrix
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {mockGlobalCompliance.map(comp => (
                    <div key={comp.id} className="p-6 bg-slate-50 border border-slate-100 rounded-3xl flex flex-col justify-between group hover:border-blue-500 transition-all">
                       <div className="flex justify-between items-start mb-6">
                          <div>
                             <p className="text-base font-black text-slate-900 leading-tight">{comp.title}</p>
                             <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">{comp.category}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${
                             comp.status === 'Compliant' ? 'bg-emerald-100 text-emerald-700' : 
                             comp.status === 'Action Required' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                             {comp.status}
                          </span>
                       </div>
                       <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200/50">
                          <div>
                             <p className="text-[10px] text-slate-500 italic font-medium">Valid until: {comp.expiryDate || 'N/A'}</p>
                             {comp.reminderSent && <p className="text-[9px] text-amber-600 font-bold uppercase mt-0.5 flex items-center gap-1"><Bell size={10}/> Reminder Sent</p>}
                          </div>
                          <button className="text-[10px] font-black text-blue-600 uppercase hover:underline flex items-center gap-1">
                             Full Status <ArrowUpRight size={14}/>
                          </button>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Safety Scoreboard & AI Audit */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                    <Activity size={200} />
                 </div>
                 <h4 className="text-amber-500 font-black uppercase tracking-widest text-[10px] mb-4">Enterprise Safety Performance</h4>
                 <div className="space-y-8 relative z-10">
                    <div className="flex items-end gap-4">
                       <p className="text-6xl font-black italic tracking-tighter">482</p>
                       <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-2 pb-1">Days since last LTI</p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                       <div>
                          <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Global Audit Pass</p>
                          <p className="text-2xl font-black">94.2%</p>
                       </div>
                       <div>
                          <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Unresolved Hazards</p>
                          <p className="text-2xl font-black text-rose-400">4</p>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-between">
                 <div>
                    <h4 className="text-slate-900 font-black italic text-xl mb-2 flex items-center gap-2">
                       <Lock size={20} className="text-blue-500" /> Automated Verification
                    </h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                       Our Gemini-powered engine automatically scans subcontractor insurance uploads for forged dates and coverage gaps against the Global Registry.
                    </p>
                 </div>
                 <div className="pt-8 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase bg-emerald-50 px-3 py-1.5 rounded-xl">
                       <CheckCircle2 size={14} /> Monitoring active
                    </div>
                    <button className="text-[10px] font-black text-blue-600 uppercase hover:underline">Audit Log</button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsView;
