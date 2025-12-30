
import React, { useState } from 'react';
import { 
  Search, 
  Hammer, 
  Briefcase, 
  MessageSquare, 
  FileSignature, 
  ShieldCheck, 
  ChevronRight, 
  Plus,
  Star,
  MapPin,
  Clock,
  DollarSign,
  Filter,
  ArrowRightLeft,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Crown,
  Sparkles,
  Target,
  ArrowUpRight,
  Users
} from 'lucide-react';
import { AppView } from '../types';

interface ServicesMarketplaceViewProps {
  setView?: (view: AppView) => void;
}

type MarketplaceTab = 'browse' | 'board' | 'requests' | 'messages';

interface ServiceListing {
  id: string;
  title: string;
  provider: string;
  rating: number;
  reviews: number;
  price: string;
  priceModel: 'Fixed' | 'Hourly' | 'Per SQM';
  image: string;
  category: string;
  verified: boolean;
  isPromoted?: boolean;
}

interface PostedJob {
  id: string;
  title: string;
  client: string;
  location: string;
  budget: string;
  deadline: string;
  bidsCount: number;
  status: 'Open' | 'Bidding' | 'In Progress';
}

const mockServices: ServiceListing[] = [
  { id: '1', title: 'Professional House Wiring', provider: 'VoltMaster Electrical', rating: 4.9, reviews: 128, price: '$45', priceModel: 'Hourly', image: 'https://picsum.photos/seed/electric/400/300', category: 'Electrical', verified: true, isPromoted: true },
  { id: '2', title: 'Complete Drywall Installation', provider: 'WallFinish Pro', rating: 4.7, reviews: 85, price: '$12', priceModel: 'Per SQM', image: 'https://picsum.photos/seed/drywall/400/300', category: 'Interior', verified: true },
  { id: '3', title: 'Modern Kitchen Remodeling', provider: 'Urban Spaces Ltd', rating: 5.0, reviews: 42, price: '$8,500', priceModel: 'Fixed', image: 'https://picsum.photos/seed/kitchen/400/300', category: 'Renovation', verified: true, isPromoted: true },
  { id: '4', title: 'Structural Concrete Pouring', provider: 'Titan Concrete', rating: 4.8, reviews: 210, price: '$110', priceModel: 'Per SQM', image: 'https://picsum.photos/seed/concr/400/300', category: 'Infrastructure', verified: true },
];

const mockJobs: PostedJob[] = [
  { id: 'j1', title: 'Retaining Wall for Hillside Lot', client: 'Green Valley Villas', location: 'Portland, OR', budget: '$15,000', deadline: '2 Weeks', bidsCount: 4, status: 'Open' },
  { id: 'j2', title: 'New Office HVAC Installation', client: 'Apex Group', location: 'Austin, TX', budget: 'Open for Bids', deadline: '1 Month', bidsCount: 12, status: 'Bidding' },
];

const ServicesMarketplaceView: React.FC<ServicesMarketplaceViewProps> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<MarketplaceTab>('browse');
  const [searchQuery, setSearchQuery] = useState('');

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
          <h1 className="text-2xl font-black text-slate-900 tracking-tight italic">Services Marketplace</h1>
          <p className="text-slate-500 font-medium">Find specialized contractors, bid on projects, and manage service contracts with 100% Escrow assurance.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-black hover:bg-slate-800 shadow-xl transition-all active:scale-95">
            <Plus size={18} /> Post a Project
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm w-fit overflow-x-auto scrollbar-hide">
        {[
          { id: 'browse', label: 'Contractors', icon: Hammer },
          { id: 'board', label: 'Bidding Board', icon: Briefcase },
          { id: 'requests', label: 'Contracts', icon: FileSignature },
          { id: 'messages', label: 'Messages', icon: MessageSquare },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as MarketplaceTab)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-amber-50 text-slate-900 shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-8">
          {activeTab === 'browse' && (
            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-300">
              {/* Search & Filter Header */}
              <div className="flex gap-3">
                <div className="relative flex-1 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search for 'Electrician', 'Mason', 'HVAC'..."
                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-amber-500/10 transition-all text-sm font-medium shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="px-5 py-4 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 shadow-sm">
                  <Filter size={20} />
                </button>
              </div>

              {/* Promoted Row / Ad Unit */}
              <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl group">
                 <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
                    <Sparkles size={250} />
                 </div>
                 <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1 space-y-6">
                       <div className="flex items-center gap-2 text-amber-500">
                          <Crown size={18} fill="currentColor"/>
                          <span className="text-[10px] font-black uppercase tracking-widest">BuildOS Premium Partner</span>
                       </div>
                       <h2 className="text-4xl font-black italic tracking-tighter leading-none">Elevated MEP Solutions Inc.</h2>
                       <p className="text-sm text-slate-400 font-medium italic leading-relaxed">
                          "Top-rated mechanical, electrical, and plumbing contractor for commercial projects. 100% completion rate on 42 BuildOS assignments."
                       </p>
                       <div className="flex flex-wrap gap-6 pt-2">
                          <div className="flex items-center gap-2">
                             <CheckCircle2 size={16} className="text-emerald-500" />
                             <span className="text-xs font-bold">Bonded & Insured</span>
                          </div>
                          <div className="flex items-center gap-2">
                             <CheckCircle2 size={16} className="text-emerald-500" />
                             <span className="text-xs font-bold">ISO 9001 Certified</span>
                          </div>
                       </div>
                       <div className="flex gap-4 pt-4">
                          <button className="px-8 py-4 bg-amber-500 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-amber-500/20 hover:bg-amber-400 transition-all">
                             Request Premium Quote
                          </button>
                          <button className="px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                             View Portfolio
                          </button>
                       </div>
                    </div>
                    <div className="w-full md:w-72 aspect-square rounded-[3rem] bg-white/5 border border-white/10 flex items-center justify-center relative shadow-inner">
                       <Hammer size={64} className="text-white/10" />
                       <span className="absolute bottom-6 right-6 text-[8px] font-black text-white/30 tracking-widest uppercase italic">Sponsored Pro</span>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {mockServices.map((service) => (
                  <div key={service.id} className={`bg-white rounded-[2.5rem] border overflow-hidden hover:shadow-2xl transition-all group flex flex-col ${service.isPromoted ? 'border-amber-500 ring-4 ring-amber-500/5' : 'border-slate-200'}`}>
                    <div className="h-60 relative overflow-hidden">
                      <img src={service.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={service.title} />
                      <div className="absolute top-6 left-6 flex flex-col gap-2">
                        {service.isPromoted && (
                           <span className="bg-amber-500 text-slate-900 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-1.5">
                             <Sparkles size={12} fill="currentColor" /> Promoted
                           </span>
                        )}
                        <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-md">
                          {service.category}
                        </span>
                      </div>
                      <div className="absolute bottom-6 right-6">
                         <div className="p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl flex items-center gap-2">
                           <Star size={16} className="text-amber-500 fill-current" />
                           <span className="text-sm font-black text-slate-900">{service.rating}</span>
                           <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">({service.reviews})</span>
                         </div>
                      </div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="mb-6">
                        <h3 className="font-black text-xl text-slate-900 group-hover:text-amber-600 transition-colors leading-tight italic tracking-tight mb-2">
                          {service.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-slate-500 font-bold italic">{service.provider}</p>
                          {service.verified && <ShieldCheck size={16} className="text-emerald-500" />}
                        </div>
                      </div>

                      <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Base Rate</p>
                          <p className="text-3xl font-black text-slate-900 tracking-tighter">
                            {service.price} <span className="text-xs text-slate-400 font-medium tracking-normal lowercase italic">/ {service.priceModel}</span>
                          </p>
                        </div>
                        <button className="px-6 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95">
                          Request Bid
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'board' && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
              <div className="flex flex-col md:flex-row items-center justify-between bg-slate-50 p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5 -mr-8 -mt-8"><Briefcase size={180}/></div>
                <div className="relative z-10">
                  <h3 className="font-black text-2xl text-slate-900 italic tracking-tight">Open Bidding Board</h3>
                  <p className="text-sm text-slate-500 font-medium max-w-md italic mt-2">"Browse projects requesting specialized service tenders. Filter by budget and site location."</p>
                </div>
                <div className="text-center md:text-right mt-6 md:mt-0 relative z-10">
                  <span className="text-6xl font-black text-amber-500 italic tracking-tighter">24</span>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Requests</p>
                </div>
              </div>

              {mockJobs.map((job) => (
                <div key={job.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 hover:border-amber-500 shadow-sm hover:shadow-xl transition-all group cursor-pointer">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-black rounded-lg uppercase tracking-widest border border-blue-100">
                          {job.status}
                        </span>
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-1">
                           <Clock size={12}/> Posted 4h ago
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-amber-600 transition-colors italic tracking-tight">
                        {job.title}
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="space-y-1">
                          <p className="text-[9px] font-black uppercase text-slate-400">Location</p>
                          <div className="flex items-center gap-2 text-slate-700 text-xs font-bold">
                            <MapPin size={14} className="text-slate-400" /> {job.location}
                          </div>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[9px] font-black uppercase text-slate-400">Est. Budget</p>
                          <div className="flex items-center gap-2 text-slate-900 text-xs font-black">
                            <DollarSign size={14} className="text-emerald-500" /> {job.budget}
                          </div>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[9px] font-black uppercase text-slate-400">Timeline</p>
                          <div className="flex items-center gap-2 text-rose-500 text-xs font-black">
                            <Clock size={14} /> {job.deadline}
                          </div>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[9px] font-black uppercase text-slate-400">Bids Received</p>
                          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                            <Users size={14} className="text-slate-400" /> {job.bidsCount} Bids
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center min-w-[160px]">
                      <button className="w-full py-5 bg-slate-900 group-hover:bg-amber-500 text-white group-hover:text-slate-900 rounded-[2rem] text-[10px] font-black uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95">
                        Submit Proposal <ArrowRightLeft size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="space-y-8 animate-in fade-in duration-300">
               <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
                 <div className="p-8 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
                   <h3 className="font-black text-xl italic tracking-tight">Contract & Bid Registry</h3>
                   <div className="flex items-center gap-4">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Fee Status: <span className="text-amber-600">1.5% Managed</span></p>
                   </div>
                 </div>
                 <div className="p-0">
                   <table className="w-full text-left">
                     <thead>
                       <tr className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-100">
                         <th className="px-10 py-5">Project / Service</th>
                         <th className="px-10 py-5">Counterparty</th>
                         <th className="px-10 py-5">Contract Value</th>
                         <th className="px-10 py-5">Status</th>
                         <th className="px-10 py-5 text-right">Action</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                       <tr className="hover:bg-slate-50/50 transition-all group">
                         <td className="px-10 py-8">
                           <p className="font-black text-slate-900 text-lg italic">Commercial Roof Repair</p>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">REF: #PRJ-882-ESC</p>
                         </td>
                         <td className="px-10 py-8">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                                 <img src="https://picsum.photos/seed/cp1/40/40" alt=""/>
                              </div>
                              <p className="text-sm font-black text-slate-700">Skyline Developers</p>
                           </div>
                         </td>
                         <td className="px-10 py-8">
                           <p className="text-xl font-black text-slate-900 tracking-tighter">$4,200.00</p>
                         </td>
                         <td className="px-10 py-8">
                           <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm border border-amber-200">In Escrow</span>
                         </td>
                         <td className="px-10 py-8 text-right">
                           <button className="text-[10px] font-black text-blue-600 uppercase hover:underline tracking-widest">Execute Contract</button>
                         </td>
                       </tr>
                       <tr className="hover:bg-slate-50/50 transition-all group">
                         <td className="px-10 py-8">
                           <p className="font-black text-slate-900 text-lg italic">Landscaping Phase 1</p>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">REF: #PRJ-102-ACT</p>
                         </td>
                         <td className="px-10 py-8">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                                 <img src="https://picsum.photos/seed/cp2/40/40" alt=""/>
                              </div>
                              <p className="text-sm font-black text-slate-700">Nature-Build Inc</p>
                           </div>
                         </td>
                         <td className="px-10 py-8">
                           <p className="text-xl font-black text-slate-900 tracking-tighter">$2,150.00</p>
                         </td>
                         <td className="px-10 py-8">
                           <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm border border-emerald-200">Active</span>
                         </td>
                         <td className="px-10 py-8 text-right">
                           <button className="text-[10px] font-black text-blue-600 uppercase hover:underline tracking-widest">Manage Workflow</button>
                         </td>
                       </tr>
                     </tbody>
                   </table>
                 </div>
               </div>

               <div className="bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100 flex flex-col md:flex-row items-center gap-10 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-1000"><ShieldCheck size={180}/></div>
                  <div className="p-5 bg-white rounded-3xl text-emerald-600 shadow-xl shrink-0 border border-emerald-100 relative z-10">
                    <ShieldCheck size={42} />
                  </div>
                  <div className="flex-1 text-center md:text-left relative z-10">
                    <h4 className="font-black text-2xl text-emerald-900 italic tracking-tight">Platform-Wide Escrow Protection</h4>
                    <p className="text-sm text-emerald-700 font-medium leading-relaxed italic mt-2">
                       "All contract funds are managed by BuildOS Finance and only disbursed upon verified milestone completion. Guaranteed payment for work done."
                    </p>
                  </div>
                  <button className="px-10 py-5 bg-emerald-600 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-emerald-600/30 hover:bg-emerald-700 transition-all relative z-10 active:scale-95">
                    Billing Policy
                  </button>
               </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="h-[650px] bg-white rounded-[3rem] border border-slate-200 shadow-2xl flex overflow-hidden animate-in zoom-in-95 duration-300">
               <div className="w-80 border-r border-slate-100 bg-slate-50/50 overflow-y-auto flex flex-col">
                 <div className="p-8 border-b border-slate-100 bg-white">
                   <h4 className="font-black text-slate-900 italic">Site Inboxes</h4>
                 </div>
                 <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {[
                      { name: 'VoltMaster Electrical', last: 'Blueprints reviewed for R-8.', active: true, online: true },
                      { name: 'Nature-Build Inc', last: 'Proposal v2 attached.', active: false, online: false },
                      { name: 'Skyline Developers', last: 'Site pre-check complete.', active: false, online: true },
                    ].map((chat, i) => (
                      <button key={i} className={`w-full p-5 rounded-[2rem] flex items-center gap-4 transition-all text-left group ${chat.active ? 'bg-amber-50 shadow-sm' : 'hover:bg-white'}`}>
                        <div className="relative shrink-0">
                           <div className="w-12 h-12 rounded-2xl bg-slate-300 border-2 border-white shadow-md overflow-hidden">
                              <img src={`https://picsum.photos/seed/chat${i}/80/80`} alt="" />
                           </div>
                           {chat.online && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white"></div>}
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <p className={`text-sm tracking-tight ${chat.active ? 'font-black text-slate-900 italic' : 'font-bold text-slate-700'}`}>{chat.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase truncate">{chat.last}</p>
                        </div>
                      </button>
                    ))}
                 </div>
               </div>
               <div className="flex-1 flex flex-col bg-slate-50/20">
                 <div className="p-8 border-b border-slate-100 bg-white flex items-center justify-between">
                   <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500 overflow-hidden shadow-xl flex items-center justify-center font-black italic text-slate-900">VM</div>
                    <div>
                      <h4 className="font-black text-slate-900 italic text-lg tracking-tight">VoltMaster Electrical</h4>
                      <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest flex items-center gap-1">
                         <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Service Provider Verified
                      </p>
                    </div>
                   </div>
                   <div className="flex gap-2">
                      <button className="p-3 hover:bg-slate-100 rounded-2xl text-slate-400 transition-colors shadow-sm bg-white border border-slate-100"><Search size={18} /></button>
                      <button className="p-3 hover:bg-slate-100 rounded-2xl text-slate-400 transition-colors shadow-sm bg-white border border-slate-100"><AlertCircle size={18} /></button>
                   </div>
                 </div>
                 <div className="flex-1 p-10 overflow-y-auto space-y-6">
                    <div className="flex justify-start">
                      <div className="bg-white p-6 rounded-[2rem] rounded-tl-none border border-slate-100 shadow-xl max-w-sm text-sm text-slate-700 leading-relaxed font-medium italic">
                         "Hi Alex, we've analyzed the electrical layouts for the Riverside project. Our hourly rate of $45 includes certified roughing tools."
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-slate-900 p-6 rounded-[2rem] rounded-tr-none shadow-2xl max-w-sm text-sm text-amber-500 leading-relaxed font-black italic">
                         "Excellent. Can we proceed with the escrow lock for the first 40 hours of on-site work starting Monday?"
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white p-6 rounded-[2rem] rounded-tl-none border border-slate-100 shadow-xl max-w-sm text-sm text-slate-700 leading-relaxed font-medium italic">
                         "Absolutely. Sending the payment request now. Once locked, we'll assign the crew to your dashboard."
                      </div>
                    </div>
                 </div>
                 <div className="p-8 bg-white border-t border-slate-100 flex gap-4">
                   <input 
                    type="text" 
                    placeholder="Type a message or request a bid update..."
                    className="flex-1 px-6 py-4 bg-slate-50 border-none rounded-[1.5rem] outline-none focus:ring-4 focus:ring-amber-500/10 text-sm font-medium transition-all shadow-inner"
                   />
                   <button className="h-14 w-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-slate-900/20 hover:scale-105 active:scale-95 transition-all">
                      <Sparkles size={24} className="text-amber-500"/>
                   </button>
                 </div>
               </div>
            </div>
          )}
        </div>

        {/* Marketplace Sidebar / Monetization Stats */}
        <div className="space-y-8">
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
              <ShieldCheck size={120} />
            </div>
            <div className="relative z-10">
              <h3 className="font-black text-xl mb-3 italic text-amber-500">Service Guarantee</h3>
              <p className="text-xs text-slate-400 mb-8 leading-relaxed font-medium italic">
                Platform contractors undergo strict multi-point verification before they can access the Bidding Board.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Background Verified</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Liability Coverage Sync</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Quality Performance Grade</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform"><Target size={120}/></div>
            <h3 className="font-black text-lg text-slate-900 mb-6 italic tracking-tight">Market Analytics</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center group">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Open Bids</p>
                <p className="font-black text-slate-900 italic">12</p>
              </div>
              <div className="h-px bg-slate-50"></div>
              <div className="flex justify-between items-center group">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Winning Rate</p>
                <p className="font-black text-emerald-600 italic">25%</p>
              </div>
              <div className="h-px bg-slate-50"></div>
              <div className="flex justify-between items-center group">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Revenue</p>
                <p className="font-black text-amber-500 italic">$8,420</p>
              </div>
              <div className="h-px bg-slate-50"></div>
              <div className="flex justify-between items-center group">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Client Reviews</p>
                <p className="font-black text-slate-900 italic">4.9 / 5</p>
              </div>
            </div>
            <button className="w-full mt-10 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
               Full Insight Report <ArrowUpRight size={14}/>
            </button>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
             <h3 className="font-black text-lg text-slate-900 mb-6 italic">Quick Site Actions</h3>
             <div className="grid grid-cols-2 gap-4">
                <button className="p-5 bg-slate-50 hover:bg-amber-50 rounded-3xl flex flex-col items-center justify-center gap-3 transition-all group border border-transparent hover:border-amber-200">
                   <Plus size={20} className="text-slate-400 group-hover:text-amber-500 group-hover:scale-110 transition-all" />
                   <span className="text-[9px] font-black uppercase tracking-tighter text-slate-500 text-center">Post Tender Request</span>
                </button>
                <button className="p-5 bg-slate-50 hover:bg-blue-50 rounded-3xl flex flex-col items-center justify-center gap-3 transition-all group border border-transparent hover:border-blue-200">
                   <Hammer size={20} className="text-slate-400 group-hover:text-blue-500 group-hover:scale-110 transition-all" />
                   <span className="text-[9px] font-black uppercase tracking-tighter text-slate-500 text-center">Managed Pro Portal</span>
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesMarketplaceView;
