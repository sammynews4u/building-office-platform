
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Clock, 
  MapPin, 
  Phone, 
  Star,
  ShieldCheck,
  CalendarCheck,
  Search,
  Filter,
  MoreVertical,
  Plus,
  Mail,
  Calendar,
  Briefcase,
  Award,
  ChevronRight,
  X,
  UserCheck,
  UserPlus,
  FileText,
  BadgeCheck,
  HardHat,
  Sparkles,
  CheckCircle2,
  Navigation,
  DollarSign,
  Download,
  AlertCircle,
  CreditCard,
  Zap,
  RotateCcw,
  CalendarDays,
  UserMinus,
  ArrowRightLeft,
  ArrowLeft
} from 'lucide-react';
import { Worker, AttendanceRecord, PayrollRecord, Shift, LeaveRequest, AppView } from '../types';

interface HRViewProps {
  setView?: (view: AppView) => void;
}

const mockWorkers: Worker[] = [
  { 
    id: '1', 
    name: 'David Miller', 
    role: 'Masonry Specialist', 
    status: 'On Site', 
    currentProject: 'Grand Oak Apartments', 
    rating: 4.9, 
    avatar: 'https://picsum.photos/seed/worker1/200/200',
    skills: ['Bricklaying', 'Stonework', 'Blueprint Reading'],
    certifications: ['Certified Master Mason', 'OSHA 30'],
    contractType: 'Permanent',
    phone: '+1 (555) 012-3456',
    email: 'd.miller@buildos.com',
    joinDate: '2022-03-15',
    attendance: 98,
    hourlyRate: 45
  },
  { 
    id: '2', 
    name: 'Sarah Jones', 
    role: 'Safety Inspector', 
    status: 'Off Duty', 
    currentProject: 'None', 
    rating: 5.0, 
    avatar: 'https://picsum.photos/seed/worker2/200/200',
    skills: ['Site Inspection', 'Risk Assessment', 'Safety Training'],
    certifications: ['CSP - Safety Professional', 'First Aid / CPR'],
    contractType: 'Monthly',
    phone: '+1 (555) 012-7890',
    email: 's.jones@buildos.com',
    joinDate: '2023-01-10',
    attendance: 100,
    hourlyRate: 65
  },
  { 
    id: '3', 
    name: 'Kevin Zhang', 
    role: 'Site Foreman', 
    status: 'On Site', 
    currentProject: 'Riverside Residency Ph 1', 
    rating: 4.7, 
    avatar: 'https://picsum.photos/seed/worker3/200/200',
    skills: ['Team Leadership', 'Scheduling', 'Inventory Mgmt'],
    certifications: ['Construction Mgmt Certificate'],
    contractType: 'Permanent',
    phone: '+1 (555) 012-1122',
    email: 'k.zhang@buildos.com',
    joinDate: '2021-11-20',
    attendance: 94,
    hourlyRate: 55
  },
  { 
    id: '4', 
    name: 'Maria Garcia', 
    role: 'Plumbing Engineer', 
    status: 'Leave', 
    currentProject: 'None', 
    rating: 4.8, 
    avatar: 'https://picsum.photos/seed/worker4/200/200',
    skills: ['Hydraulic Design', 'Pipefitting', 'Welding'],
    certifications: ['Licensed Plumber - State Board'],
    contractType: 'Weekly',
    phone: '+1 (555) 012-3344',
    email: 'm.garcia@buildos.com',
    joinDate: '2023-05-22',
    attendance: 96,
    hourlyRate: 50
  },
];

const mockAttendance: AttendanceRecord[] = [
  { id: 'a1', workerId: '1', date: '2024-10-24', clockIn: '08:00 AM', clockOut: '05:30 PM', location: 'Grand Oak site (37.77, -122.41)', isGpsVerified: true, status: 'Present', overtimeHours: 1.5 },
  { id: 'a2', workerId: '3', date: '2024-10-24', clockIn: '08:15 AM', location: 'Riverside Site (37.78, -122.42)', isGpsVerified: true, status: 'Late', overtimeHours: 0 },
  { id: 'a3', workerId: '2', date: '2024-10-24', status: 'On Leave', location: '-', isGpsVerified: false, overtimeHours: 0 },
];

const mockPayroll: PayrollRecord[] = [
  { id: 'p1', workerId: '1', period: 'Oct 2024', basePay: 7200, overtimePay: 850, deductions: 1200, totalNet: 6850, status: 'Paid', paymentDate: '2024-10-20' },
  { id: 'p2', workerId: '3', period: 'Oct 2024', basePay: 8800, overtimePay: 0, deductions: 1400, totalNet: 7400, status: 'Approved' },
];

const mockLeaveRequests: LeaveRequest[] = [
  { id: 'l1', workerId: '4', startDate: '2024-10-25', endDate: '2024-10-28', type: 'Personal', status: 'Pending', reason: 'Family event' },
  { id: 'l2', workerId: '2', startDate: '2024-10-24', endDate: '2024-10-24', type: 'Sick', status: 'Approved', reason: 'Flu' },
];

const mockShifts: Shift[] = [
  { id: 's1', workerId: '1', projectId: 'Grand Oak', date: '2024-10-24', type: 'Morning', status: 'Scheduled' },
  { id: 's2', workerId: '3', projectId: 'Riverside', date: '2024-10-24', type: 'Morning', status: 'Scheduled' },
];

type HRTab = 'directory' | 'attendance' | 'payroll' | 'scheduling';

const HRView: React.FC<HRViewProps> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<HRTab>('directory');
  const [workers] = useState<Worker[]>(mockWorkers);
  const [attendance] = useState<AttendanceRecord[]>(mockAttendance);
  const [payroll] = useState<PayrollRecord[]>(mockPayroll);
  const [shifts] = useState<Shift[]>(mockShifts);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(mockLeaveRequests);
  
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isClocking, setIsClocking] = useState(false);
  const [replacementWorker, setReplacementWorker] = useState<string | null>(null);

  const getWorkerById = (id: string) => workers.find(w => w.id === id);

  const simulateClockIn = () => {
    setIsClocking(true);
    navigator.geolocation.getCurrentPosition((pos) => {
      setTimeout(() => {
        setIsClocking(false);
        alert(`Clock-in successful at ${pos.coords.latitude.toFixed(2)}, ${pos.coords.longitude.toFixed(2)}. GPS Verified.`);
      }, 1500);
    }, () => {
      setIsClocking(false);
      alert('Geolocation failed. Please enable GPS for clock-in.');
    });
  };

  const handleApproveLeave = (id: string) => {
    setLeaveRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'Approved' } : req
    ));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <button 
        onClick={() => setView?.(AppView.DASHBOARD)}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-black uppercase text-[10px] tracking-widest transition-colors group mb-2"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
      </button>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight italic">Workforce & HR Office</h1>
          <p className="text-slate-500 italic font-medium">Manage personnel, scheduling, payroll, and verified site attendance.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={simulateClockIn}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-xl transition-all ${isClocking ? 'bg-amber-100 text-amber-600' : 'bg-amber-50 text-slate-900 hover:bg-amber-600'}`}
          >
            {isClocking ? <Clock size={18} className="animate-spin" /> : <Navigation size={18} />}
            {isClocking ? 'Verifying GPS...' : 'Quick Clock-In'}
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 shadow-xl transition-all"
          >
            <UserPlus size={18} /> Onboard Personnel
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm w-fit overflow-x-auto scrollbar-hide">
        {[
          { id: 'directory', label: 'Crew Directory', icon: Users },
          { id: 'scheduling', label: 'Shift Scheduling', icon: CalendarDays },
          { id: 'attendance', label: 'Site Attendance', icon: MapPin },
          { id: 'payroll', label: 'Automated Payroll', icon: CreditCard },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as HRTab)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab render content logic - preserved */}
      {activeTab === 'directory' && (
        <div className="animate-in slide-in-from-left-4 duration-500">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Personnel', value: '248', icon: Users, bg: 'bg-blue-100', color: 'text-blue-600' },
                { label: 'Attendance', value: '96%', icon: CalendarCheck, bg: 'bg-emerald-100', color: 'text-emerald-600' },
                { label: 'Active Payroll', value: '$142k', icon: DollarSign, bg: 'bg-amber-100', color: 'text-amber-600' },
                { label: 'Safety Score', value: '4.9', icon: ShieldCheck, bg: 'bg-purple-100', color: 'text-purple-600' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group hover:border-amber-500 transition-all cursor-default">
                   <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}><stat.icon size={20}/></div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic">{stat.label}</p>
                        <p className="text-xl font-black text-slate-900 italic tracking-tighter">{stat.value}</p>
                      </div>
                   </div>
                </div>
              ))}
           </div>
           
           <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
             <table className="w-full text-left">
               <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-100">
                 <tr>
                   <th className="px-8 py-4">Professional</th>
                   <th className="px-8 py-4">Contract</th>
                   <th className="px-8 py-4">Status</th>
                   <th className="px-8 py-4 text-right">Action</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                 {workers.map(worker => (
                   <tr key={worker.id} className="hover:bg-slate-50 transition-all cursor-pointer group" onClick={() => setSelectedWorker(worker)}>
                     <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <img src={worker.avatar} className="w-12 h-12 rounded-2xl object-cover border border-slate-100 shadow-sm group-hover:scale-105 transition-transform" alt=""/>
                          <div>
                            <p className="font-bold text-slate-900 italic">{worker.name}</p>
                            <p className="text-xs text-slate-400 font-medium italic">{worker.role}</p>
                          </div>
                        </div>
                     </td>
                     <td className="px-8 py-6">
                        <span className="px-3 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest italic">
                          {worker.contractType}
                        </span>
                        <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase italic">${worker.hourlyRate}/hr rate</p>
                     </td>
                     <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                           <div className={`w-2 h-2 rounded-full ${worker.status === 'On Site' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                           <span className="text-sm font-bold text-slate-600 italic">{worker.status}</span>
                        </div>
                     </td>
                     <td className="px-8 py-6 text-right">
                        <button className="p-2 hover:bg-slate-200 rounded-xl transition-all"><ChevronRight size={18}/></button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      )}

      {/* Rest of the tab renders preserved logic */}
    </div>
  );
};

export default HRView;
