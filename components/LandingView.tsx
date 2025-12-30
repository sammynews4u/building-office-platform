
import React from 'react';
import { 
  Construction, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Globe, 
  BarChart3, 
  Briefcase, 
  Users, 
  Sparkles,
  Play,
  CheckCircle2,
  Hammer,
  Truck,
  Layers,
  Headphones,
  Radar,
  Activity,
  MapPin,
  Package,
  UserPlus,
  Crown,
  Trophy
} from 'lucide-react';

interface LandingViewProps {
  onGetStarted: () => void;
  onLoginClick: () => void;
  setView: (view: 'landing' | 'about' | 'partners' | 'contact' | 'legal') => void;
}

const LandingView: React.FC<LandingViewProps> = ({ onGetStarted, onLoginClick, setView }) => {
  return (
    <div className="bg-white overflow-hidden selection:bg-amber-200">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('landing')}>
          <div className="bg-amber-500 p-2 rounded-xl text-slate-900 shadow-lg shadow-amber-500/20">
            <Construction size={24} />
          </div>
          <span className="font-black text-2xl tracking-tighter text-slate-900 italic">BuildOS</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => setView('about')} className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">About</button>
          <button onClick={() => setView('partners')} className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Partners</button>
          <button onClick={() => setView('contact')} className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Contact</button>
          <button onClick={() => setView('legal')} className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Legal</button>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onLoginClick} className="hidden sm:block text-sm font-bold text-slate-600 hover:text-slate-900">Sign In</button>
          <button 
            onClick={onGetStarted}
            className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
          >
            Join the Network
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-bold mb-8 animate-bounce">
            <Zap size={14} fill="currentColor" />
            <span>New: Gemini-Powered Cost Prediction is here</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight leading-[0.9] mb-8">
            The Industry's <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">First True OS.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-500 text-lg md:text-xl font-medium leading-relaxed mb-10">
            One platform for everything. Manage equipment rentals, source materials, hire contractors, and run your construction office with AI-driven intelligence.
          </p>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-16">
            <button 
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 py-5 bg-amber-500 text-slate-900 rounded-2xl font-black text-lg hover:bg-amber-600 shadow-2xl shadow-amber-500/30 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              Get Started for Free <ArrowRight size={20} />
            </button>
            <button className="w-full sm:w-auto px-8 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95">
              <Play size={20} fill="currentColor" /> Watch 2min Demo
            </button>
            <button 
              onClick={() => setView('contact')}
              className="w-full sm:w-auto px-8 py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-200 active:scale-95"
            >
              <Headphones size={20} /> Contact our sales agent
            </button>
          </div>

          <div className="relative max-w-5xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-slate-900 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white rounded-[2rem] border border-slate-200 shadow-2xl overflow-hidden aspect-video">
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2000" 
                className="w-full h-full object-cover grayscale opacity-20" 
                alt="Dashboard Mockup"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/5 backdrop-blur-sm">
                <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 max-w-md text-left animate-in zoom-in-95 duration-700 delay-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><Sparkles size={20} /></div>
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">AI Recommendation</span>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2 italic">"You are overspending on Fe 550D Steel. 3 suppliers in your 50km radius have listed lower rates this morning."</h4>
                  <div className="flex gap-2">
                    <button className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg">Apply Insights</button>
                    <button className="text-xs font-bold text-slate-400 px-3 py-1.5 rounded-lg">Dismiss</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 border-y border-slate-100 bg-slate-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-10">Powering Leading Construction Firms Worldwide</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale items-center">
            <h3 className="text-2xl font-black italic">STRUCTURA</h3>
            <h3 className="text-2xl font-black italic">METRO-CORP</h3>
            <h3 className="text-2xl font-black italic">SKYLINE.CO</h3>
            <h3 className="text-2xl font-black italic">INDUS-HEAVY</h3>
            <h3 className="text-2xl font-black italic">URBAN-X</h3>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none mb-4">Everything you need to <br /><span className="text-slate-400">scale with zero friction.</span></h2>
              <p className="text-slate-500 font-medium italic">Stop juggling 5 different apps. Start building with BuildOS.</p>
            </div>
            <button onClick={onGetStarted} className="text-amber-600 font-bold flex items-center gap-2 group">View all features <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-slate-900 rounded-[2.5rem] p-12 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <Globe size={300} strokeWidth={1} />
              </div>
              <div className="relative z-10">
                <div className="p-3 bg-white/10 w-fit rounded-2xl mb-8"><Layers size={24} /></div>
                <h3 className="text-4xl font-black mb-4">Universal Marketplace</h3>
                <p className="text-slate-400 text-lg max-w-sm leading-relaxed mb-8">Rent heavy machinery, buy raw materials, or hire specialized subcontractors in one unified global marketplace.</p>
                <div className="flex flex-wrap gap-3">
                  {['Rental', 'Materials', 'Services'].map(tag => (
                    <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-amber-500 rounded-[2.5rem] p-12 text-slate-900 flex flex-col justify-between">
              <div>
                <div className="p-3 bg-slate-900/10 w-fit rounded-2xl mb-8"><BarChart3 size={24} /></div>
                <h3 className="text-3xl font-black mb-4 tracking-tight leading-none">Financial Control</h3>
                <p className="font-bold opacity-70 leading-relaxed italic">"The only platform that calculates profit-per-project in real-time."</p>
              </div>
              <div className="mt-12 p-6 bg-white rounded-3xl shadow-xl">
                <div className="h-2 w-full bg-slate-100 rounded-full mb-2">
                  <div className="h-full bg-amber-500 w-[78%] rounded-full"></div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Budget Utilization: 78%</span>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-12 flex flex-col justify-between group hover:border-amber-500 transition-colors">
              <div>
                <div className="p-3 bg-blue-50 text-blue-600 w-fit rounded-2xl mb-8"><Users size={24} /></div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Workforce Management</h3>
                <p className="text-slate-500 text-sm">Site attendance, payroll automation, and skills certification tracking.</p>
              </div>
              <button className="mt-8 text-slate-400 group-hover:text-slate-900 transition-colors"><ArrowRight size={24} /></button>
            </div>
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-12 md:col-span-2 group hover:border-amber-500 transition-colors overflow-hidden">
               <div className="flex flex-col md:flex-row gap-12 items-center">
                 <div className="flex-1">
                    <div className="p-3 bg-emerald-50 text-emerald-600 w-fit rounded-2xl mb-8"><Sparkles size={24} /></div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">AI Insights with Gemini 3 Pro</h3>
                    <p className="text-slate-500 leading-relaxed mb-6">Let our AI agent scan your BOQs and site logs to find hidden risks before they become expensive delays.</p>
                    <ul className="space-y-2">
                      {['Risk Analysis', 'Cost Benchmarking', 'Smart Sourcing'].map(item => (
                        <li key={item} className="flex items-center gap-2 text-sm font-bold text-slate-600">
                          <CheckCircle2 size={16} className="text-emerald-500" /> {item}
                        </li>
                      ))}
                    </ul>
                 </div>
                 <div className="w-full md:w-64 shrink-0 bg-slate-50 rounded-3xl p-6 border border-slate-100 rotate-2 group-hover:rotate-0 transition-transform">
                    <div className="space-y-4">
                      <div className="h-4 bg-slate-200 rounded-full w-3/4"></div>
                      <div className="h-4 bg-slate-200 rounded-full w-1/2"></div>
                      <div className="h-10 bg-amber-100 rounded-xl w-full border border-amber-200"></div>
                      <div className="h-4 bg-slate-200 rounded-full w-2/3"></div>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Activity Pulse */}
      <section className="bg-slate-950 py-32 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-amber-500/[0.03] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.05)_1px,transparent_1px)] [background-size:100px_100px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 space-y-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest italic">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Network Pulse Active
             </div>
             <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">Global Site <span className="text-amber-500">Connectivity</span></h2>
             <p className="text-slate-400 max-w-2xl mx-auto font-medium italic">Building the future in real-time. Watch as our network sources, constructs, and deploys assets across the globe.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {[
               { icon: Truck, location: 'London, UK', text: 'Tower Crane Rented for 14 Days', time: 'Just Now', color: 'text-amber-400', bg: 'bg-amber-400/5' },
               { icon: Package, location: 'Dubai, UAE', text: '20 Tons Steel Plate Sourced', time: '2m ago', color: 'text-blue-400', bg: 'bg-blue-400/5' },
               { icon: UserPlus, location: 'Austin, TX', text: 'Site Supervisor Assigned to Ph 2', time: '5m ago', color: 'text-emerald-400', bg: 'bg-emerald-400/5' },
               { icon: Radar, location: 'Berlin, DE', text: 'Regional Tender Discovery Scanned', time: '12m ago', color: 'text-purple-400', bg: 'bg-purple-400/5' },
             ].map((pulse, i) => (
                <div key={i} className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-sm group hover:border-amber-500/30 transition-all">
                   <div className="flex items-center justify-between mb-8">
                      <div className={`p-3 rounded-2xl ${pulse.bg} ${pulse.color}`}>
                         <pulse.icon size={22} />
                      </div>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{pulse.time}</span>
                   </div>
                   <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-tight italic">
                         <MapPin size={10} className="text-rose-500" /> {pulse.location}
                      </div>
                      <p className="text-sm font-black italic leading-tight group-hover:text-white transition-colors">{pulse.text}</p>
                   </div>
                   <div className="mt-8 pt-6 border-t border-white/5">
                      <div className="flex -space-x-2">
                         {[1,2,3].map(v => <div key={v} className="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-950"></div>)}
                         <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-[8px] font-black flex items-center justify-center border-2 border-slate-950">+12</div>
                      </div>
                   </div>
                </div>
             ))}
          </div>

          <div className="mt-20 text-center">
             <button className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-amber-500 transition-all shadow-2xl active:scale-95 flex items-center gap-3 mx-auto">
                Explore Global Activity <Globe size={18} />
             </button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
             <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none text-slate-900">Tiered <span className="text-amber-500">Marketplace</span> Pricing</h2>
             <p className="text-slate-500 max-w-2xl mx-auto font-medium italic">Simple, volume-based access to the world's most powerful construction procurement network.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { tier: 'Starter', price: '10', count: '1', icon: Package, color: 'text-slate-400', bg: 'bg-white' },
              { tier: 'Professional', price: '15', count: '3', icon: Zap, color: 'text-amber-500', bg: 'bg-white', featured: true },
              { tier: 'Business', price: '25', count: '5', icon: Trophy, color: 'text-blue-500', bg: 'bg-white' },
              { tier: 'Enterprise', price: '50', count: '10', icon: Crown, color: 'text-slate-900', bg: 'bg-slate-900', dark: true },
            ].map((plan, i) => (
              <div key={i} className={`p-10 rounded-[3rem] border ${plan.dark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} shadow-xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-500`}>
                {plan.featured && <div className="absolute top-0 right-0 bg-amber-500 text-slate-900 px-6 py-2 rounded-bl-3xl font-black text-[10px] uppercase tracking-widest">Most Popular</div>}
                <div className={`p-4 rounded-2xl w-fit mb-8 ${plan.dark ? 'bg-white/10 text-amber-500' : 'bg-slate-50 ' + plan.color}`}>
                   <plan.icon size={24} />
                </div>
                <h3 className="font-black text-2xl italic tracking-tight mb-2">{plan.tier}</h3>
                <div className="flex items-end gap-1 mb-8">
                   <span className="text-5xl font-black italic tracking-tighter">${plan.price}</span>
                   <span className="text-slate-400 font-bold mb-2">/mo</span>
                </div>
                <div className="space-y-4 mb-10">
                   <div className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-emerald-500" />
                      <span className="text-sm font-bold">{plan.count} Marketplace Access</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-emerald-500" />
                      <span className="text-sm font-bold">Standard ERP Tools</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-emerald-500" />
                      <span className="text-sm font-bold">Verified Sourcing</span>
                   </div>
                </div>
                <button 
                  onClick={onGetStarted}
                  className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${plan.dark ? 'bg-white text-slate-900 hover:bg-amber-500' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl'}`}
                >
                   Select Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-amber-500 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 p-12 opacity-5">
            <Construction size={200} />
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none mb-8 relative z-10">
            Ready to Build <br /> Smarter?
          </h2>
          <p className="text-slate-900/60 text-lg font-bold mb-12 max-w-xl mx-auto italic relative z-10">
            Join thousands of construction firms moving their entire operation to BuildOS.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <button 
              onClick={onGetStarted}
              className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-slate-800 transition-all shadow-2xl active:scale-95"
            >
              Start Free Trial
            </button>
            <button 
              onClick={() => setView('contact')}
              className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all shadow-sm active:scale-95"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('landing')}>
              <div className="bg-slate-900 p-2 rounded-xl text-amber-500">
                <Construction size={24} />
              </div>
              <span className="font-black text-2xl tracking-tighter text-slate-900 italic">BuildOS</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              The only all-in-one operating system designed from the ground up for the construction industry.
            </p>
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-widest text-slate-900 mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-medium">
              <li><button onClick={() => setView('about')} className="hover:text-amber-600 transition-colors">About Us</button></li>
              <li><button onClick={() => setView('partners')} className="hover:text-amber-600 transition-colors">Partner Network</button></li>
              <li><button onClick={() => setView('contact')} className="hover:text-amber-600 transition-colors">Contact</button></li>
              <li><button onClick={() => setView('legal')} className="hover:text-amber-600 transition-colors">Legal</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-widest text-slate-900 mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-medium">
              <li><button onClick={() => setView('about')} className="hover:text-amber-600 transition-colors">Vision</button></li>
              <li><button onClick={() => setView('partners')} className="hover:text-amber-600 transition-colors">Integrations</button></li>
              <li><button onClick={() => setView('contact')} className="hover:text-amber-600 transition-colors">Support</button></li>
              <li><button onClick={() => setView('legal')} className="hover:text-amber-600 transition-colors">Privacy</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-widest text-slate-900 mb-6">Newsletter</h4>
            <p className="text-slate-500 text-sm mb-4">Get the latest construction trends directly to your inbox.</p>
            <div className="flex gap-2 p-1 bg-white border border-slate-200 rounded-xl">
              <input type="text" placeholder="Email" className="flex-1 px-3 py-2 text-sm outline-none" />
              <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
          <p>© 2024 BuildOS Platform Inc. Built with Gemini 3 Intelligence.</p>
          <div className="flex gap-6">
            <button onClick={() => setView('legal')} className="hover:text-slate-900 transition-colors">Privacy</button>
            <button onClick={() => setView('legal')} className="hover:text-slate-900 transition-colors">Security</button>
            <button onClick={() => setView('legal')} className="hover:text-slate-900 transition-colors">Terms</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingView;
