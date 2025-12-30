
import React, { useState } from 'react';
import { Construction, ArrowLeft, ShieldCheck, Lock, FileText, Scale, EyeOff, Gavel } from 'lucide-react';

interface LegalViewProps {
  onBack: () => void;
}

const LegalView: React.FC<LegalViewProps> = ({ onBack }) => {
  const [tab, setTab] = useState<'terms' | 'privacy' | 'compliance'>('terms');

  return (
    <div className="bg-slate-50 min-h-screen animate-in fade-in duration-500">
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
          <div className="bg-slate-900 p-2 rounded-xl text-amber-500">
            <Construction size={24} />
          </div>
          <span className="font-black text-2xl tracking-tighter text-slate-900 italic">BuildOS</span>
        </div>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-black uppercase text-slate-400 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft size={16} /> Home
        </button>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-4">
           <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-none text-slate-900">Legal <span className="text-amber-500">& Standards</span></h1>
           <p className="text-slate-500 font-medium italic">Transparency and protection for the global construction industry.</p>
        </div>

        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm w-fit mx-auto mb-16 overflow-x-auto">
          {[
            { id: 'terms', label: 'Terms of Service', icon: FileText },
            { id: 'privacy', label: 'Privacy Policy', icon: EyeOff },
            { id: 'compliance', label: 'Certifications', icon: Scale },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id as any)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black italic transition-all whitespace-nowrap ${tab === item.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl p-10 md:p-16 space-y-12 animate-in zoom-in-95 duration-500">
          {tab === 'terms' && (
            <div className="space-y-8 text-slate-600 leading-relaxed italic font-medium">
               <div className="space-y-4">
                  <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight flex items-center gap-3">
                     <FileText size={24} className="text-amber-500" /> 1. Operational License
                  </h2>
                  <p>By accessing the BuildOS Operating System, you are granted a non-exclusive license to manage your construction assets, procurement workflows, and labor data via our proprietary interface. Unauthorized reverse engineering of our cost prediction models is strictly prohibited.</p>
               </div>
               <div className="space-y-4">
                  <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight flex items-center gap-3">
                     <Gavel size={24} className="text-amber-500" /> 2. Marketplace Settlement
                  </h2>
                  <p>All marketplace transactions (Rentals, Sourcing, Services) are processed via BuildOS Finance. Funds are held in cryptographically secure escrow and are disbursed only upon verified milestone completion or site-receipt confirmation.</p>
               </div>
               <div className="space-y-4">
                  <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight flex items-center gap-3">
                     <ShieldCheck size={24} className="text-amber-500" /> 3. Data Integrity
                  </h2>
                  <p>Users are responsible for the accuracy of site logs, BOQ uploads, and worker certifications. BuildOS provides the tools for verification but does not assume legal liability for third-party compliance failures.</p>
               </div>
            </div>
          )}

          {tab === 'privacy' && (
            <div className="space-y-8 text-slate-600 leading-relaxed italic font-medium">
               <div className="space-y-4">
                  <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight flex items-center gap-3">
                     <Lock size={24} className="text-blue-500" /> Site Security
                  </h2>
                  <p>Your project blueprints, financial ledgers, and workforce records are encrypted at rest using AES-256 standards. We do not sell site-specific data to third-party material advertisers.</p>
               </div>
               <div className="space-y-4">
                  <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight flex items-center gap-3">
                     <EyeOff size={24} className="text-blue-500" /> Personnel Tracking
                   </h2>
                  <p>GPS-verified attendance data is used exclusively for site safety and payroll automation. Location data is only recorded during active shift hours as defined by the Enterprise Admin.</p>
               </div>
            </div>
          )}

          {tab === 'compliance' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {[
                 { title: 'PCI-DSS Level 1', desc: 'Secure payment settlement and escrow management protocols.', icon: ShieldCheck, color: 'text-emerald-500' },
                 { title: 'ISO 27001', desc: 'Global standard for information security management systems.', icon: Lock, color: 'text-blue-500' },
                 { title: 'SOC 2 Type II', desc: 'Verified operational security and data availability guarantees.', icon: FileText, color: 'text-amber-500' },
                 { title: 'GDPR / CCPA', desc: 'Full compliance with global and regional data privacy regulations.', icon: Scale, color: 'text-slate-900' }
               ].map((cert, i) => (
                  <div key={i} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col justify-between">
                     <div className={`p-4 bg-white rounded-2xl w-fit mb-6 shadow-sm ${cert.color}`}>
                        <cert.icon size={28} />
                     </div>
                     <h3 className="text-xl font-black text-slate-900 mb-2 italic tracking-tight">{cert.title}</h3>
                     <p className="text-xs text-slate-500 font-medium leading-relaxed italic">{cert.desc}</p>
                  </div>
               ))}
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
           <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Last Updated: October 24, 2024 • BuildOS Legal Node V2.4</p>
        </div>
      </main>
    </div>
  );
};

export default LegalView;
