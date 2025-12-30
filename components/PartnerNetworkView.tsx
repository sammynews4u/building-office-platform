
import React from 'react';
import { Construction, ArrowLeft, Globe, Truck, Building2, ShieldCheck, Zap, ArrowUpRight } from 'lucide-react';

interface PartnerNetworkViewProps {
  onBack: () => void;
}

const PartnerNetworkView: React.FC<PartnerNetworkViewProps> = ({ onBack }) => {
  return (
    <div className="bg-slate-900 min-h-screen text-white animate-in fade-in duration-500">
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
          <div className="bg-amber-500 p-2 rounded-xl text-slate-900">
            <Construction size={24} />
          </div>
          <span className="font-black text-2xl tracking-tighter text-white italic">BuildOS</span>
        </div>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-black uppercase text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} /> Exit Network
        </button>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-20 space-y-6">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-widest italic">
              <Globe size={14} /> Global Ecosystem
           </div>
           <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">
             The BuildOS <span className="text-amber-500">Ecosystem</span>
           </h1>
           <p className="text-slate-400 text-xl font-medium italic">
             Connecting world-class equipment manufacturers, material suppliers, and financial institutions into one seamless operating chain.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {[
            { type: 'Heavy Machinery', label: 'Rental Partners', icon: Truck, partners: ['Cat Financial', 'JCB Direct', 'United Rentals'] },
            { type: 'Raw Materials', label: 'Supply Chain', icon: Building2, partners: ['Holcim Bulk', 'Tata Steel', 'Cemex Global'] },
            { type: 'Financial Services', label: 'Settlement Node', icon: ShieldCheck, partners: ['BuildGlobal Trust', 'PCI-Connect', 'Asset-Vault'] }
          ].map((cat, i) => (
             <div key={i} className="bg-white/5 border border-white/10 rounded-[3rem] p-10 hover:bg-white/[0.08] transition-all group">
                <div className="p-4 bg-amber-500 text-slate-900 rounded-2xl w-fit mb-10 group-hover:rotate-6 transition-transform">
                   <cat.icon size={32} />
                </div>
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">{cat.type}</p>
                <h3 className="text-3xl font-black italic mb-8">{cat.label}</h3>
                <div className="space-y-4">
                   {cat.partners.map(p => (
                      <div key={p} className="flex items-center justify-between py-3 border-b border-white/5 group/row">
                         <span className="font-bold text-slate-300 group-hover/row:text-white transition-colors">{p}</span>
                         <ArrowUpRight size={16} className="text-slate-600 group-hover/row:text-amber-500 transition-all" />
                      </div>
                   ))}
                </div>
             </div>
          ))}
        </div>

        <div className="bg-amber-500 rounded-[3rem] p-12 md:p-24 text-slate-900 flex flex-col md:flex-row items-center gap-16 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-12 opacity-10"><Zap size={300} /></div>
           <div className="flex-1 space-y-6 relative z-10 text-center md:text-left">
              <h2 className="text-5xl font-black italic tracking-tighter leading-none uppercase">Become a Verified Partner</h2>
              <p className="text-xl font-bold opacity-80 italic">List your assets, services, or materials on the BuildOS global internal marketplace.</p>
              <button className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-2xl">
                 Apply for Network Membership
              </button>
           </div>
           <div className="hidden lg:block w-80 h-80 bg-white/20 rounded-[4rem] backdrop-blur-sm border border-white/20 relative z-10 p-12">
              <Globe size={200} className="text-white/40" />
           </div>
        </div>
      </main>
    </div>
  );
};

export default PartnerNetworkView;
