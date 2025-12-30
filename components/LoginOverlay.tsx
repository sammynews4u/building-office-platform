
import React, { useState } from 'react';
import { Construction, Shield, HardHat, User, Building2, X, Mail, Lock, ArrowRight, ArrowLeft, ShieldCheck, ChevronRight } from 'lucide-react';
import { UserRole } from '../types';

interface AuthOverlayProps {
  onLogin: (role: UserRole) => void;
  onClose: () => void;
  initialMode: 'login' | 'signup';
}

const LoginOverlay: React.FC<AuthOverlayProps> = ({ onLogin, onClose, initialMode }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      // In a real app, we'd fetch the user's role from a database
      // Defaulting to ADMIN for demo purposes
      onLogin(UserRole.ADMIN); 
    } else {
      // Signup defaults to Company Owner (ADMIN)
      onLogin(UserRole.ADMIN);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[2.5rem] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-500">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors z-20"
        >
          <X size={20} />
        </button>
        
        <div className="p-12 bg-slate-900 flex flex-col justify-between relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 p-20 opacity-5 -mr-10 -mt-10">
            <Construction size={300} strokeWidth={1} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="bg-amber-500 p-2.5 rounded-xl text-slate-900 shadow-lg shadow-amber-500/20">
                <Construction size={28} />
              </div>
              <h1 className="text-3xl font-black tracking-tighter text-white italic">BuildOS</h1>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-black leading-tight italic tracking-tighter">
                {mode === 'login' ? 'Welcome back to the' : 'Build your digital'} <br />
                <span className="text-amber-500">Workspace</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-sm font-medium leading-relaxed italic">
                {mode === 'login' 
                  ? 'Access your unified construction dashboard and manage your entire enterprise fleet.' 
                  : 'Start as a Company Owner. Register your firm to gain full access to procurement, HR, and AI insights.'}
              </p>
            </div>
          </div>
          
          <div className="relative z-10 pt-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm">
                <ShieldCheck size={20} className="text-amber-500" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest italic">Enterprise Instance Encrypted</span>
            </div>
          </div>
        </div>

        <div className="p-12 bg-white flex flex-col justify-center min-h-[500px]">
          <div className="animate-in slide-in-from-right-4 duration-300">
            <div className="mb-10">
              <h3 className="text-3xl font-black text-slate-900 tracking-tight italic">
                {mode === 'login' ? 'Sign In' : 'Register Owner Account'}
              </h3>
              <p className="text-slate-500 font-medium mt-1 italic">
                {mode === 'login' ? 'Access your authorized dashboard.' : 'The first account created becomes the Company Admin.'}
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-5">
              {mode === 'signup' && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Company Name</label>
                  <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 focus-within:ring-4 focus-within:ring-amber-500/10 focus-within:border-amber-500 transition-all">
                    <Building2 size={18} className="text-slate-400" />
                    <input 
                      required 
                      type="text" 
                      placeholder="e.g. Structura Build Ltd." 
                      className="bg-transparent border-none outline-none font-bold text-slate-900 flex-1"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Work Email</label>
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 focus-within:ring-4 focus-within:ring-amber-500/10 focus-within:border-amber-500 transition-all">
                  <Mail size={18} className="text-slate-400" />
                  <input 
                    required 
                    type="email" 
                    placeholder="alex@structura.com" 
                    className="bg-transparent border-none outline-none font-bold text-slate-900 flex-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                  {mode === 'login' && <button type="button" className="text-[10px] font-bold text-amber-600 hover:underline italic">Forgot Password?</button>}
                </div>
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 focus-within:ring-4 focus-within:ring-amber-500/10 focus-within:border-amber-500 transition-all">
                  <Lock size={18} className="text-slate-400" />
                  <input 
                    required 
                    type="password" 
                    placeholder="••••••••" 
                    className="bg-transparent border-none outline-none font-bold text-slate-900 flex-1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                {mode === 'login' ? 'Enter Workspace' : 'Launch Operating System'}
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="mt-10 pt-10 border-t border-slate-100 text-center">
              <p className="text-slate-500 text-sm font-medium italic">
                {mode === 'login' ? "New firm to BuildOS?" : "Already have an account?"} {' '}
                <button 
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="text-amber-600 font-black hover:underline"
                >
                  {mode === 'login' ? 'Sign up as Owner' : 'Log In'}
                </button>
              </p>
            </div>
          </div>

          <div className="mt-auto pt-8 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-300">
            <span>Enterprise Security: V2.4</span>
            <span className="flex items-center gap-1"><Shield size={10} /> ISO 27001</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginOverlay;
