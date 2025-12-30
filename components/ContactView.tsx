
import React from 'react';
import { Construction, ArrowLeft, Mail, Phone, MapPin, Send, MessageSquare, Globe } from 'lucide-react';

interface ContactViewProps {
  onBack: () => void;
}

const ContactView: React.FC<ContactViewProps> = ({ onBack }) => {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
             <div className="space-y-6">
                <h1 className="text-6xl font-black italic tracking-tighter uppercase leading-none text-slate-900">
                  Let's Build <br /> <span className="text-amber-500">Together</span>
                </h1>
                <p className="text-slate-500 text-xl font-medium italic leading-relaxed">
                  Have questions about enterprise deployment, local sourcing, or custom AI integration? Our engineering team is ready to assist.
                </p>
             </div>

             <div className="space-y-8">
                {[
                  { icon: Mail, label: 'Email', value: 'hello@buildos.com', sub: 'Inquiries respond in 2h' },
                  { icon: Phone, label: 'Enterprise Line', value: '+1 (888) BUILD-OS', sub: 'Mon-Fri 9AM-6PM PT' },
                  { icon: MessageSquare, label: 'Live Chat', value: 'Start in-app chat', sub: '24/7 Agent Support' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group cursor-pointer">
                    <div className="p-4 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-amber-500 group-hover:text-slate-900 transition-all">
                       <item.icon size={24} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">{item.label}</p>
                       <p className="text-lg font-black text-slate-900 italic">{item.value}</p>
                       <p className="text-xs text-slate-500 font-medium italic">{item.sub}</p>
                    </div>
                  </div>
                ))}
             </div>

             <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-8 opacity-5"><Globe size={150} /></div>
                <h4 className="text-xl font-black italic text-amber-500 mb-4 uppercase tracking-tighter">Regional Offices</h4>
                <div className="grid grid-cols-2 gap-8 relative z-10">
                   <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">HQ / Americas</p>
                      <p className="text-sm font-bold italic">San Francisco, CA</p>
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">EMEA Hub</p>
                      <p className="text-sm font-bold italic">London, UK</p>
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Middle East</p>
                      <p className="text-sm font-bold italic">Dubai, UAE</p>
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Asia Pacific</p>
                      <p className="text-sm font-bold italic">Singapore</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-slate-50 p-10 md:p-16 rounded-[4rem] border border-slate-100 shadow-inner">
             <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                      <input type="text" placeholder="Alex Builder" className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-bold italic" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                      <input type="email" placeholder="alex@firm.com" className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-bold italic" />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Company Name</label>
                   <input type="text" placeholder="Structura Build Ph 1" className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-bold italic" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inquiry Type</label>
                   <select className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-bold italic appearance-none">
                      <option>Enterprise Deployment</option>
                      <option>Marketplace Membership</option>
                      <option>Financial Support</option>
                      <option>Technical/API Query</option>
                   </select>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Message</label>
                   <textarea rows={4} placeholder="How can our OS help your business?" className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-bold italic resize-none" />
                </div>
                <button className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95">
                  Send Inquiry <Send size={18} className="text-amber-500" />
                </button>
             </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactView;
