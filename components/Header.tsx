
import React from 'react';
/* Added missing AlertCircle to imports */
import { Bell, Search, Menu, ChevronDown, ShieldCheck, AlertCircle } from 'lucide-react';
import { UserRole } from '../types';

interface HeaderProps {
  toggleSidebar: () => void;
  role: UserRole;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, role }) => {
  const getRoleLabel = () => {
    switch (role) {
      case UserRole.ADMIN: return 'Administrator';
      case UserRole.PROJECT_MANAGER: return 'Project Manager';
      case UserRole.WORKER: return 'Site Operator';
      case UserRole.CLIENT: return 'Project Owner';
      default: return 'User';
    }
  };

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-slate-100 rounded-lg md:hidden"
        >
          <Menu size={20} />
        </button>
        <div className="relative hidden md:block group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search BuildOS..."
            className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full w-80 text-sm focus:ring-2 focus:ring-amber-500 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-slate-600 border border-slate-200">
          <ShieldCheck size={16} className="text-amber-600" />
          <span className="text-xs font-bold uppercase tracking-widest">{getRoleLabel()}</span>
        </div>
        
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors group">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-amber-500 text-slate-900 text-[8px] font-black flex items-center justify-center rounded-full border-2 border-white animate-bounce">
            4
          </span>
          {/* Notification dropdown hover preview simulation */}
          <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 py-4 hidden group-hover:block animate-in fade-in slide-in-from-top-2 duration-200">
             <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 italic">Recent Alerts</p>
             <div className="space-y-1 px-2">
                <div className="p-3 bg-amber-50 rounded-xl flex gap-3 items-start">
                   <div className="p-1.5 bg-amber-500 text-white rounded-lg shadow-sm"><Bell size={12}/></div>
                   <p className="text-[11px] font-bold text-slate-700 leading-tight">Milestone "Topping Out" is due in 3 days.</p>
                </div>
                <div className="p-3 bg-rose-50 rounded-xl flex gap-3 items-start">
                   {/* AlertCircle now correctly imported */}
                   <div className="p-1.5 bg-rose-500 text-white rounded-lg shadow-sm"><AlertCircle size={12}/></div>
                   <p className="text-[11px] font-bold text-slate-700 leading-tight">Milestone "Excavation" missed target date.</p>
                </div>
             </div>
          </div>
        </button>
        
        <div className="h-8 w-px bg-slate-200 mx-1"></div>
        
        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 leading-tight">Alex Foreman</p>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">ID: #BOS-8291</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white border-2 border-slate-800 overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
              <img src="https://picsum.photos/seed/user82/100/100" alt="Profile" />
            </div>
            <ChevronDown size={16} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
