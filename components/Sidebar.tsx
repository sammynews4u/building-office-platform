
import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Wallet, 
  HardHat, 
  Users, 
  Search, 
  FileText,
  ChevronLeft,
  ChevronRight,
  Construction,
  Globe,
  LogOut,
  Hammer,
  Settings,
  Presentation,
  Files,
  BarChart3,
  MessagesSquare,
  CreditCard,
  ShieldAlert,
  Receipt
} from 'lucide-react';
import { AppView, UserRole } from '../types';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  role: UserRole;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isOpen, setOpen, role, onLogout }) => {
  const getMenuItems = () => {
    const baseItems = [
      { id: AppView.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
      { id: AppView.PROJECTS, label: 'Projects', icon: HardHat },
    ];

    if (role === UserRole.ADMIN || role === UserRole.PROJECT_MANAGER) {
      baseItems.push(
        { id: AppView.ANALYTICS, label: 'Intelligence', icon: BarChart3 },
        { id: AppView.COLLABORATION, label: 'Collaboration', icon: MessagesSquare }
      );
    }

    if (role === UserRole.CLIENT) {
      baseItems.push(
        { id: AppView.CLIENT_PORTAL, label: 'Client Portal', icon: Presentation },
        { id: AppView.COLLABORATION, label: 'Collaboration', icon: MessagesSquare }
      );
    }

    if (role === UserRole.ADMIN || role === UserRole.PROJECT_MANAGER || role === UserRole.CLIENT) {
      baseItems.push(
        { id: AppView.SERVICES_MARKETPLACE, label: 'Services', icon: Hammer },
        { id: AppView.MARKETPLACE, label: 'Marketplace', icon: ShoppingCart },
        { id: AppView.BOQ, label: 'BOQ / Costing', icon: FileText },
        { id: AppView.JOBS, label: 'Job Board', icon: Search }
      );
    }

    if (role === UserRole.ADMIN || role === UserRole.PROJECT_MANAGER) {
      baseItems.push(
        { id: AppView.INVOICE_GENERATOR, label: 'Invoice Builder', icon: Receipt },
        { id: AppView.DOCUMENTS, label: 'Docs & Compliance', icon: Files }
      );
    }

    if (role === UserRole.ADMIN) {
      baseItems.push(
        { id: AppView.FINANCE, label: 'Finance', icon: Wallet },
        { id: AppView.HR, label: 'Workforce', icon: Users },
        { id: AppView.COMPANY_PROFILE, label: 'Public Site', icon: Globe },
        { id: AppView.SUBSCRIPTION, label: 'Plans & Billing', icon: CreditCard },
        { id: AppView.SECURITY, label: 'Security & Infra', icon: ShieldAlert }
      );
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} bg-slate-900 h-full transition-all duration-300 flex flex-col text-slate-300 shrink-0 shadow-2xl z-30`}>
      <div className="p-6 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="bg-amber-500 p-2 rounded-xl text-slate-900 shrink-0 shadow-lg shadow-amber-500/20">
            <Construction size={22} strokeWidth={2.5} />
          </div>
          {isOpen && <span className="font-black text-white text-2xl tracking-tighter italic">BuildOS</span>}
        </div>
      </div>

      <nav className="flex-1 mt-6 px-3 space-y-1.5 overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all relative group ${
              currentView === item.id 
                ? 'bg-amber-500 text-slate-900 font-bold shadow-xl shadow-amber-500/20' 
                : 'hover:bg-slate-800/50 text-slate-400 hover:text-white'
            }`}
          >
            <item.icon size={22} className="shrink-0" />
            {isOpen && <span className="truncate text-sm tracking-tight">{item.label}</span>}
            {!isOpen && (
              <div className="absolute left-full ml-4 px-3 py-1 bg-slate-800 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                {item.label}
              </div>
            )}
          </button>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-800 space-y-1">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:bg-rose-500/10 hover:text-rose-400 transition-all group"
        >
          <LogOut size={22} className="shrink-0" />
          {isOpen && <span className="truncate text-sm font-medium">Log Out</span>}
        </button>
        
        <button 
          onClick={() => setOpen(!isOpen)}
          className="w-full flex items-center justify-center p-2 rounded-xl hover:bg-slate-800 transition-colors text-slate-500"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
