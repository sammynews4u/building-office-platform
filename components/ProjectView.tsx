
import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  AlertCircle, 
  MoreVertical, 
  ExternalLink,
  Plus,
  GanttChart,
  Target,
  ArrowLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers,
  Link2,
  Workflow,
  ClipboardList,
  Camera,
  CloudSun,
  Users,
  FileText,
  ChevronDown,
  ImageIcon,
  MoreHorizontal,
  ClipboardCheck,
  ShieldAlert,
  Search,
  CheckCircle,
  XCircle,
  RotateCcw,
  Sticker,
  FileCheck,
  Files,
  ShieldCheck,
  History,
  Download,
  Eye,
  ArrowUpRight,
  Bell,
  Scale,
  Activity,
  UserCheck,
  Briefcase,
  HardHat,
  Gavel,
  MessageSquare,
  UserPlus,
  Phone,
  Mail,
  Building2,
  Globe,
  CalendarClock,
  User,
  X,
  Trash2
} from 'lucide-react';
import { Project, Task, Milestone, SiteReport, SiteIssue, Inspection, Defect, ProjectDocument, ComplianceRequirement, SiteIncident, Stakeholder, AppView } from '../types';

interface ProjectViewProps {
  setView?: (view: AppView) => void;
}

const mockProjects: Project[] = [
  { 
    id: '1', 
    name: 'Grand Oak Apartments', 
    location: 'San Francisco, CA', 
    status: 'In Progress', 
    progress: 68, 
    budget: 2400000, 
    spent: 1600000,
    startDate: '2024-01-01',
    endDate: '2025-06-30',
    projectManager: 'Alex Foreman',
    clientContact: {
      name: 'Sarah Skyline',
      email: 'sarah@skyline-dev.com',
      phone: '+1 (555) 098-7654'
    },
    milestones: [
      { id: 'm1', name: 'Foundation Poured', dueDate: '2024-02-15', status: 'Reached', description: 'Main concrete slab completion' },
      { id: 'm2', name: 'Topping Out', dueDate: '2024-11-15', status: 'Upcoming', description: 'Highest structural point reached', notifiedUpcoming: true },
      { id: 'm3', name: 'Electrical Rough-in', dueDate: '2024-12-20', status: 'Upcoming', description: 'Internal wiring installation' }
    ],
    tasks: [
      { id: 't1', name: 'Excavation', startDate: '2024-01-10', endDate: '2024-01-25', progress: 100, status: 'Completed', dependencies: [] },
      { id: 't2', name: 'Concrete Slab', startDate: '2024-01-26', endDate: '2024-02-15', progress: 100, status: 'Completed', dependencies: ['t1'] },
      { id: 't3', name: 'Steel Framing', startDate: '2024-02-16', endDate: '2024-11-30', progress: 85, status: 'In Progress', dependencies: ['t2'] },
      { id: 't4', name: 'Curtain Wall', startDate: '2024-12-01', endDate: '2024-12-30', progress: 0, status: 'Pending', dependencies: ['t3'] },
      { id: 't5', name: 'HVAC Ducting', startDate: '2024-12-15', endDate: '2025-01-15', progress: 0, status: 'Blocked', dependencies: ['t3'] },
    ],
    siteReports: [
      { id: 'r1', date: 'Oct 24, 2024', supervisor: 'James Supt.', weather: 'Sunny, 22°C', workforceCount: 42, summary: 'Steel framing on Level 4 continuing. Material delivery received on time.', incidents: 'None' },
      { id: 'r2', date: 'Oct 23, 2024', supervisor: 'James Supt.', weather: 'Partly Cloudy, 19°C', workforceCount: 38, summary: 'Level 3 cleanup completed. Electrical team started rough-in on Level 1.', incidents: 'Minor equipment breakdown (Mixer)' },
    ],
    siteIssues: [
      { id: 'i1', title: 'Level 3 Column Alignment Variance', severity: 'Medium', status: 'Open', reportedAt: 'Oct 24, 2024' },
      { id: 'i2', title: 'Delayed Waterproofing Material', severity: 'High', status: 'Open', reportedAt: 'Oct 22, 2024' },
      { id: 'i3', title: 'Site Entrance Potholes', severity: 'Low', status: 'Resolved', reportedAt: 'Oct 15, 2024' },
    ],
    sitePhotos: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400',
    ],
    inspections: [
      { 
        id: 'ins1', 
        title: 'Foundation Slab Rebar Check', 
        date: 'Oct 24, 2024', 
        inspector: 'Sarah Jones', 
        status: 'Approved',
        checks: [
          { id: 'c1', label: 'Bar spacing conforms to drawing S102', isPassed: true },
          { id: 'c2', label: 'Laps are minimum 40D', isPassed: true },
          { id: 'c3', label: 'Chairs placed at 1m centers', isPassed: true },
        ]
      },
      { 
        id: 'ins2', 
        title: 'Level 2 Structural Framing', 
        date: 'Oct 25, 2024', 
        inspector: 'Sarah Jones', 
        status: 'Under Review',
        checks: [
          { id: 'c4', label: 'Verticality check of columns', isPassed: true },
          { id: 'c5', label: 'Beam to column connections', isPassed: false },
        ]
      }
    ],
    defects: [
      { id: 'def1', title: 'Cracked Slab Segment A', description: 'Minor hairline cracks appearing post-pour.', severity: 'Medium', status: 'Open', location: 'Section A, L1', reportedAt: 'Oct 22, 2024' },
      { id: 'def2', title: 'Exposed Rebar', description: 'Rebar exposed in beam soffit.', severity: 'Critical', status: 'Open', location: 'Beam B12, L3', reportedAt: 'Oct 24, 2024' }
    ],
    documents: [
      { id: 'doc1', name: 'Master Construction Contract', category: 'Contract', type: 'PDF', size: '2.4 MB', updatedAt: '2024-01-10', versions: [
        { version: 'v2.0', date: '2024-01-10', author: 'Legal Team', url: '#' },
        { version: 'v1.0', date: '2023-12-15', author: 'Legal Team', url: '#' }
      ]},
      { id: 'doc2', name: 'Structural Blueprint Level 4', category: 'Drawing', type: 'DWG', size: '18.2 MB', updatedAt: '2024-10-20', versions: [
        { version: 'v4.2', date: '2024-10-20', author: 'Arch. Mike', url: '#' }
      ]},
      { id: 'doc3', name: 'Site Safety Permit #S-992', category: 'Permit', type: 'PDF', size: '1.1 MB', updatedAt: '2024-02-01', versions: [
        { version: 'v1.0', date: '2024-02-01', author: 'Municipal Authority', url: '#' }
      ]},
      { id: 'doc4', name: 'Worker Liability Insurance', category: 'Insurance', type: 'PDF', size: '0.8 MB', updatedAt: '2024-01-01', versions: [
        { version: 'v1.0', date: '2024-01-01', author: 'SafeGuard Ins.', url: '#' }
      ]}
    ],
    compliance: [
      { id: 'comp1', title: 'OSHA Safety Standards', category: 'Safety', status: 'Compliant', expiryDate: '2025-05-10', reminderSent: false },
      { id: 'comp2', title: 'City Build Permit #82-A', category: 'Regulatory', status: 'Compliant', expiryDate: '2024-12-31', reminderSent: false },
      { id: 'comp3', title: 'Professional Indemnity', category: 'Insurance', status: 'Action Required', expiryDate: '2024-11-01', reminderSent: true },
      { id: 'comp4', title: 'Environmental Impact Audit', category: 'Regulatory', status: 'Pending', reminderSent: false }
    ],
    incidents: [
      { id: 'inc1', title: 'Minor Rebar Trip', type: 'Safety', date: 'Oct 22, 2024', severity: 'Low', status: 'Resolved', description: 'Worker tripped on exposed rebar, no injury.', reportedBy: 'James Supt.' },
      { id: 'inc2', title: 'Fuel Spill (Small)', type: 'Environmental', date: 'Oct 24, 2024', severity: 'Medium', status: 'Investigating', description: 'Hydraulic leak from crane, cleanup initiated.', reportedBy: 'Sarah Jones' }
    ],
    stakeholders: [
      { id: 's1', name: 'Michael Archi', role: 'Architect', company: 'DesignHaus Studio', email: 'm.archi@designhaus.com', phone: '+1 555-0987', status: 'Active', lastActive: '2h ago', avatar: 'https://picsum.photos/seed/archi/100/100', assignedTasks: ['t4'] },
      { id: 's2', name: 'Elena Struct', role: 'Engineer', company: 'BuildSafe Engineering', email: 'e.struct@buildsafe.io', phone: '+1 555-4422', status: 'Active', lastActive: '10m ago', avatar: 'https://picsum.photos/seed/eng/100/100', assignedTasks: ['t3'] },
      { id: 's3', name: 'VoltMaster Co.', role: 'Sub-contractor', company: 'VoltMaster Electrical', email: 'service@voltmaster.com', phone: '+1 555-1111', status: 'Active', lastActive: 'Yesterday', avatar: 'https://picsum.photos/seed/sub/100/100', assignedTasks: ['m3'] },
      { id: 's4', name: 'Green Consultants', role: 'Consultant', company: 'Eco-Build Solutions', email: 'info@eco-build.net', phone: '+1 555-2233', status: 'On Hold', lastActive: '5d ago', avatar: 'https://picsum.photos/seed/con/100/100' },
    ]
  },
  { 
    id: '2', 
    name: 'Modern Office Complex', 
    location: 'Austin, TX', 
    status: 'Delayed', 
    progress: 42, 
    budget: 8100000, 
    spent: 4500000,
    startDate: '2024-03-15',
    endDate: '2025-12-01',
    projectManager: 'Kevin Zhang',
    clientContact: {
      name: 'Mark Austin',
      email: 'm.austin@corporate-space.com',
      phone: '+1 (555) 123-4567'
    },
    milestones: [
        { id: 'm-ov1', name: 'Excavation', dueDate: '2024-10-20', status: 'Overdue', description: 'Foundation hole preparation', notifiedOverdue: true }
    ]
  },
];

const ProjectView: React.FC<ProjectViewProps> = ({ setView }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'gantt' | 'milestones' | 'site' | 'quality' | 'documents' | 'stakeholders'>('overview');
  const [showVersionHistory, setShowVersionHistory] = useState<string | null>(null);
  const [stakeholderFilter, setStakeholderFilter] = useState<string>('All');
  
  // Milestone state
  const [isAddMilestoneModalOpen, setIsAddMilestoneModalOpen] = useState(false);
  const [projectMilestones, setProjectMilestones] = useState<Milestone[]>([]);
  const [newMilestone, setNewMilestone] = useState<Partial<Milestone>>({
    name: '',
    dueDate: '',
    status: 'Upcoming',
    description: ''
  });

  const selectedProject = mockProjects.find(p => p.id === selectedProjectId);

  useEffect(() => {
    if (selectedProject) {
      setProjectMilestones(selectedProject.milestones || []);
    }
  }, [selectedProjectId]);

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestone.name || !newMilestone.dueDate) return;

    const milestone: Milestone = {
      id: `m-${Date.now()}`,
      name: newMilestone.name,
      dueDate: newMilestone.dueDate,
      status: newMilestone.status as any,
      description: newMilestone.description || ''
    };

    setProjectMilestones([...projectMilestones, milestone]);
    setIsAddMilestoneModalOpen(false);
    setNewMilestone({ name: '', dueDate: '', status: 'Upcoming', description: '' });
  };

  const updateMilestoneStatus = (id: string, status: Milestone['status']) => {
    setProjectMilestones(prev => prev.map(m => m.id === id ? { ...m, status } : m));
  };

  const deleteMilestone = (id: string) => {
    setProjectMilestones(prev => prev.filter(m => m.id !== id));
  };

  if (selectedProject) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500 pb-20">
        {/* Detail Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSelectedProjectId(null)}
              className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-black text-slate-900 italic tracking-tight">{selectedProject.name}</h1>
              <p className="text-slate-500 text-sm font-medium flex items-center gap-2">
                <MapPin size={14} /> {selectedProject.location} • <span className="text-amber-600 font-bold uppercase tracking-widest text-[10px]">{selectedProject.status}</span>
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 shadow-xl transition-all">
              <Camera size={18} /> Site Snap
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm w-fit overflow-x-auto scrollbar-hide">
          {[
            { id: 'overview', label: 'Dashboard', icon: Layers },
            { id: 'gantt', label: 'Gantt Schedule', icon: GanttChart },
            { id: 'milestones', label: 'Milestones', icon: Target },
            { id: 'site', label: 'Site Management', icon: ClipboardList },
            { id: 'quality', label: 'Quality Control', icon: ClipboardCheck },
            { id: 'documents', label: 'Docs & Compliance', icon: Files },
            { id: 'stakeholders', label: 'Stakeholders', icon: Users },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content renders */}
        {activeTab === 'milestones' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5 -mr-8 -mt-8"><Target size={180}/></div>
                <div className="relative z-10">
                   <h3 className="font-black text-2xl text-slate-900 italic tracking-tight">Project Milestones</h3>
                   <p className="text-sm text-slate-500 font-medium max-w-md italic mt-2">Define and track critical delivery points. Milestones represent verified completion stages for client billing.</p>
                </div>
                <button 
                  onClick={() => setIsAddMilestoneModalOpen(true)}
                  className="px-8 py-4 bg-amber-500 text-slate-900 rounded-[2rem] text-sm font-black uppercase tracking-widest shadow-xl shadow-amber-500/20 hover:bg-amber-400 transition-all flex items-center gap-2 relative z-10 active:scale-95 italic"
                >
                   <Plus size={18} /> New Milestone
                </button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectMilestones.length > 0 ? projectMilestones.map((m) => (
                   <div key={m.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 hover:border-amber-500 hover:shadow-2xl transition-all group flex flex-col h-full relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><Target size={120}/></div>
                      
                      <div className="flex justify-between items-start mb-8 relative z-10">
                         <div className={`p-4 rounded-2xl shadow-inner transition-colors ${
                           m.status === 'Reached' ? 'bg-emerald-50 text-emerald-600' : 
                           m.status === 'Overdue' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                         }`}>
                           {m.status === 'Reached' ? <CheckCircle2 size={28} /> : 
                            m.status === 'Overdue' ? <AlertTriangle size={28} /> : <Clock size={28} />}
                         </div>
                         <div className="flex flex-col items-end gap-2">
                           <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg border ${
                             m.status === 'Reached' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                             m.status === 'Overdue' ? 'bg-rose-50 text-rose-600 border-rose-100 animate-pulse' : 'bg-amber-50 text-amber-600 border-amber-100'
                           }`}>
                             {m.status}
                           </span>
                           <div className="flex gap-1">
                              <button onClick={() => updateMilestoneStatus(m.id, 'Reached')} className="p-1.5 hover:bg-emerald-50 text-slate-300 hover:text-emerald-500 transition-colors" title="Mark as Reached"><CheckCircle size={14}/></button>
                              <button onClick={() => updateMilestoneStatus(m.id, 'Upcoming')} className="p-1.5 hover:bg-amber-50 text-slate-300 hover:text-amber-500 transition-colors" title="Reset to Upcoming"><RotateCcw size={14}/></button>
                              <button onClick={() => deleteMilestone(m.id)} className="p-1.5 hover:bg-rose-50 text-slate-300 hover:text-rose-500 transition-colors" title="Remove"><Trash2 size={14}/></button>
                           </div>
                         </div>
                      </div>

                      <h4 className="text-xl font-black text-slate-900 italic tracking-tight mb-4 group-hover:text-amber-600 transition-colors leading-tight">{m.name}</h4>
                      <p className="text-sm text-slate-500 font-medium italic leading-relaxed mb-8 flex-1">{m.description}</p>
                      
                      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                         <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                            <Calendar size={14} className="text-slate-300" /> Due: {m.dueDate}
                         </div>
                         <button className="p-2 text-slate-400 hover:text-slate-900"><ChevronRight size={18} /></button>
                      </div>
                   </div>
                )) : (
                  <div className="col-span-full py-24 text-center bg-white rounded-[3rem] border-4 border-dashed border-slate-100">
                    <div className="flex justify-center mb-6 text-slate-100"><Target size={64} /></div>
                    <p className="text-lg font-black text-slate-300 italic uppercase tracking-widest">No milestones defined for this site.</p>
                    <button onClick={() => setIsAddMilestoneModalOpen(true)} className="mt-8 px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all">Setup Roadmap</button>
                  </div>
                )}
             </div>
          </div>
        )}

        {/* Milestone Modal */}
        {isAddMilestoneModalOpen && (
           <div className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                 <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-4">
                       <div className="p-4 bg-amber-500 text-slate-900 rounded-2xl shadow-xl"><Target size={28} /></div>
                       <div>
                          <h2 className="text-2xl font-black text-slate-900 italic">Add Milestone</h2>
                          <p className="text-xs text-slate-500 font-bold tracking-widest uppercase italic">Project: {selectedProject.name}</p>
                       </div>
                    </div>
                    <button onClick={() => setIsAddMilestoneModalOpen(false)} className="p-3 hover:bg-slate-200 rounded-full text-slate-400 transition-colors"><X size={24} /></button>
                 </div>
                 <form onSubmit={handleAddMilestone} className="p-10 space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Milestone Name</label>
                       <input 
                         required
                         type="text" 
                         placeholder="e.g. Structure Topping Out" 
                         className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-amber-500 transition-all font-bold italic text-slate-900" 
                         value={newMilestone.name}
                         onChange={e => setNewMilestone({...newMilestone, name: e.target.value})}
                       />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Due Date</label>
                          <input 
                            required
                            type="date" 
                            className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-amber-500 transition-all font-bold italic text-slate-900" 
                            value={newMilestone.dueDate}
                            onChange={e => setNewMilestone({...newMilestone, dueDate: e.target.value})}
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Initial Status</label>
                          <select 
                            className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-amber-500 transition-all font-bold italic text-slate-900 appearance-none"
                            value={newMilestone.status}
                            onChange={e => setNewMilestone({...newMilestone, status: e.target.value as any})}
                          >
                             <option value="Upcoming">Upcoming</option>
                             <option value="Reached">Reached</option>
                             <option value="Overdue">Overdue</option>
                          </select>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</label>
                       <textarea 
                         rows={3}
                         placeholder="Detailed scope of this milestone..."
                         className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-amber-500 transition-all font-medium italic text-slate-700 resize-none"
                         value={newMilestone.description}
                         onChange={e => setNewMilestone({...newMilestone, description: e.target.value})}
                       />
                    </div>
                    <button type="submit" className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-slate-800 shadow-2xl transition-all active:scale-[0.98]">
                       Save Milestone Node
                    </button>
                 </form>
              </div>
           </div>
        )}

        {/* Other tab renders - logic preserved/placeholder */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-left-4 duration-500">
             <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                   <div className="flex items-center justify-between mb-8">
                      <h3 className="font-black text-lg italic tracking-tight">Real-time Performance Pulse</h3>
                      <div className="flex gap-2">
                         <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-black rounded uppercase tracking-widest">AI Calibrated</span>
                      </div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                      <div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Total Valuation</p>
                         <p className="text-3xl font-black italic tracking-tighter">${(selectedProject.budget / 1000000).toFixed(1)}M</p>
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Budget Expended</p>
                         <p className="text-3xl font-black italic tracking-tighter text-amber-500">${(selectedProject.spent / 1000000).toFixed(1)}M</p>
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Completion Delta</p>
                         <p className="text-3xl font-black italic tracking-tighter text-emerald-500">+12%</p>
                      </div>
                   </div>
                   <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-slate-900 rounded-full w-[68%] relative">
                         <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.05)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.05)_50%,rgba(255,255,255,0.05)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"></div>
                      </div>
                   </div>
                   <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.3em] mt-4 text-center">Master Site Utilization Cycle</p>
                </div>
             </div>
             
             <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5 scale-150 rotate-12"><Target size={200}/></div>
                <div className="relative z-10">
                   <h4 className="text-amber-500 font-black uppercase tracking-widest text-[10px] mb-6">Upcoming Milestones</h4>
                   <div className="space-y-6">
                      {projectMilestones.filter(m => m.status === 'Upcoming').slice(0, 3).map(m => (
                         <div key={m.id} className="flex gap-4 group">
                            <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-amber-500 group-hover:text-slate-900 transition-all"><Clock size={18}/></div>
                            <div>
                               <p className="text-sm font-black italic">{m.name}</p>
                               <p className="text-[10px] text-slate-500 font-bold uppercase italic">Due: {m.dueDate}</p>
                            </div>
                         </div>
                      ))}
                   </div>
                   <button onClick={() => setActiveTab('milestones')} className="w-full mt-10 py-4 bg-white/10 hover:bg-white text-white hover:text-slate-900 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                      Review Site Roadmap
                   </button>
                </div>
             </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <button 
        onClick={() => setView?.(AppView.DASHBOARD)}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-black uppercase text-[10px] tracking-widest transition-colors group mb-2"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight italic">Enterprise Project Inventory</h1>
          <p className="text-slate-500 italic font-medium">Oversee all active construction sites, schedules, and financial milestones.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 shadow-xl transition-all">
          <Plus size={18} /> Add New Site
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl transition-all group">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-black italic shadow-lg ${
                    project.status === 'Delayed' ? 'bg-rose-500' : 
                    project.status === 'Completed' ? 'bg-emerald-500' : 'bg-slate-900'
                  }`}>
                    {project.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-slate-900 group-hover:text-amber-600 transition-colors italic tracking-tight">{project.name}</h3>
                    <div className="flex items-center gap-1 text-slate-500 text-sm mt-1 font-medium">
                      <MapPin size={14} className="text-slate-400" /> {project.location}
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                  <MoreVertical size={20} className="text-slate-400" />
                </button>
              </div>

              <div className="flex items-center gap-6 mb-8 bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                <div className="flex-1">
                  <div className="flex justify-between items-end mb-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Construction Progress</p>
                    <p className="text-sm font-black text-slate-900 italic">{project.progress}%</p>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                        project.status === 'Delayed' ? 'bg-rose-500' : 'bg-emerald-500'
                      }`} 
                      style={{width: `${project.progress}%`}}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 py-6 border-y border-slate-100">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Total Valuation</p>
                  <p className="text-lg font-black text-slate-900 italic">${(project.budget / 1000000).toFixed(1)}M</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Current Spent</p>
                  <p className="text-lg font-black text-slate-900 italic">${(project.spent / 1000000).toFixed(1)}M</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-[0.1em] ${
                    project.status === 'Delayed' ? 'bg-rose-100 text-rose-700' : 
                    project.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-900'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>
              
              <div className="mt-8 flex gap-3">
                <button 
                  onClick={() => { setSelectedProjectId(project.id); setActiveTab('site'); }}
                  className="flex-1 py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-2 italic"
                >
                   Site Logs
                </button>
                <button 
                  onClick={() => setSelectedProjectId(project.id)}
                  className="flex-1 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-900 text-xs font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 italic"
                >
                  <Workflow size={16} /> Manage Schedule
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectView;
