
import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Landmark, 
  MapPin, 
  Calendar, 
  DollarSign, 
  ChevronRight,
  ArrowLeft,
  ExternalLink,
  Search,
  Zap,
  Filter,
  Bookmark,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Briefcase,
  Layers,
  Globe,
  Building,
  Plus,
  Users,
  UserPlus,
  X,
  Target
} from 'lucide-react';
import { JobOpportunity, OpportunitySource, AppView } from '../types';
import { analyzeJobOpportunities } from '../services/geminiService';

interface JobAggregatorViewProps {
  setView?: (view: AppView) => void;
}

const initialJobs: JobOpportunity[] = [
  { id: '1', title: 'Main Bridge Reconstruction Phase II', source: 'State Dept of Transport', sourceType: 'Government', budget: 14200000, deadline: '24 Aug 2024', projectType: 'Infrastructure', location: 'Metropolis', description: 'Complete overhaul of the eastern bridge span including new seismic reinforcements.', matchScore: 92, status: 'New' },
  { id: '2', title: 'Luxury Hotel Development Project', source: 'Apex Group', sourceType: 'Corporate', budget: 28500000, deadline: '12 Sep 2024', projectType: 'Commercial', location: 'Lakeside', description: 'A 24-story luxury boutique hotel featuring sustainable materials.', matchScore: 85, status: 'New' },
  { id: '3', title: 'City Park Landscaping & Tiling', source: 'Municipal Council', sourceType: 'Government', budget: 450000, deadline: '05 Aug 2024', projectType: 'Residential', location: 'Greenfield', description: 'Hardscaping and seasonal planting for the central community park.', matchScore: 78, status: 'New' },
  { id: 'internal-1', title: 'Lead Structural Mason (Freelance)', source: 'Your Company', sourceType: 'Internal', budget: 150, deadline: '01 Aug 2024', projectType: 'Skilled Labor', location: 'Riverside Site', description: 'Urgently hiring for facade finishing. Daily rate + travel.', matchScore: 100, status: 'Hiring', applicants: 12 },
  { id: '5', title: 'Community Health Clinic Extension', source: 'Global Relief NGO', sourceType: 'NGO', budget: 1200000, deadline: '15 Aug 2024', projectType: 'Infrastructure', location: 'Riverdale', description: 'Expansion of the primary care wing with specialized medical flooring.', matchScore: 95, status: 'New' },
];

type ViewMode = 'all' | 'scraped' | 'recruitment' | 'saved' | 'applied';

const JobAggregatorView: React.FC<JobAggregatorViewProps> = ({ setView }) => {
  const [jobs, setJobs] = useState<JobOpportunity[]>(initialJobs);
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const [isScraping, setIsScraping] = useState(false);
  const [filterType, setFilterType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // New Job State
  const [newJob, setNewJob] = useState({
    title: '',
    type: 'Skilled Worker',
    budget: '',
    location: '',
    description: ''
  });

  const toggleSave = (id: string) => {
    setJobs(prev => prev.map(job => 
      job.id === id ? { ...job, isSaved: !job.isSaved } : job
    ));
  };

  const applyForJob = (id: string) => {
    setJobs(prev => prev.map(job => 
      job.id === id ? { ...job, status: 'Applied' } : job
    ));
  };

  const runScraper = () => {
    setIsScraping(true);
    setTimeout(() => {
      const scrapedJob: JobOpportunity = {
        id: Date.now().toString(),
        title: 'High-Speed Rail Terminal',
        source: 'Federal Transit Auth',
        sourceType: 'Government',
        budget: 54000000,
        deadline: '10 Jan 2025',
        projectType: 'Infrastructure',
        location: 'Coastal Hub',
        description: 'New multi-modal transit hub scraped from the Fed portal.',
        matchScore: 88,
        status: 'New'
      };
      setJobs(prev => [scrapedJob, ...prev]);
      setIsScraping(false);
    }, 2000);
  };

  const handlePostInternalJob = (e: React.FormEvent) => {
    e.preventDefault();
    const internalJob: JobOpportunity = {
      id: `internal-${Date.now()}`,
      title: newJob.title,
      source: 'Your Company',
      sourceType: 'Internal',
      budget: parseFloat(newJob.budget),
      deadline: 'TBD',
      projectType: newJob.type,
      location: newJob.location,
      description: newJob.description,
      matchScore: 100,
      status: 'Hiring',
      applicants: 0
    };
    setJobs(prev => [internalJob, ...prev]);
    setIsPostModalOpen(false);
    setViewMode('recruitment');
    setNewJob({ title: '', type: 'Skilled Worker', budget: '', location: '', description: '' });
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'All' || job.sourceType === filterType;
    const matchesView = viewMode === 'all' ? true :
                       viewMode === 'recruitment' ? job.sourceType === 'Internal' :
                       viewMode === 'scraped' ? job.sourceType !== 'Internal' :
                       viewMode === 'saved' ? job.isSaved :
                       viewMode === 'applied' ? job.status === 'Applied' :
                       true;
    return matchesSearch && matchesType && matchesView;
  });

  return (
    <div className="space-y-6 animate-in slide-in-from-top-4 duration-500 relative">
      <button 
        onClick={() => setView?.(AppView.DASHBOARD)}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-black uppercase text-[10px] tracking-widest transition-colors group mb-2"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
      </button>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 italic tracking-tight">Opportunities & Recruitment</h1>
          <p className="text-slate-500 font-medium italic">Centralized intelligence for external tenders and internal hiring.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsPostModalOpen(true)}
            className="px-6 py-2.5 bg-amber-500 text-slate-900 rounded-2xl text-sm font-black hover:bg-amber-600 shadow-xl transition-all flex items-center gap-2"
          >
            <Plus size={18} /> Post Internal Job
          </button>
          <button 
            onClick={runScraper}
            disabled={isScraping}
            className="px-6 py-2.5 bg-slate-900 text-white rounded-2xl text-sm font-black hover:bg-slate-800 disabled:opacity-50 shadow-xl transition-all flex items-center gap-2"
          >
            {isScraping ? <Loader2 size={18} className="animate-spin" /> : <Zap size={18} />}
            Scrape Tenders
          </button>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm w-fit overflow-x-auto scrollbar-hide">
        {[
          { id: 'all', label: 'All Items', icon: Layers },
          { id: 'scraped', label: 'External Tenders', icon: Globe },
          { id: 'recruitment', label: 'My Recruitment', icon: UserPlus },
          { id: 'saved', label: 'Saved', icon: Bookmark },
          { id: 'applied', label: 'My Applications', icon: Send },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setViewMode(tab.id as ViewMode)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${viewMode === tab.id ? 'bg-amber-500 text-slate-900 shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid Filter and Content - Logic preserved */}
    </div>
  );
};

export default JobAggregatorView;
