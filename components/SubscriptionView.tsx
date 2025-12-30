
import React, { useState } from 'react';
import { 
  Shield, 
  Zap, 
  Crown, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  TrendingUp, 
  Target, 
  Users, 
  PieChart, 
  Sparkles, 
  Info,
  CreditCard,
  History,
  Building2,
  DollarSign,
  Briefcase,
  ExternalLink,
  ChevronRight,
  Plus,
  Smartphone,
  Landmark,
  ShieldCheck,
  Package,
  Trophy,
  /* Added missing FileText import */
  FileText
} from 'lucide-react';
import { AppView } from '../types';

interface SubscriptionViewProps {
  setView?: (view: AppView) => void;
}

const SubscriptionView: React.FC<SubscriptionViewProps> = ({ setView }) => {
  const [currentPlan, setCurrentPlan] = useState('Professional');

  const plans = [
    {
      name: 'Starter',
      price: '$10',
      interval: '/mo',
      desc: 'Perfect for local contractors exploring digital procurement.',
      icon: Package,
      color: 'text-slate-400',
      bg: 'bg-slate-50',
      btn: 'Switch to Starter',
      features: [
        '1 Active Marketplace Access',
        'Standard ERP Site Logs',
        'Bulk Email Support',
        '2.5% Marketplace Fee',
        'Basic Site Tracking'
      ]
    },
    {
      name: 'Professional',
      price: '$15',
      interval: '/mo',
      desc: 'Complete toolkit for multi-site operations.',
      icon: Zap,
      color: 'text-amber-500',
      bg: 'bg-amber-50',
      featured: true,
      btn: 'Current Plan',
      features: [
        '3 Active Marketplace Access',
        'AI Intelligence Center',
        'Multi-signature Approvals',
        '1.5% Marketplace Fee',
        'Priority Site Support',
        'Automated Payroll'
      ]
    },
    {
      name: 'Business',
      price: '$25',
      interval: '/mo',
      desc: 'Advanced tools for regional enterprises.',
      icon: Trophy,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
      btn: 'Upgrade to Business',
      features: [
        '5 Active Marketplace Access',
        'Regional Lead Discovery AI',
        'Advanced Asset IoT Tracking',
        '1.0% Marketplace Fee',
        'Custom Roles & Permissions',
        'Dedicated Support Line'
      ]
    },
    {
      name: 'Enterprise',
      price: '$50',
      interval: '/mo',
      desc: 'Maximum visibility and lowest transaction overhead.',
      icon: Crown,
      color: 'text-slate-900',
      bg: 'bg-slate-100',
      btn: 'Upgrade to Enterprise',
      features: [
        '10 Active Marketplace Access',
        'White-label Client Portal',
        '0.5% Marketplace Fee',
        'Blockchain Ledger Security',
        'Enterprise API Access',
        'Account Strategy Manager'
      ]
    }
  ];

  const monetizationStats = [
    { label: 'Marketplace Volume', value: '$42,500', sub: 'Last 30 days', icon: TrendingUp, color: 'text-emerald-500' },
    { label: 'Transaction Fees Paid', value: '$637', sub: '1.5% Pro rate', icon: DollarSign, color: 'text-amber-500' },
    { label: 'Ad Impressions', value: '1,240', sub: 'Featured listings', icon: Target, color: 'text-blue-500' },
    { label: 'Lead Conversions', value: '8', sub: 'High intent', icon: Users, color: 'text-purple-500' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20 max-w-7xl mx-auto">
      <button 
        onClick={() => setView?.(AppView.DASHBOARD)}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-black uppercase text-[10px] tracking-widest transition-colors group mb-2"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
      </button>

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight italic uppercase">Marketplace Access & Plans</h1>
        <p className="text-slate-500 text-lg font-medium leading-relaxed italic">
          Scale your business with BuildOS. Choose a plan that fits your volume and take advantage of our global internal marketplace tiers.
        </p>
      </div>

      {/* Monetization Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {monetizationStats.map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm group hover:border-amber-500 transition-all cursor-default overflow-hidden relative">
               <div className="absolute top-0 right-0 p-8 opacity-5 scale-125 group-hover:scale-150 transition-transform"><stat.icon size={100}/></div>
               <div className={`p-4 rounded-2xl w-fit mb-6 bg-slate-50 ${stat.color} group-hover:scale-110 transition-transform shadow-sm`}>
                  <stat.icon size={22} />
               </div>
               <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic mb-1">{stat.label}</p>
                  <p className="text-3xl font-black text-slate-900 italic tracking-tighter">{stat.value}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase mt-2">{stat.sub}</p>
               </div>
            </div>
         ))}
      </div>

      {/* Plans Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {plans.map((plan, i) => (
          <div key={i} className={`p-8 rounded-[3rem] border-2 flex flex-col justify-between transition-all group relative overflow-hidden ${plan.featured ? 'border-amber-500 bg-white shadow-2xl scale-[1.02] z-10' : 'border-slate-100 bg-white hover:border-slate-300'}`}>
            {plan.featured && (
               <div className="absolute top-0 right-0 bg-amber-500 text-slate-900 px-6 py-2 rounded-bl-3xl font-black text-[10px] uppercase tracking-widest">Active Plan</div>
            )}
            <div>
              <div className={`p-4 rounded-2xl w-fit mb-8 ${plan.bg} ${plan.color} group-hover:rotate-6 transition-transform shadow-sm`}>
                <plan.icon size={28} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 italic tracking-tight mb-2">{plan.name}</h3>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-black italic tracking-tighter text-slate-900">{plan.price}</span>
                <span className="text-slate-400 font-bold mb-1.5">{plan.interval}</span>
              </div>
              <p className="text-sm text-slate-500 font-medium italic mb-10 leading-relaxed">
                {plan.desc}
              </p>
              <div className="space-y-4 mb-12">
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="p-1 bg-emerald-50 text-emerald-600 rounded-full shadow-sm"><CheckCircle2 size={12}/></div>
                    <span className="text-xs font-bold text-slate-600 italic leading-none">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
            <button 
              onClick={() => setCurrentPlan(plan.name)}
              className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-95 ${plan.name === currentPlan ? 'bg-slate-100 text-slate-400 cursor-default' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl'}`}
            >
              {plan.btn}
            </button>
          </div>
        ))}
      </div>

      {/* Payment Methods & History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
               <h3 className="text-xl font-black italic tracking-tight flex items-center gap-2">
                  <CreditCard size={22} className="text-blue-500" /> Authorized Settlement Method
               </h3>
               <button className="text-[10px] font-black text-blue-600 uppercase hover:underline italic">Add Gateway</button>
            </div>
            <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><Landmark size={150}/></div>
               <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                  <div className="flex justify-between items-start">
                     <div className="h-10 w-16 bg-white/20 rounded-lg backdrop-blur-sm border border-white/10"></div>
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 italic">Enterprise Settlement</p>
                  </div>
                  <div className="space-y-1">
                     <p className="text-2xl font-mono tracking-widest">•••• •••• •••• 9922</p>
                     <p className="text-[10px] font-black uppercase tracking-widest opacity-60 italic">Structura Build Holdings</p>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-xs font-bold italic opacity-60">Exp: 12 / 28</span>
                     <div className="h-8 w-12 bg-white/10 rounded border border-white/5 flex items-center justify-center">
                        <ShieldCheck size={16} className="text-amber-500" />
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
               <h3 className="text-xl font-black italic tracking-tight flex items-center gap-2">
                  <History size={22} className="text-amber-500" /> Recent Billings
               </h3>
               <button className="text-[10px] font-black text-blue-600 uppercase hover:underline italic">Full Statement</button>
            </div>
            <div className="space-y-4">
               {[
                  { ref: 'BOS-9912', date: 'Oct 01, 2024', amount: '$199.00', status: 'Cleared' },
                  { ref: 'BOS-8822', date: 'Sep 01, 2024', amount: '$199.00', status: 'Cleared' },
                  { ref: 'BOS-7721', date: 'Aug 01, 2024', amount: '$199.00', status: 'Cleared' },
               ].map((bill, i) => (
                  <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-amber-500 transition-all">
                     <div className="flex items-center gap-4">
                        <div className="p-3 bg-white rounded-xl shadow-sm text-slate-400 group-hover:text-amber-500 transition-colors">
                           <FileText size={18} />
                        </div>
                        <div>
                           <p className="text-sm font-black text-slate-900 italic leading-none mb-1">{bill.ref}</p>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{bill.date}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-sm font-black text-slate-900 italic">{bill.amount}</p>
                        <span className="text-[9px] font-black uppercase text-emerald-600 flex items-center gap-1 justify-end italic"><CheckCircle2 size={10}/> {bill.status}</span>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default SubscriptionView;
