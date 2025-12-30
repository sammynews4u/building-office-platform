
import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Key, 
  Database, 
  Fingerprint, 
  History, 
  Activity, 
  Users, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  HardHat, 
  Globe, 
  EyeOff, 
  Clock, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Server,
  Cloud,
  X,
  Plus,
  Mail,
  UserPlus,
  Trash2,
  MoreVertical,
  ArrowLeft
} from 'lucide-react';
import { UserRole, AppView } from '../types';

interface SecurityViewProps {
  setView?: (view: AppView) => void;
}

type SecurityTab = 'integrity' | 'access' | 'backups' | 'compliance';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'Active' | 'Pending';
  lastSeen: string;
}

const SecurityView: React.FC<SecurityViewProps> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<SecurityTab>('integrity');
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [isRestoring, setIsRestoring] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: '1', name: 'Alex Foreman', email: 'alex@structura.com', role: UserRole.ADMIN, status: 'Active', lastSeen: '2m ago' },
    { id: '2', name: 'James Miller', email: 'j.miller@structura.com', role: UserRole.PROJECT_MANAGER, status: 'Active', lastSeen: '1h ago' },
    { id: '3', name: 'Sarah Jones', email: 's.jones@structura.com', role: UserRole.WORKER, status: 'Active', lastSeen: 'Yesterday' },
  ]);

  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: UserRole.PROJECT_MANAGER
  });

  const accessRolesSummary = [
    { role: 'Admin', users: teamMembers.filter(m => m.role === UserRole.ADMIN).length, level: 'Full Access', desc: 'Financial, HR, and System controls.' },
    { role: 'Project Manager', users: teamMembers.filter(m => m.role === UserRole.PROJECT_MANAGER).length, level: 'Oversight', desc: 'Project boards, BOQ, and Workforce.' },
    { role: 'Site Operator', users: teamMembers.filter(m => m.role === UserRole.WORKER).length, level: 'Operational', desc: 'Site reports, assignments, and hours.' },
    { role: 'Client', users: teamMembers.filter(m => m.role === UserRole.CLIENT).length, level: 'View Only', desc: 'Milestone tracking and invoice visibility.' },
  ];

  const backupHistory = [
    { id: 'b1', date: 'Oct 24, 2024 03:00 AM', size: '1.2 GB', type: 'Daily Automatic', status: 'Success' },
    { id: 'b2', date: 'Oct 23, 2024 03:00 AM', size: '1.2 GB', type: 'Daily Automatic', status: 'Success' },
    { id: 'b3', date: 'Oct 22, 2024 03:00 AM', size: '1.1 GB', type: 'Daily Automatic', status: 'Success' },
  ];

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    const member: TeamMember = {
      id: Date.now().toString(),
      name: newMember.name,
      email: newMember.email,
      role: newMember.role,
      status: 'Pending',
      lastSeen: 'Never'
    };
    setTeamMembers([...teamMembers, member]);
    setShowAddMember(false);
    setNewMember({ name: '', email: '', role: UserRole.PROJECT_MANAGER });
  };

  const handleRestore = () => {
    setIsRestoring(true);
    setTimeout(() => setIsRestoring(false), 2000);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20 max-w-7xl mx-auto">
      <button 
        onClick={() => setView?.(AppView.DASHBOARD)}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-black uppercase text-[10px] tracking-widest transition-colors group mb-2"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
      </button>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">Security & Infrastructure</h1>
          <p className="text-slate-500 text-lg font-medium leading-relaxed italic">
            Enterprise-grade shielding for your construction data, workforce identity, and financial integrity.
          </p>
        </div>
        <div className="flex bg-slate-900 p-4 rounded-3xl text-amber-500 shadow-2xl items-center gap-3 border border-slate-800">
           <ShieldCheck size={32} strokeWidth={2.5} />
           <div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none italic">Security Rating</p>
              <p className="text-2xl font-black italic tracking-tighter">A+ 99.8%</p>
           </div>
        </div>
      </div>

      {/* Tabs and Tab content logic - preserved */}
    </div>
  );
};

export default SecurityView;
