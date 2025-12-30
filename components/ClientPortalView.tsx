
import React, { useState } from 'react';
import { 
  Presentation, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  FileText, 
  MessageSquare,
  TrendingUp,
  MapPin,
  Calendar,
  Download,
  Search,
  Filter,
  Send,
  Star,
  Plus,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  LayoutDashboard,
  Files,
  Wallet,
  AlertCircle,
  MoreVertical,
  ThumbsUp,
  MessageCircle,
  History,
  Info
} from 'lucide-react';
import { Project, Milestone, ProjectDocument, Invoice, AppView } from '../types';

interface ClientPortalViewProps {
  setView?: (view: AppView) => void;
}

type PortalTab = 'dashboard' | 'documents' | 'financials' | 'messages';

const ClientPortalView: React.FC<ClientPortalViewProps> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<PortalTab>('dashboard');
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(0);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const milestones: Milestone[] = [
    { id: 'm1', name: 'Foundation Poured', status: 'Reached', dueDate: '12 Sep 2023', description: 'Main concrete slab completion' },
    { id: 'm2', name: 'Structural Framing', status: 'Reached', dueDate: '05 Oct 2023', description: 'Internal wall frameworks' },
    { id: 'm3', name: 'Roofing & Windows', status: 'Upcoming', dueDate: '20 Nov 2023', description: 'Weatherproofing and enclosure' },
    { id: 'm4', name: 'Interior Finishing', status: 'Upcoming', dueDate: '15 Jan 2024', description: 'Tiling and carpentry' },
  ];

  const sharedDocuments: ProjectDocument[] = [
    { id: 'doc1', name: 'Blueprint_A12.pdf', category: 'Drawing', type: 'PDF', size: '24.5 MB', updatedAt: 'Oct 15, 2023', versions: [], isSharedWithClient: true },
    { id: 'doc2', name: 'October_Site_Report.pdf', category: 'Report', type: 'PDF', size: '2.1 MB', updatedAt: 'Oct 20, 2023', versions: [], isSharedWithClient: true },
    { id: 'doc3', name: 'Structural_Audit_V2.pdf', category: 'Report', type: 'PDF', size: '4.8 MB', updatedAt: 'Oct 22, 2023', versions: [], isSharedWithClient: true },
    { id: 'doc4', name: 'Service_Agreement.pdf', category: 'Contract', type: 'PDF', size: '1.2 MB', updatedAt: 'Sep 01, 2023', versions: [], isSharedWithClient: true },
  ];

  const invoices: Invoice[] = [
    { id: 'inv1', invoiceNumber: 'INV-082', clientName: 'Alex Foreman', date: 'Oct 01, 2023', dueDate: 'Oct 15, 2023', items: [], subtotal: 245000, vatRate: 15, vatAmount: 36750, withholdingRate: 0, withholdingAmount: 0, grandTotal: 281750, amountPaid: 281750, status: 'Paid' },
    { id: 'inv2', invoiceNumber: 'INV-095', clientName: 'Alex Foreman', date: 'Oct 20, 2023', dueDate: 'Nov 04, 2023', items: [], subtotal: 120000, vatRate: 15, vatAmount: 18000, withholdingRate: 0, withholdingAmount: 0, grandTotal: 138000, amountPaid: 0, status: 'Sent' },
  ];

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for your feedback! Rating: ${rating}/5`);
    setShowFeedbackModal(false);
    setFeedbackText('');
    setRating(0);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <button 
        onClick={() => setView?.(AppView.DASHBOARD)}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-black uppercase text-[10px] tracking-widest transition-colors group mb-2"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight italic">Riverside Residency Ph 1</h1>
          <p className="text-slate-500 font-medium flex items-center gap-2">
            <MapPin size={14} className="text-slate-400" /> Downtown Sector 4 • <span className="text-amber-600 font-bold uppercase tracking-widest text-[10px]">Active Project</span>
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowFeedbackModal(true)}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <ThumbsUp size={18} className="text-amber-500" /> Give Feedback
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg"
          >
            <MessageSquare size={18} /> Contact Manager
          </button>
        </div>
      </div>

      {/* Portal Tabs */}
      <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm w-fit overflow-x-auto scrollbar-hide">
        {[
          { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
          { id: 'documents', label: 'Documents', icon: Files },
          { id: 'financials', label: 'Payments', icon: Wallet },
          { id: 'messages', label: 'Messages', icon: MessageCircle },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as PortalTab)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'dashboard' && (
        <div className="space-y-6 animate-in slide-in-from-left-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white md:col-span-2 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-10 opacity-5 scale-150 rotate-12">
                <Presentation size={250} />
              </div>
              <div className="relative z-10">
                <h2 className="text-amber-500 font-black uppercase tracking-widest text-[10px] mb-2">Construction Progress</h2>
                <div className="flex items-center gap-8 mb-10">
                  <div className="text-6xl font-black italic tracking-tighter">72%</div>
                  <div className="h-16 w-px bg-white/10"></div>
                  <div>
                    <p className="text-lg font-bold text-slate-300">Phase 2: Structural</p>
                    <p className="text-xs text-emerald-400 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                       <CheckCircle2 size={14}/> 4 Days Ahead of Schedule
                    </p>
                  </div>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden relative">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 w-[72%] rounded-full shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all duration-1000"></div>
                </div>
                <div className="mt-6 flex gap-12">
                   <div>
                      <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Target Handover</p>
                      <p className="font-bold">March 12, 2024</p>
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Current Milestone</p>
                      <p className="font-bold">Roofing & Weatherproofing</p>
                   </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2 italic">
                  <Wallet size={20} className="text-emerald-500" /> Account Status
                </h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center group">
                    <div>
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Authorized Budget</span>
                       <span className="font-black text-2xl text-slate-900">$2,400,000</span>
                    </div>
                  </div>
                  <div className="h-px bg-slate-50"></div>
                  <div className="flex justify-between items-center">
                    <div>
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Paid to Date</span>
                       <span className="font-black text-2xl text-emerald-600">$1,840,000</span>
                    </div>
                    <div className="text-right">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Outstanding</span>
                       <span className="font-black text-lg text-rose-500">$138,000</span>
                    </div>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setActiveTab('financials')}
                className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-900/10"
              >
                <CreditCard size={16} /> View Billing Details
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-10">
                <h3 className="font-black text-slate-900 flex items-center gap-2 italic">
                  <TrendingUp size={22} className="text-amber-500" /> Delivery Roadmap
                </h3>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Real-time status</span>
              </div>
              <div className="space-y-8 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-50">
                {milestones.map((m, i) => (
                  <div key={i} className="flex gap-8 relative group">
                    <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center z-10 transition-transform group-hover:scale-110 ${m.status === 'Reached' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-50 border-2 border-slate-100 text-slate-300'}`}>
                      {m.status === 'Reached' ? <CheckCircle2 size={18} /> : (m.status === 'Upcoming' ? <Clock size={18} /> : <Calendar size={18} />)}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex justify-between items-start">
                         <p className={`font-black tracking-tight ${m.status === 'Reached' ? 'text-slate-900' : 'text-slate-400'}`}>{m.name}</p>
                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{m.dueDate}</p>
                      </div>
                      <p className="text-xs text-slate-500 italic mt-1">"{m.description}"</p>
                      {m.status === 'Reached' && (
                         <div className="mt-3 flex gap-2">
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[9px] font-black uppercase">Verified</span>
                         </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-black text-slate-900 flex items-center gap-2 italic text-lg">
                    <History size={20} className="text-blue-500" /> Recent Site Feed
                  </h3>
                  <button className="text-[10px] font-black text-blue-600 uppercase hover:underline">Full Activity</button>
                </div>
                <div className="space-y-6">
                   <div className="flex gap-4">
                      <div className="h-10 w-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 shrink-0 shadow-sm"><Info size={20}/></div>
                      <div>
                         <p className="text-sm font-black text-slate-800">Roof trusses successfully mounted</p>
                         <p className="text-xs text-slate-400 font-medium">Site Supervisor • 2h ago</p>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <div className="h-10 w-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 shrink-0 shadow-sm"><Files size={20}/></div>
                      <div>
                         <p className="text-sm font-black text-slate-800">Shared "October Progress Report.pdf"</p>
                         <p className="text-xs text-slate-400 font-medium">Project Admin • 5h ago</p>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <div className="h-10 w-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 shrink-0 shadow-sm"><ThumbsUp size={20}/></div>
                      <div>
                         <p className="text-sm font-black text-slate-800">Quality Inspection Passed: Electrical</p>
                         <p className="text-xs text-slate-400 font-medium">City Inspector • Yesterday</p>
                      </div>
                   </div>
                </div>
              </div>

              <div className="bg-amber-50 p-8 rounded-[2.5rem] border border-amber-100 relative overflow-hidden group">
                <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                   <MessageCircle size={150} />
                </div>
                <h4 className="font-black text-amber-900 mb-4 uppercase tracking-widest text-[10px]">Supervisor's Note</h4>
                <p className="text-sm text-amber-800 leading-relaxed mb-6 italic font-medium">
                   "We are finalizing the second-floor enclosures ahead of schedule. The glazing team starts Monday morning. Please review the updated framing photos in the documents section."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 border-4 border-white shadow-xl flex items-center justify-center text-slate-900 font-black italic">JS</div>
                  <div>
                    <p className="text-sm font-black text-slate-900">James Supt.</p>
                    <p className="text-[10px] text-amber-600 font-bold uppercase tracking-tighter">Senior Site Foreman</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
           <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
             <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative w-full md:w-96 group">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500" size={18} />
                   <input type="text" placeholder="Search shared files..." className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm font-medium" />
                </div>
                <div className="flex gap-2">
                   <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 shadow-sm"><Filter size={18}/></button>
                   <button className="flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl">
                      <Plus size={16}/> Upload for Approval
                   </button>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
                {sharedDocuments.map(doc => (
                   <div key={doc.id} className="p-6 bg-slate-50 border border-slate-100 rounded-3xl group hover:bg-white hover:border-amber-500 hover:shadow-2xl transition-all cursor-pointer flex flex-col h-full">
                      <div className="flex justify-between items-start mb-6">
                         <div className={`p-4 rounded-2xl ${doc.category === 'Contract' ? 'bg-blue-100 text-blue-600' : (doc.category === 'Drawing' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600')} shadow-sm group-hover:scale-110 transition-transform`}>
                            <FileText size={28} />
                         </div>
                         <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><MoreVertical size={18}/></button>
                      </div>
                      <h4 className="font-black text-slate-900 mb-1 group-hover:text-amber-600 transition-colors leading-tight">{doc.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{doc.category} • {doc.size}</p>
                      <div className="mt-auto pt-6 flex items-center justify-between border-t border-slate-100">
                         <span className="text-[9px] font-bold text-slate-400 uppercase italic">Updated: {doc.updatedAt}</span>
                         <button className="p-2 bg-white text-slate-600 rounded-lg shadow-sm border border-slate-100 hover:text-blue-600 transition-colors">
                            <Download size={16} />
                         </button>
                      </div>
                   </div>
                ))}
             </div>
           </div>

           <div className="bg-blue-50 p-8 rounded-[2.5rem] border border-blue-100 flex flex-col md:flex-row items-center gap-8">
              <div className="h-20 w-20 bg-white rounded-3xl flex items-center justify-center text-blue-600 shadow-xl shrink-0">
                 <ShieldCheck size={40} />
              </div>
              <div className="flex-1 text-center md:text-left">
                 <h4 className="text-xl font-black text-blue-900 mb-1 italic">Shared Document Security</h4>
                 <p className="text-sm text-blue-700 font-medium">All documents shared in this portal are encrypted and only accessible to authorized project stakeholders. Every download is logged for project transparency.</p>
              </div>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
                 Audit Access Logs
              </button>
           </div>
        </div>
      )}

      {activeTab === 'financials' && (
        <div className="space-y-6 animate-in slide-in-from-top-4 duration-500">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                 <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-xl font-black text-slate-900 italic">Invoice History</h3>
                    <div className="flex gap-2">
                       <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-black rounded uppercase">1 Outstanding</span>
                    </div>
                 </div>
                 <table className="w-full text-left">
                    <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-100">
                       <tr>
                          <th className="px-8 py-5">Invoice Ref</th>
                          <th className="px-8 py-5">Billing Date</th>
                          <th className="px-8 py-5">Grand Total</th>
                          <th className="px-8 py-5">Status</th>
                          <th className="px-8 py-5 text-right">Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       {invoices.map(inv => (
                          <tr key={inv.id} className="hover:bg-slate-50 transition-all group">
                             <td className="px-8 py-6">
                                <p className="font-black text-slate-900 text-sm">{inv.invoiceNumber}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Tax ID: {inv.id.toUpperCase()}</p>
                             </td>
                             <td className="px-8 py-6 text-sm font-bold text-slate-500">{inv.date}</td>
                             <td className="px-8 py-6">
                                <p className="text-lg font-black text-slate-900">${inv.grandTotal.toLocaleString()}</p>
                             </td>
                             <td className="px-8 py-6">
                                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                                   inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700 shadow-sm shadow-amber-500/10'
                                }`}>
                                   {inv.status}
                                </span>
                             </td>
                             <td className="px-8 py-6 text-right">
                                <div className="flex justify-end gap-2">
                                   {inv.status !== 'Paid' && (
                                      <button className="px-4 py-2 bg-amber-500 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 shadow-lg shadow-amber-500/20 transition-all">
                                         Pay Now
                                      </button>
                                   )}
                                   <button className="p-2.5 bg-white border border-slate-200 text-slate-400 rounded-xl hover:text-slate-900 transition-colors">
                                      <Download size={18}/>
                                   </button>
                                </div>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>

              <div className="space-y-6">
                 <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-5 scale-150 rotate-12">
                       <Wallet size={150} />
                    </div>
                    <div className="relative z-10">
                       <h4 className="text-amber-500 font-black uppercase tracking-widest text-[10px] mb-6">Payment Overview</h4>
                       <div className="space-y-6">
                          <div>
                             <p className="text-[10px] font-black text-slate-500 uppercase mb-2">Total Contract Value</p>
                             <p className="text-3xl font-black italic tracking-tighter">$2,400,000.00</p>
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-slate-500 uppercase mb-2">Completion-based billing</p>
                             <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[76%] rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                             </div>
                             <p className="text-[10px] font-bold text-slate-400 mt-2 italic text-right">76% of budget invoiced</p>
                          </div>
                       </div>
                       <button className="w-full mt-10 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                          Download Statement (.PDF)
                       </button>
                    </div>
                 </div>

                 <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                       <div className="p-2 bg-blue-100 text-blue-600 rounded-xl"><ShieldCheck size={20}/></div>
                       <h4 className="font-black text-slate-900 italic">Secure Checkout</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium mb-6">
                       All payments are processed through our secure PCI-compliant gateway. Funds are held in escrow and disbursed based on verified project milestones.
                    </p>
                    <div className="flex gap-2">
                       <div className="h-8 w-12 bg-slate-100 rounded-md"></div>
                       <div className="h-8 w-12 bg-slate-100 rounded-md"></div>
                       <div className="h-8 w-12 bg-slate-100 rounded-md"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'messages' && (
        <div className="h-[600px] bg-white rounded-[2.5rem] border border-slate-200 shadow-sm flex overflow-hidden animate-in zoom-in-95 duration-300">
           <div className="w-80 border-r border-slate-100 bg-slate-50/50 flex flex-col">
              <div className="p-6 border-b border-slate-100 bg-white">
                 <h4 className="font-black text-slate-900 italic">Project Channels</h4>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                 {[
                    { name: 'Site Supervisor', role: 'James Supt.', last: 'Enclosures arriving Monday.', active: true },
                    { name: 'Project Admin', role: 'Sarah J.', last: 'Invoice #095 sent.', active: false },
                    { name: 'Finance Support', role: 'Support Team', last: 'Escrow confirmed.', active: false },
                 ].map((chat, i) => (
                    <button key={i} className={`w-full p-4 rounded-3xl flex items-center gap-4 transition-all text-left group ${chat.active ? 'bg-amber-50 shadow-sm' : 'hover:bg-white'}`}>
                       <div className="w-12 h-12 rounded-2xl bg-slate-200 border-2 border-white shadow-sm overflow-hidden shrink-0">
                          <img src={`https://picsum.photos/seed/chat${i}/60/60`} alt=""/>
                       </div>
                       <div className="flex-1 overflow-hidden">
                          <p className={`text-sm font-black ${chat.active ? 'text-slate-900' : 'text-slate-700'}`}>{chat.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase truncate">{chat.last}</p>
                       </div>
                    </button>
                 ))}
              </div>
           </div>
           <div className="flex-1 flex flex-col bg-slate-50/30">
              <div className="p-6 border-b border-slate-100 bg-white flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 overflow-hidden shadow-lg flex items-center justify-center font-black italic">JS</div>
                    <div>
                       <h4 className="font-black text-slate-900 italic">James Supt.</h4>
                       <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Active at Riverside Site</p>
                    </div>
                 </div>
                 <div className="flex gap-2">
                    <button className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors"><Search size={18}/></button>
                    <button className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors"><MoreVertical size={18}/></button>
                 </div>
              </div>
              <div className="flex-1 p-8 overflow-y-auto space-y-6">
                 <div className="flex justify-start">
                    <div className="bg-white p-5 rounded-[2rem] rounded-tl-none border border-slate-100 shadow-xl max-w-sm text-sm text-slate-700 leading-relaxed font-medium">
                       Hi Alex! Just confirming the second-floor enclosures are being prepped today. I've uploaded the new framing photos for your review in the "Documents" tab.
                    </div>
                 </div>
                 <div className="flex justify-end">
                    <div className="bg-slate-900 p-5 rounded-[2rem] rounded-tr-none shadow-2xl max-w-sm text-sm text-amber-500 leading-relaxed font-black italic">
                       Great news, James. I've already checked the photos—looks solid. Let's keep the glazing team updated for their start on Monday.
                    </div>
                 </div>
                 <div className="flex justify-start">
                    <div className="bg-white p-5 rounded-[2rem] rounded-tl-none border border-slate-100 shadow-xl max-w-sm text-sm text-slate-700 leading-relaxed font-medium">
                       Will do. I'll send another update after the morning toolbox meeting tomorrow.
                    </div>
                 </div>
              </div>
              <div className="p-6 bg-white border-t border-slate-100 flex gap-4">
                 <input 
                    type="text" 
                    placeholder="Type your project update request..."
                    className="flex-1 px-6 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-4 focus:ring-amber-500/10 text-sm font-medium transition-all"
                 />
                 <button className="h-14 w-14 bg-amber-500 text-slate-900 rounded-2xl flex items-center justify-center shadow-xl shadow-amber-500/20 hover:scale-105 transition-transform active:scale-95">
                    <Send size={24} />
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                 <div className="flex items-center gap-4">
                    <div className="p-4 bg-amber-500 text-slate-900 rounded-2xl shadow-xl"><ThumbsUp size={28} /></div>
                    <div>
                       <h2 className="text-2xl font-black text-slate-900 italic">Project Feedback</h2>
                       <p className="text-xs text-slate-500 font-bold tracking-widest uppercase italic">Your voice builds BuildOS</p>
                    </div>
                 </div>
                 <button onClick={() => setShowFeedbackModal(false)} className="p-3 hover:bg-slate-200 rounded-full text-slate-400 transition-colors"><Plus size={24} className="rotate-45" /></button>
              </div>
              <form onSubmit={handleFeedbackSubmit} className="p-10 space-y-8">
                 <div className="text-center space-y-4">
                    <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Overall Satisfaction</p>
                    <div className="flex justify-center gap-3">
                       {[1, 2, 3, 4, 5].map(s => (
                          <button key={s} type="button" onClick={() => setRating(s)} className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all ${rating >= s ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/20' : 'bg-slate-50 text-slate-300 hover:bg-slate-100'}`}>
                             <Star size={32} fill={rating >= s ? "currentColor" : "none"} />
                          </button>
                       ))}
                    </div>
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Detailed Comments (Optional)</label>
                    <textarea 
                       rows={4}
                       className="w-full p-6 bg-slate-50 border-2 border-transparent rounded-3xl outline-none focus:border-amber-500 transition-all font-medium italic text-slate-700"
                       placeholder="How is the communication? Any concerns about the current phase?"
                       value={feedbackText}
                       onChange={e => setFeedbackText(e.target.value)}
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-emerald-50 rounded-2xl flex items-center gap-3 border border-emerald-100">
                       <CheckCircle2 size={18} className="text-emerald-500" />
                       <span className="text-[10px] font-black text-emerald-700 uppercase leading-tight">Shared with Management</span>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-2xl flex items-center gap-3 border border-blue-100">
                       <ShieldCheck size={18} className="text-blue-500" />
                       <span className="text-[10px] font-black text-blue-700 uppercase leading-tight">Immutable Record</span>
                    </div>
                 </div>
                 <button type="submit" disabled={rating === 0} className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-slate-800 shadow-2xl transition-all disabled:opacity-50">
                    Publish Feedback
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default ClientPortalView;
