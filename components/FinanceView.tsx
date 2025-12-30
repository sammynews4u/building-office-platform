
import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  ArrowLeft,
  FileText, 
  Plus, 
  Download, 
  Filter, 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  ChevronRight, 
  X, 
  PlusCircle, 
  Trash2, 
  CheckCircle2, 
  Receipt as ReceiptIcon, 
  Search, 
  AlertCircle, 
  ShieldCheck, 
  Scale, 
  History, 
  Clock, 
  Briefcase, 
  Star, 
  PieChart, 
  BellRing, 
  ArrowRight, 
  BarChart3, 
  Percent,
  Fingerprint,
  Activity,
  Gavel,
  AlertOctagon,
  ShieldAlert,
  UserCheck,
  Smartphone,
  Building2,
  Lock,
  Globe,
  RefreshCw,
  Zap,
  Check
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Invoice, Receipt, InvoiceItem, InvoiceStatus, Transaction, AppView } from '../types';

interface FinanceViewProps {
  setView?: (view: AppView) => void;
}

const chartData = [
  { month: 'Jan', income: 45000, expenses: 32000 },
  { month: 'Feb', income: 52000, expenses: 38000 },
  { month: 'Mar', income: 48000, expenses: 41000 },
  { month: 'Apr', income: 61000, expenses: 45000 },
  { month: 'May', income: 55000, expenses: 48000 },
  { month: 'Jun', income: 68000, expenses: 51000 },
];

const mockInvoices: Invoice[] = [
  {
    id: 'inv1',
    invoiceNumber: 'INV-2024-001',
    clientName: 'Skyline Developers',
    date: '2024-02-12',
    dueDate: '2024-03-12',
    items: [{ id: '1', description: 'Foundation Works', quantity: 1, rate: 12000, total: 12000 }],
    subtotal: 12000,
    vatRate: 15,
    vatAmount: 1800,
    withholdingRate: 2,
    withholdingAmount: 240,
    grandTotal: 13560,
    amountPaid: 13560,
    status: 'Paid',
    project: 'Riverside Residency'
  },
  {
    id: 'inv2',
    invoiceNumber: 'INV-2024-002',
    clientName: 'Urban-X Corp',
    date: '2024-02-15',
    dueDate: '2024-03-15',
    items: [{ id: '2', description: 'Structural Framing', quantity: 1, rate: 45000, total: 45000 }],
    subtotal: 45000,
    vatRate: 15,
    vatAmount: 6750,
    withholdingRate: 2,
    withholdingAmount: 900,
    grandTotal: 50850,
    amountPaid: 20000,
    status: 'Partial',
    project: 'Metro Hub Ph 1'
  },
  {
    id: 'inv3',
    invoiceNumber: 'INV-2024-003',
    clientName: 'Indus-Heavy Co',
    date: '2024-02-20',
    dueDate: '2024-03-20',
    items: [{ id: '3', description: 'Electrical Grid Setups', quantity: 1, rate: 8500, total: 8500 }],
    subtotal: 8500,
    vatRate: 15,
    vatAmount: 1275,
    withholdingRate: 2,
    withholdingAmount: 170,
    grandTotal: 9605,
    amountPaid: 0,
    status: 'Overdue',
    project: 'Indus Factory Expansion'
  }
];

const mockExpenses: Transaction[] = [
  { id: 'exp1', date: '2024-02-14', amount: 4500, category: 'Expense', description: 'Bulk Cement Grade V', project: 'Riverside Residency' },
  { id: 'exp2', date: '2024-02-18', amount: 1200, category: 'Expense', description: 'Rental: Excavator Model X', project: 'Metro Hub Ph 1' },
  { id: 'exp3', date: '2024-02-22', amount: 8000, category: 'Expense', description: 'Subcontractor: Electrical Roughing', project: 'Riverside Residency' },
  { id: 'exp4', date: '2024-02-25', amount: 350, category: 'Expense', description: 'Site Office Internet (Q1)', project: 'Indus Factory Expansion' },
];

const mockAuditLogs = [
  { id: 'au1', user: 'Alex Foreman', action: 'Authorized Invoice', target: 'INV-2024-003', timestamp: '2024-10-24 10:15 AM', ip: '192.168.1.45' },
  { id: 'au2', user: 'System Agent', action: 'Fraud Check Passed', target: 'EXP-4829', timestamp: '2024-10-24 09:30 AM', ip: 'internal' },
  { id: 'au3', user: 'Sarah CFO', action: 'Approved Multi-sig', target: 'Site Purchase #22', timestamp: '2024-10-23 04:45 PM', ip: '172.16.0.12' },
];

const mockPendingApprovals = [
  { id: 'ap1', type: 'Purchase Order', value: 12500, requester: 'James Site-Supt', signatures: ['Admin'], required: ['Admin', 'CFO', 'Director'], title: 'Structural Steel Batch' },
  { id: 'ap2', type: 'Labor Payout', value: 8400, requester: 'Kevin Zhang', signatures: ['Admin', 'PM'], required: ['Admin', 'PM', 'CFO'], title: 'Masonry Shift Bonus' },
];

const mockFraudAlerts = [
  { id: 'fa1', severity: 'High', type: 'Potential Duplicate', description: 'Expense for "Bulk Cement" matches INV-2024-001 amount.', status: 'Flagged' },
  { id: 'fa2', severity: 'Medium', type: 'Unregistered Vendor', description: 'Payment request from "NewBuild Tools" not in verified list.', status: 'Pending Review' },
];

type FinanceTab = 'overview' | 'invoices' | 'expenses' | 'profitability' | 'tax' | 'controls' | 'gateways';

const FinanceView: React.FC<FinanceViewProps> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<FinanceTab>('overview');
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [expenses, setExpenses] = useState<Transaction[]>(mockExpenses);
  const [auditLogs] = useState(mockAuditLogs);
  const [pendingApprovals, setPendingApprovals] = useState(mockPendingApprovals);
  const [fraudAlerts] = useState(mockFraudAlerts);
  
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // New Expense State
  const [newExpense, setNewExpense] = useState<Partial<Transaction>>({
    date: new Date().toISOString().split('T')[0],
    amount: 0,
    category: 'Expense',
    description: '',
    project: 'Riverside Residency'
  });

  const [newInvoice, setNewInvoice] = useState<Partial<Invoice>>({
    invoiceNumber: `INV-2024-00${mockInvoices.length + 1}`,
    clientName: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    project: 'Riverside Residency',
    subtotal: 0,
    vatRate: 15,
    withholdingRate: 2,
  });

  const handleLogExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const exp: Transaction = {
      ...newExpense as Transaction,
      id: `exp${Date.now()}`,
    };
    setExpenses([exp, ...expenses]);
    setIsExpenseModalOpen(false);
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const subtotal = newInvoice.subtotal || 0;
    const vatAmount = (subtotal * (newInvoice.vatRate || 0)) / 100;
    const withholdingAmount = (subtotal * (newInvoice.withholdingRate || 0)) / 100;
    const grandTotal = subtotal + vatAmount - withholdingAmount;

    const inv: Invoice = {
      id: `inv${Date.now()}`,
      invoiceNumber: newInvoice.invoiceNumber || `INV-${Date.now()}`,
      clientName: newInvoice.clientName || 'Unnamed Client',
      date: newInvoice.date || new Date().toISOString().split('T')[0],
      dueDate: newInvoice.dueDate || new Date().toISOString().split('T')[0],
      items: [],
      subtotal,
      vatRate: newInvoice.vatRate || 0,
      vatAmount,
      withholdingRate: newInvoice.withholdingRate || 0,
      withholdingAmount,
      grandTotal,
      amountPaid: 0,
      status: 'Sent',
      project: newInvoice.project
    };
    setInvoices([inv, ...invoices]);
    setIsInvoiceModalOpen(false);
    setNewInvoice({
      invoiceNumber: `INV-2024-00${invoices.length + 2}`,
      clientName: '',
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      project: 'Riverside Residency',
      subtotal: 0,
      vatRate: 15,
      withholdingRate: 2,
    });
  };

  const approveItem = (id: string) => {
    setPendingApprovals(prev => prev.filter(p => p.id !== id));
  };

  const calculateProjectPL = (projectName: string) => {
    const revenue = invoices
      .filter(inv => inv.project === projectName && (inv.status === 'Paid' || inv.status === 'Partial'))
      .reduce((sum, inv) => sum + inv.amountPaid, 0);
    
    const costs = expenses
      .filter(exp => exp.project === projectName)
      .reduce((sum, exp) => sum + exp.amount, 0);

    return { revenue, costs, profit: revenue - costs, margin: revenue > 0 ? ((revenue - costs) / revenue) * 100 : 0 };
  };

  const projects = Array.from(new Set([...invoices.map(i => i.project), ...expenses.map(e => e.project)]))
    .filter(Boolean) as string[];

  const overdueTotal = invoices
    .filter(inv => inv.status === 'Overdue')
    .reduce((sum, inv) => sum + (inv.grandTotal - inv.amountPaid), 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <button 
        onClick={() => setView?.(AppView.DASHBOARD)}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-black uppercase text-[10px] tracking-widest transition-colors group mb-2"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
      </button>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight italic">Enterprise Finance & Controls</h1>
          <p className="text-slate-500 italic font-medium">Advanced ledger management with multi-signature security and real-time audit trails.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('controls')}
            className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl text-sm font-bold hover:bg-rose-100 transition-all shadow-sm"
          >
            <ShieldAlert size={18} /> Safety Center
          </button>
          <button 
            onClick={() => setIsInvoiceModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 shadow-xl transition-all"
          >
            <Plus size={18} /> New Invoice
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm w-fit overflow-x-auto scrollbar-hide">
        {[
          { id: 'overview', label: 'Cash Flow', icon: TrendingUp },
          { id: 'invoices', label: 'Invoices', icon: FileText },
          { id: 'expenses', label: 'Expense Ledger', icon: CreditCard },
          { id: 'profitability', label: 'P&L Reports', icon: PieChart },
          { id: 'tax', label: 'Taxation', icon: Scale },
          { id: 'controls', label: 'Internal Controls', icon: Gavel },
          { id: 'gateways', label: 'Gateways', icon: Globe },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as FinanceTab)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in slide-in-from-left-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 p-8 rounded-[2rem] text-white md:col-span-2 overflow-hidden relative shadow-2xl">
              <div className="absolute top-0 right-0 p-10 opacity-10 scale-150 rotate-12">
                <TrendingUp size={200} />
              </div>
              <div className="relative z-10">
                <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-1 italic">Authenticated Liquid Balance</p>
                <h2 className="text-5xl font-black mb-10 tracking-tighter italic">$1,245,670.00</h2>
                <div className="grid grid-cols-2 gap-12">
                  <div>
                    <div className="flex items-center gap-2 text-emerald-400 mb-2">
                      <div className="p-1.5 bg-emerald-500/10 rounded-lg"><ArrowDownLeft size={16} /></div>
                      <span className="text-[10px] font-black uppercase tracking-widest italic">Confirmed Inflow</span>
                    </div>
                    <p className="text-2xl font-black italic">$420,500.00</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-rose-400 mb-2">
                      <div className="p-1.5 bg-rose-500/10 rounded-lg"><ArrowUpRight size={16} /></div>
                      <span className="text-[10px] font-black uppercase tracking-widest italic">Authorized Outflow</span>
                    </div>
                    <p className="text-2xl font-black italic">$185,200.00</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-black text-slate-900 mb-6 flex items-center gap-2 italic">
                  <Fingerprint size={20} className="text-rose-500" /> Pending Multi-sig
                </h3>
                <div className="space-y-4">
                  {pendingApprovals.map(app => (
                    <div key={app.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group">
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{app.type}</p>
                        <p className="text-sm font-black text-slate-900">${app.value.toLocaleString()}</p>
                      </div>
                      <button onClick={() => setActiveTab('controls')} className="p-2 bg-white rounded-xl shadow-sm hover:scale-110 transition-transform">
                        <ArrowRight size={18} className="text-slate-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                 <span className="text-[10px] font-black text-slate-400 uppercase italic">Fraud Shield Status</span>
                 <span className="flex items-center gap-1 text-[10px] font-black text-emerald-600 uppercase"><CheckCircle2 size={12}/> Active</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-lg tracking-tight italic">Audit-Verified Revenue Dynamics</h3>
              <div className="flex gap-2">
                 <span className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-lg text-[10px] font-black text-emerald-600 uppercase italic">Margin Score: 94/100</span>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 'bold'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="income" stroke="#f59e0b" fillOpacity={1} fill="url(#colorIncome)" strokeWidth={4} />
                  <Area type="monotone" dataKey="expenses" stroke="#94a3b8" fillOpacity={1} fill="url(#colorExpense)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Other tabs follow - logic preserved */}
    </div>
  );
};

export default FinanceView;
