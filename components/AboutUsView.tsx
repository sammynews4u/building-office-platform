
import React from 'react';
/* Added missing HardHat import to fix the error on line 72 */
import { Construction, ArrowLeft, Target, Lightbulb, Workflow, ShieldCheck, Zap, HardHat } from 'lucide-react';

interface AboutUsViewProps {
  onBack: () => void;
}

const AboutUsView: React.FC<AboutUsViewProps> = ({ onBack }) => {
  return (
    <div className="bg-white min-h-screen animate-in fade-in duration-500">
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
          <div className="bg-amber-500 p-2 rounded-xl text-slate-900 shadow-lg">
            <Construction size={24} />
          </div>
          <span className="font-black text-2xl tracking-tighter text-slate-900 italic">BuildOS</span>
        </div>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-black uppercase text-slate-400 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
           <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none text-slate-900">
             Building the <span className="text-amber-500">Digital Site</span>
           </h1>
           <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium italic">
             BuildOS is the world's first complete operating system designed exclusively for the multi-trillion dollar construction industry.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <div className="space-y-8">
             <div className="p-4 bg-amber-50 w-fit rounded-3xl text-amber-500 shadow-sm">
                <Target size={32} />
             </div>
             <h2 className="text-4xl font-black text-slate-900 italic tracking-tight">Our Mission</h2>
             <p className="text-lg text-slate-600 leading-relaxed font-medium italic">
               To eliminate the chaos of construction management by unifying procurement, labor, and finance into one intelligent interface. We believe builders should spend their time building, not fighting fragmented software.
             </p>
             <div className="grid grid-cols-2 gap-8">
                <div>
                   <p className="text-4xl font-black text-slate-900 italic">10X</p>
                   <p className="text-xs font-black uppercase text-slate-400 tracking-widest mt-1">Faster Sourcing</p>
                </div>
                <div>
                   <p className="text-4xl font-black text-slate-900 italic">Zero</p>
                   <p className="text-xs font-black uppercase text-slate-400 tracking-widest mt-1">Manual Payroll</p>
                </div>
             </div>
          </div>
          <div className="bg-slate-900 rounded-[3rem] aspect-square overflow-hidden shadow-2xl relative group">
             <img src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover opacity-40 grayscale group-hover:scale-110 transition-transform duration-1000" alt="Site Vision" />
             <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="text-center space-y-6">
                   <Zap size={64} className="text-amber-500 mx-auto animate-pulse" />
                   <h3 className="text-3xl font-black text-white italic tracking-tighter">Powered by BuildOS Neural</h3>
                </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: 'Industry First', desc: 'The first unified ERP, Marketplace, and HR platform for construction.', icon: Lightbulb },
             { title: 'AI Native', desc: 'Built with Gemini 3 Intelligence at the core for predictive risk mapping.', icon: Zap },
             /* Fixed: HardHat is now imported from lucide-react */
             { title: 'Site First', desc: 'Every feature is tested on active worksites to ensure rugged usability.', icon: HardHat }
           ].map((card, i) => (
              <div key={i} className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-amber-500 transition-all group">
                 <div className="p-4 bg-white rounded-2xl w-fit mb-8 shadow-sm group-hover:scale-110 transition-transform">
                    <card.icon size={28} className="text-amber-500" />
                 </div>
                 <h4 className="text-2xl font-black italic text-slate-900 mb-4">{card.title}</h4>
                 <p className="text-slate-500 font-medium italic leading-relaxed">{card.desc}</p>
              </div>
           ))}
        </div>
      </main>
    </div>
  );
};

export default AboutUsView;
