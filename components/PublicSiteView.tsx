
import React, { useState, useRef } from 'react';
import { 
  Globe, 
  Eye, 
  Settings2, 
  Camera, 
  Palette, 
  CheckCircle2, 
  Briefcase, 
  ShieldCheck, 
  Plus, 
  Building2, 
  Search, 
  MousePointer2, 
  Mail, 
  ChevronRight, 
  Sparkles, 
  Link2, 
  BarChart, 
  Layout, 
  Type, 
  X, 
  Bell, 
  TrendingUp,
  RefreshCw,
  Zap,
  Smartphone,
  QrCode,
  Share2,
  ArrowLeft,
  Filter,
  Hammer,
  Layers,
  MapPin,
  Star
} from 'lucide-react';
import { generateSEOSuggestions } from '../services/geminiService';
import { AppView } from '../types';

interface PublicSiteViewProps {
  setView?: (view: AppView) => void;
}

type Tab = 'design' | 'services' | 'portfolio' | 'domain' | 'seo';

interface Service {
  id: number;
  title: string;
  category: 'Residential' | 'Commercial' | 'Industrial' | 'Infrastructure';
  description: string;
  icon: any;
}

const mockServices: Service[] = [
  { id: 1, title: 'Custom Luxury Homes', category: 'Residential', description: 'Bespoke architectural designs for high-end living spaces.', icon: Building2 },
  { id: 2, title: 'Retail Hub Development', category: 'Commercial', description: 'Turn-key solutions for shopping centers and retail outlets.', icon: Briefcase },
  { id: 3, title: 'Smart Warehouse Logistics', category: 'Industrial', description: 'Highly efficient industrial storage and distribution centers.', icon: Layers },
  { id: 4, title: 'Urban Bridge Retrofitting', category: 'Infrastructure', description: 'Civil engineering for seismic upgrades and urban connectivity.', icon: Hammer },
  { id: 5, title: 'Multi-Family Complexes', category: 'Residential', description: 'Modern apartment blocks with integrated smart-city features.', icon: Building2 },
  { id: 6, title: 'Corporate Headquarters', category: 'Commercial', description: 'State-of-the-art office spaces optimized for productivity.', icon: Globe },
];

const PublicSiteView: React.FC<PublicSiteViewProps> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<Tab>('design');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [subdomain, setSubdomain] = useState('structura-build');
  const [isSeoLoading, setIsSeoLoading] = useState(false);
  const [seoData, setSeoData] = useState<any>(null);
  const [serviceFilter, setServiceFilter] = useState<string>('All');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = ['All', 'Residential', 'Commercial', 'Industrial', 'Infrastructure'];

  const filteredServices = mockServices.filter(s => 
    serviceFilter === 'All' || s.category === serviceFilter
  );

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAiSEO = async () => {
    setIsSeoLoading(true);
    const result = await generateSEOSuggestions({
      name: 'Structura Build Ph 1',
      specialty: 'Industrial & Infrastructure Specialists',
      location: 'San Francisco, CA'
    });
    if (result) setSeoData(result);
    setIsSeoLoading(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 max-w-7xl mx-auto">
      <button 
        onClick={() => setView?.(AppView.DASHBOARD)}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-black uppercase text-[10px] tracking-widest transition-colors group mb-2"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
      </button>

      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-600">
            <Globe size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Public Presence Management</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic uppercase">External Storefront</h1>
          <p className="text-slate-500 text-lg font-medium italic">Your firm's professional gateway for clients and new business leads.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-black text-slate-700 hover:bg-slate-50 shadow-sm transition-all group">
            <Eye size={18} className="text-blue-500" /> Preview Site
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-black hover:bg-slate-800 shadow-xl transition-all">
            <Share2 size={18} className="text-amber-500" /> Publish Updates
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm w-fit overflow-x-auto scrollbar-hide">
        {[
          { id: 'design', label: 'Brand & Layout', icon: Palette },
          { id: 'services', label: 'Listed Services', icon: Hammer },
          { id: 'portfolio', label: 'Work Portfolio', icon: Briefcase },
          { id: 'domain', label: 'Domain Settings', icon: Link2 },
          { id: 'seo', label: 'SEO Intelligence', icon: Sparkles },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          {activeTab === 'design' && (
            <div className="space-y-8 animate-in slide-in-from-left-4 duration-500">
               <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-10">
                  <div className="flex flex-col md:flex-row gap-12 items-start">
                     <div className="space-y-6">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic">Company Logo</p>
                        <div 
                          onClick={() => fileInputRef.current?.click()}
                          className="w-40 h-40 rounded-[2.5rem] bg-slate-50 border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-slate-400 hover:border-amber-500 hover:bg-amber-50 transition-all cursor-pointer group relative overflow-hidden"
                        >
                           {logoUrl ? (
                             <img src={logoUrl} className="w-full h-full object-cover" alt="Logo" />
                           ) : (
                             <>
                               <Camera size={32} className="group-hover:scale-110 transition-transform mb-2" />
                               <span className="text-[9px] font-black uppercase tracking-tighter">Upload Mark</span>
                             </>
                           )}
                           <input type="file" ref={fileInputRef} className="hidden" onChange={handleLogoUpload} accept="image/*" />
                        </div>
                     </div>
                     <div className="flex-1 space-y-8">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic">Primary Brand Color</label>
                           <div className="flex gap-4">
                              {['#f59e0b', '#0f172a', '#3b82f6', '#10b981', '#f43f5e'].map(color => (
                                <button 
                                  key={color} 
                                  style={{backgroundColor: color}} 
                                  className={`w-12 h-12 rounded-2xl shadow-lg border-4 transition-all hover:scale-110 ${color === '#f59e0b' ? 'border-white ring-4 ring-amber-500/20' : 'border-transparent'}`}
                                />
                              ))}
                              <button className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm hover:border-amber-500 transition-all">
                                <Plus size={20} />
                              </button>
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic">Web Typography</label>
                           <select className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-4 focus:ring-amber-500/10 transition-all font-bold italic">
                              <option>Inter Display (System Default)</option>
                              <option>Montserrat Modern</option>
                              <option>Playfair Display (Premium)</option>
                              <option>Space Grotesk</option>
                           </select>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden group shadow-2xl">
                  <div className="absolute top-0 right-0 p-12 opacity-5 -mr-10 -mt-10"><Layout size={350} /></div>
                  <div className="relative z-10 space-y-8">
                     <div className="flex items-center gap-3">
                        <div className="p-3 bg-amber-500 text-slate-900 rounded-2xl shadow-xl"><Palette size={24}/></div>
                        <h3 className="text-3xl font-black italic tracking-tighter uppercase">Section Architect</h3>
                     </div>
                     <p className="text-lg text-slate-400 max-w-xl font-medium italic">Design your storefront homepage with verified construction modules.</p>
                     <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {['Hero Banner', 'Active Sites', 'Material Shop', 'Testimonials'].map(mod => (
                           <div key={mod} className="p-6 bg-white/5 border border-white/10 rounded-3xl text-center space-y-3 hover:bg-white/10 transition-all cursor-move group/mod">
                              <div className="h-2 w-full bg-white/10 rounded-full mb-4"></div>
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover/mod:text-amber-500 transition-colors">{mod}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
               {/* Filtering Mechanism Header */}
               <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                     <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shadow-sm"><Filter size={20} /></div>
                        <div>
                           <h3 className="text-xl font-black text-slate-900 italic tracking-tight uppercase">Service Discovery Filter</h3>
                           <p className="text-xs text-slate-400 font-bold uppercase tracking-widest italic">Categorize your expertise for visitors</p>
                        </div>
                     </div>
                     <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl">
                        <Plus size={16} /> Add Custom Service
                     </button>
                  </div>
                  
                  {/* Category Pills */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-50">
                     {categories.map(cat => (
                        <button
                           key={cat}
                           onClick={() => setServiceFilter(cat)}
                           className={`px-6 py-2.5 rounded-full text-xs font-black italic tracking-widest transition-all ${serviceFilter === cat ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/20' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                        >
                           {cat}
                        </button>
                     ))}
                  </div>
               </div>

               {/* Services Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map(service => (
                     <div key={service.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:border-amber-500 hover:shadow-2xl transition-all group flex flex-col h-full cursor-pointer overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><service.icon size={120} /></div>
                        <div className="flex justify-between items-start mb-8 relative z-10">
                           <div className="p-4 bg-slate-50 text-slate-400 group-hover:bg-amber-50 group-hover:text-amber-600 rounded-2xl shadow-inner transition-colors">
                              <service.icon size={28} />
                           </div>
                           <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest rounded-lg border border-blue-100">{service.category}</span>
                        </div>
                        <h4 className="text-xl font-black text-slate-900 italic tracking-tight mb-4 group-hover:text-amber-600 transition-colors leading-tight">{service.title}</h4>
                        <p className="text-sm text-slate-500 font-medium italic leading-relaxed mb-8">{service.description}</p>
                        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Visibility: Public</span>
                           <button className="p-2 text-slate-400 hover:text-slate-900"><ChevronRight size={18} /></button>
                        </div>
                     </div>
                  ))}
               </div>
               
               {filteredServices.length === 0 && (
                 <div className="bg-slate-50 p-20 rounded-[3rem] text-center space-y-4 border-2 border-dashed border-slate-200">
                    <div className="flex justify-center text-slate-200"><Hammer size={64} /></div>
                    <p className="text-slate-400 font-black uppercase tracking-widest italic">No services listed in this category.</p>
                 </div>
               )}
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-8 animate-in zoom-in-95 duration-500">
               <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-1000"><Sparkles size={250} /></div>
                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                     <div className="flex-1 space-y-6">
                        <div className="flex items-center gap-3 text-amber-500">
                           <Sparkles size={24} />
                           <span className="font-black text-xs tracking-[0.3em] uppercase">BuildOS SEO Neural</span>
                        </div>
                        <h3 className="text-4xl font-black italic tracking-tighter leading-none">Automated Market Ranking</h3>
                        <p className="text-lg text-slate-400 font-medium italic leading-relaxed max-w-lg">Let Gemini analyze your project history and location to suggest high-conversion keywords for your public portal.</p>
                        <button 
                          onClick={handleAiSEO}
                          disabled={isSeoLoading}
                          className="px-10 py-5 bg-amber-500 text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-amber-400 shadow-xl shadow-amber-500/20 transition-all flex items-center gap-3 disabled:opacity-50 active:scale-95"
                        >
                           {isSeoLoading ? <RefreshCw size={20} className="animate-spin" /> : <Zap size={20} />}
                           Generate SEO Logic
                        </button>
                     </div>
                     <div className="w-full md:w-80 p-8 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent"></div>
                        <div className="space-y-4 relative z-10">
                           <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-400 tracking-widest italic">
                              <span>Optimization Level</span>
                              <span className="text-emerald-400">92%</span>
                           </div>
                           <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 w-[92%] rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                           </div>
                           <p className="text-[9px] text-slate-500 font-bold uppercase mt-4">Top Regional Keywords:</p>
                           <div className="flex flex-wrap gap-2">
                              {['Structural Masonry', 'Bay Area Logistics', 'Bridge Civil Ph1'].map(k => (
                                <span key={k} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-black italic text-slate-300">#{k}</span>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {seoData && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-bottom-4 duration-700">
                    <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
                       <h4 className="text-xl font-black text-slate-900 italic tracking-tight uppercase flex items-center gap-3">
                          <MousePointer2 size={24} className="text-blue-500" /> Target Keywords
                       </h4>
                       <div className="space-y-3">
                          {seoData.keywords?.map((k: string, i: number) => (
                             <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-amber-500 transition-all cursor-default">
                                <span className="font-black text-slate-700 italic tracking-tight">{k}</span>
                                <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-black rounded uppercase">High Intent</span>
                             </div>
                          ))}
                       </div>
                    </div>
                    <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
                       <h4 className="text-xl font-black text-slate-900 italic tracking-tight uppercase flex items-center gap-3">
                          <BarChart size={24} className="text-amber-500" /> Meta Intelligence
                       </h4>
                       <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 italic font-medium text-slate-600 leading-relaxed shadow-inner">
                          "{seoData.metaDescription}"
                       </div>
                       <button className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 shadow-xl active:scale-95 transition-all">
                          Apply suggestions globally
                       </button>
                    </div>
                 </div>
               )}
            </div>
          )}

          {activeTab === 'domain' && (
            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
               <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-6 mb-12">
                     <div className="p-4 bg-amber-50 text-amber-600 rounded-3xl shadow-sm"><Link2 size={32} /></div>
                     <div>
                        <h3 className="text-2xl font-black text-slate-900 italic tracking-tight uppercase">Portal Connectivity</h3>
                        <p className="text-sm text-slate-500 font-medium">Link your custom domain or use your BuildOS network sub-alias.</p>
                     </div>
                  </div>

                  <div className="space-y-10">
                     <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic block">Network Subdomain</label>
                        <div className="flex items-center gap-3 p-2 bg-slate-50 border border-slate-100 rounded-[2rem] focus-within:ring-4 focus-within:ring-amber-500/10 focus-within:border-amber-500 transition-all shadow-inner">
                           <input 
                             type="text" 
                             value={subdomain}
                             onChange={e => setSubdomain(e.target.value)}
                             className="flex-1 bg-transparent border-none outline-none px-6 py-4 font-black text-2xl text-slate-900 italic tracking-tighter"
                           />
                           <span className="bg-white px-6 py-4 rounded-[1.5rem] font-black text-slate-300 italic tracking-tight shadow-sm">.buildos.net</span>
                        </div>
                        <p className="text-[10px] text-emerald-500 font-black uppercase px-6 flex items-center gap-2"><CheckCircle2 size={12}/> Domain Name Available</p>
                     </div>

                     <div className="h-px bg-slate-50"></div>

                     <div className="space-y-6">
                        <div className="flex justify-between items-center">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic">Custom Enterprise Domain</label>
                           <span className="px-3 py-1 bg-slate-900 text-amber-500 text-[8px] font-black uppercase tracking-widest rounded-lg">Enterprise Feature</span>
                        </div>
                        <button className="w-full p-8 border-4 border-dashed border-slate-100 rounded-[3rem] text-slate-300 hover:border-amber-500 hover:text-amber-500 hover:bg-amber-50 transition-all flex flex-col items-center gap-4 group">
                           <Plus size={32} className="group-hover:scale-110 transition-transform" />
                           <span className="text-sm font-black uppercase tracking-widest">Add Professional Domain</span>
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Sidebar Analytics */}
        <div className="space-y-8">
           <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-700"><TrendingUp size={150}/></div>
              <div className="relative z-10">
                 <h4 className="text-amber-500 font-black uppercase tracking-widest text-[10px] mb-6">Storefront Pulse</h4>
                 <div className="space-y-8">
                    <div>
                       <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Unique Site Visitors</p>
                       <p className="text-4xl font-black italic tracking-tighter">1,240</p>
                       <p className="text-[10px] text-emerald-400 font-bold uppercase mt-1 italic">+14% This Month</p>
                    </div>
                    <div className="h-px bg-white/10"></div>
                    <div>
                       <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Lead Conversion Rate</p>
                       <p className="text-4xl font-black italic tracking-tighter">4.2%</p>
                       <p className="text-[10px] text-amber-400 font-bold uppercase mt-1 italic">Industry Average: 2.1%</p>
                    </div>
                 </div>
                 <button className="w-full mt-10 py-4 bg-white/10 hover:bg-white text-white hover:text-slate-900 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                    Full Traffic Report
                 </button>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><QrCode size={100}/></div>
              <h4 className="font-black text-slate-900 italic mb-6">Offline Discovery</h4>
              <div className="space-y-6 relative z-10">
                 <div className="w-full aspect-square bg-slate-50 rounded-3xl border-2 border-slate-100 flex items-center justify-center relative overflow-hidden group/qr">
                    <QrCode size={120} className="text-slate-300 group-hover/qr:text-amber-500 transition-colors" />
                    <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm opacity-0 group-hover/qr:opacity-100 transition-opacity flex items-center justify-center p-8">
                       <button className="bg-white text-slate-900 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl">Download for Site Boards</button>
                    </div>
                 </div>
                 <p className="text-[10px] text-slate-500 leading-relaxed font-medium italic text-center">Print this QR code on site banners to allow neighbors and planners to view project details instantly.</p>
              </div>
           </div>

           <div className="bg-emerald-50 p-8 rounded-[2.5rem] border border-emerald-100 group">
              <div className="flex items-center gap-3 mb-6">
                 <div className="p-2 bg-white rounded-xl shadow-sm text-emerald-600 group-hover:scale-110 transition-transform"><ShieldCheck size={20}/></div>
                 <h4 className="font-black text-emerald-900 italic">Security Status</h4>
              </div>
              <p className="text-[10px] text-emerald-700 font-medium leading-relaxed italic mb-6">Your public storefront is protected by BuildOS Global Shield and SSL-encrypted at the network layer.</p>
              <div className="flex justify-between items-center text-[9px] font-black text-emerald-600 uppercase tracking-widest">
                 <span>SSL ACTIVE</span>
                 <span className="flex items-center gap-1"><Zap size={10} fill="currentColor"/> EDGE ENABLED</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PublicSiteView;
