
import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Download, 
  ArrowLeft, 
  Sparkles, 
  Save, 
  Printer, 
  Send, 
  Building2, 
  User, 
  Calendar, 
  Hash, 
  Briefcase,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  History,
  Info,
  Construction,
  Loader2,
  Settings2,
  Percent,
  Zap,
  Droplets,
  Wind,
  Wrench,
  Layers,
  CircleDot,
  AlertCircle,
  Clock
} from 'lucide-react';
import { AppView, Invoice, InvoiceItem, InvoiceStatus } from '../types';
import { GoogleGenAI, Type } from "@google/genai";

interface InvoiceGeneratorViewProps {
  setView?: (view: AppView) => void;
}

const INVOICE_TEMPLATES = [
  {
    id: 'electrical',
    name: 'Electrical Pack',
    icon: Zap,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    items: [
      { description: 'Site Rough-in & Circuit Pulling', quantity: 1, rate: 2400 },
      { description: 'Panel Board Installation (200A)', quantity: 1, rate: 1850 },
      { description: 'Fixture Mounts & Grounding Tests', quantity: 12, rate: 85 },
      { description: 'Compliance Certification (Electrical)', quantity: 1, rate: 450 }
    ]
  },
  {
    id: 'plumbing',
    name: 'Plumbing Pack',
    icon: Droplets,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    items: [
      { description: 'Under-slab Pipework (PVC/PEX)', quantity: 1, rate: 3200 },
      { description: 'Main Valve & Meter Installation', quantity: 1, rate: 950 },
      { description: 'Drainage System Testing', quantity: 1, rate: 600 },
      { description: 'Fixture Hookups (Kitchen/Bath)', quantity: 4, rate: 220 }
    ]
  },
  {
    id: 'hvac',
    name: 'HVAC / Climate',
    icon: Wind,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
    items: [
      { description: 'Main Ducting Distribution Ph 1', quantity: 1, rate: 5800 },
      { description: 'Condenser Unit Mount (15-Ton)', quantity: 2, rate: 4200 },
      { description: 'Thermostat/Sensor Mesh Setup', quantity: 8, rate: 140 },
      { description: 'System Balancing & Airflow Audit', quantity: 1, rate: 850 }
    ]
  },
  {
    id: 'general',
    name: 'General Works',
    icon: Wrench,
    color: 'text-slate-500',
    bg: 'bg-slate-50',
    items: [
      { description: 'Site Mobilization & Safety Prep', quantity: 1, rate: 1200 },
      { description: 'Project Supervision (Weekly)', quantity: 4, rate: 1500 },
      { description: 'Structural Cleanup & Waste Removal', quantity: 1, rate: 850 }
    ]
  }
];

const STATUS_CONFIG: Record<InvoiceStatus, { label: string, color: string, bg: string, icon: any }> = {
  'Draft': { label: 'Draft', color: 'text-slate-500', bg: 'bg-slate-50', icon: FileText },
  'Sent': { label: 'Sent', color: 'text-blue-500', bg: 'bg-blue-50', icon: Send },
  'Paid': { label: 'Paid', color: 'text-emerald-500', bg: 'bg-emerald-50', icon: CheckCircle2 },
  'Partial': { label: 'Partial Payment', color: 'text-amber-500', bg: 'bg-amber-50', icon: CircleDot },
  'Overdue': { label: 'Overdue', color: 'text-rose-500', bg: 'bg-rose-50', icon: AlertCircle },
};

const InvoiceGeneratorView: React.FC<InvoiceGeneratorViewProps> = ({ setView }) => {
  const [invoice, setInvoice] = useState<Partial<Invoice>>({
    invoiceNumber: `INV-${new Date().getFullYear()}-042`,
    clientName: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    project: '',
    items: [],
    vatRate: 15,
    withholdingRate: 2,
    status: 'Draft'
  });

  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const subtotal = useMemo(() => 
    (invoice.items || []).reduce((sum, item) => sum + (item.quantity * item.rate), 0)
  , [invoice.items]);

  const vatAmount = (subtotal * (invoice.vatRate || 0)) / 100;
  const withholdingAmount = (subtotal * (invoice.withholdingRate || 0)) / 100;
  const grandTotal = subtotal + vatAmount - withholdingAmount;

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Math.random().toString(36).substr(2, 9),
      description: '',
      quantity: 1,
      rate: 0,
      total: 0
    };
    setInvoice(prev => ({ ...prev, items: [...(prev.items || []), newItem] }));
  };

  const applyTemplate = (templateId: string) => {
    const template = INVOICE_TEMPLATES.find(t => t.id === templateId);
    if (!template) return;

    const newItems: InvoiceItem[] = template.items.map(item => ({
      ...item,
      id: Math.random().toString(36).substr(2, 9),
      total: item.quantity * item.rate
    }));

    setInvoice(prev => ({ ...prev, items: newItems }));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setInvoice(prev => ({
      ...prev,
      items: (prev.items || []).map(item => 
        item.id === id ? { ...item, [field]: value, total: field === 'quantity' || field === 'rate' 
          ? (field === 'quantity' ? value : item.quantity) * (field === 'rate' ? value : item.rate)
          : item.total 
        } : item
      )
    }));
  };

  const removeItem = (id: string) => {
    setInvoice(prev => ({ ...prev, items: (prev.items || []).filter(item => item.id !== id) }));
  };

  const handleAiDraft = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate line items for a construction invoice based on this description: "${aiPrompt}". Return an array of objects with description, quantity, unit (string), and estimated rate.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                description: { type: Type.STRING },
                quantity: { type: Type.NUMBER },
                unit: { type: Type.STRING },
                rate: { type: Type.NUMBER }
              },
              required: ["description", "quantity", "rate"]
            }
          }
        }
      });
      
      const draftedItems = JSON.parse(response.text ?? '[]');
      const formattedItems: InvoiceItem[] = draftedItems.map((item: any) => ({
        id: Math.random().toString(36).substr(2, 9),
        description: `${item.description} (${item.unit || 'unit'})`,
        quantity: item.quantity,
        rate: item.rate,
        total: item.quantity * item.rate
      }));

      setInvoice(prev => ({ ...prev, items: [...(prev.items || []), ...formattedItems] }));
      setAiPrompt('');
    } catch (error) {
      console.error("AI Invoice Draft Error:", error);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert(`Invoice ${invoice.invoiceNumber} saved as ${invoice.status}`);
    }, 1000);
  };

  const activeStatus = STATUS_CONFIG[invoice.status as InvoiceStatus] || STATUS_CONFIG.Draft;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 max-w-6xl mx-auto">
      <button 
        onClick={() => setView?.(AppView.DASHBOARD)}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-black uppercase text-[10px] tracking-widest transition-colors group mb-2"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 italic tracking-tight">Invoice Builder Service</h1>
          <p className="text-slate-500 font-medium">Issue professional, project-linked tax invoices to your clients.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-black text-slate-700 hover:bg-slate-50 shadow-sm transition-all disabled:opacity-50">
            {isSaving ? <Loader2 size={18} className="animate-spin"/> : <Save size={18} />} Save Changes
          </button>
          <button 
            onClick={() => setInvoice({ ...invoice, status: 'Sent' })}
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-black hover:bg-slate-800 shadow-xl transition-all"
          >
            <Send size={18} className="text-amber-500" /> Dispatch to Client
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          {/* Main Invoice Document */}
          <div className="bg-white rounded-[2.5rem] border-4 border-slate-900 shadow-2xl overflow-hidden relative p-12">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Construction size={250} />
            </div>

            <div className="flex justify-between items-start mb-16 relative z-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-900 p-2 rounded-lg text-amber-500 shadow-lg"><Construction size={32}/></div>
                  <h2 className="text-3xl font-black italic tracking-tighter">BuildOS Enterprise</h2>
                </div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                   Industrial Sector 4, Site Alpha<br/>
                   Structural Road, CA 94103<br/>
                   T: +1 (555) 010-0982
                </div>
              </div>
              <div className="text-right space-y-4">
                <div className="flex flex-col items-end gap-1">
                  <h3 className="text-5xl font-black italic text-slate-900 uppercase tracking-tighter">Tax Invoice</h3>
                  <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border ${activeStatus.bg} ${activeStatus.color} shadow-sm`}>
                    <activeStatus.icon size={14} fill="currentColor" className="opacity-20" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{activeStatus.label}</span>
                  </div>
                </div>
                <p className="text-sm font-black text-amber-600 uppercase tracking-widest">Digital Service Instance</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 pb-12 border-b border-slate-100 relative z-10">
               <div className="space-y-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Bill To:</p>
                  <div className="space-y-2">
                     <input 
                       type="text" 
                       placeholder="Client Name / Entity" 
                       className="w-full text-lg font-black text-slate-900 placeholder:text-slate-200 border-b border-dashed border-slate-200 focus:border-amber-500 outline-none transition-all py-1 bg-transparent italic"
                       value={invoice.clientName}
                       onChange={e => setInvoice({...invoice, clientName: e.target.value})}
                     />
                     <textarea placeholder="Address Line" rows={2} className="w-full text-xs font-medium text-slate-500 placeholder:text-slate-200 bg-transparent border-none outline-none resize-none" />
                  </div>
               </div>
               <div className="space-y-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Project Link:</p>
                  <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                     <Briefcase size={14} className="text-slate-400" />
                     <input 
                       type="text" 
                       placeholder="Assign Site ID" 
                       className="bg-transparent border-none outline-none text-xs font-bold text-slate-700 w-full"
                       value={invoice.project}
                       onChange={e => setInvoice({...invoice, project: e.target.value})}
                     />
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest italic text-slate-400">
                    <span>Invoice Ref</span>
                    <span>{invoice.invoiceNumber}</span>
                  </div>
                  <div className="space-y-3">
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase italic">Date Issued:</span>
                        <input type="date" className="text-xs font-black text-slate-700 outline-none border-none bg-transparent p-0 text-right" value={invoice.date} onChange={e => setInvoice({...invoice, date: e.target.value})} />
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase italic">Date Due:</span>
                        <input type="date" className="text-xs font-black text-rose-600 outline-none border-none bg-transparent p-0 text-right underline decoration-rose-200" value={invoice.dueDate} onChange={e => setInvoice({...invoice, dueDate: e.target.value})} />
                     </div>
                  </div>
               </div>
            </div>

            <div className="mb-16 relative z-10">
               <table className="w-full text-left">
                  <thead>
                     <tr className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b-2 border-slate-900">
                        <th className="pb-4 w-12">#</th>
                        <th className="pb-4">Description of Works</th>
                        <th className="pb-4 text-center w-24">Qty</th>
                        <th className="pb-4 text-right w-32">Rate</th>
                        <th className="pb-4 text-right w-32">Amount</th>
                        <th className="pb-4 w-10"></th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {invoice.items?.map((item, idx) => (
                        <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                           <td className="py-6 text-xs font-black text-slate-300">{idx + 1}</td>
                           <td className="py-6">
                              <input 
                                type="text" 
                                placeholder="Service or Material description..."
                                className="w-full bg-transparent border-none outline-none font-bold text-slate-900 text-sm placeholder:text-slate-200 focus:placeholder:text-slate-300 italic"
                                value={item.description}
                                onChange={e => updateItem(item.id, 'description', e.target.value)}
                              />
                           </td>
                           <td className="py-6 text-center">
                              <input 
                                type="number" 
                                className="w-full bg-transparent border-none outline-none font-black text-slate-700 text-center"
                                value={item.quantity}
                                onChange={e => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                              />
                           </td>
                           <td className="py-6 text-right">
                              <div className="flex items-center justify-end gap-1">
                                 <span className="text-[10px] font-bold text-slate-300">$</span>
                                 <input 
                                   type="number" 
                                   className="bg-transparent border-none outline-none font-black text-slate-700 text-right w-24"
                                   value={item.rate}
                                   onChange={e => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                                 />
                              </div>
                           </td>
                           <td className="py-6 text-right font-black text-slate-900 italic">
                              ${item.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                           </td>
                           <td className="py-6 text-right">
                              <button onClick={() => removeItem(item.id)} className="p-2 text-rose-300 hover:text-rose-600 transition-colors opacity-0 group-hover:opacity-100">
                                 <Trash2 size={16}/>
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
               {(!invoice.items || invoice.items.length === 0) && (
                 <div className="py-20 text-center space-y-4">
                    <div className="flex justify-center"><FileText size={48} className="text-slate-100" /></div>
                    <p className="text-sm font-black text-slate-300 uppercase tracking-widest italic">No line items added. Start drafting above or pick a template.</p>
                 </div>
               )}
               <button 
                 onClick={addItem}
                 className="w-full mt-8 py-6 bg-slate-50 text-slate-400 border-2 border-dashed border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-amber-500 hover:text-amber-600 transition-all flex items-center justify-center gap-2"
               >
                  <Plus size={16} /> Insert New Billing Row
               </button>
            </div>

            <div className="flex justify-end relative z-10">
               <div className="w-96 space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase italic">
                     <span>Subtotal</span>
                     <span className="text-slate-900 font-black">${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase italic">
                     <div className="flex items-center gap-2">
                        <span>VAT (Tax)</span>
                        <div className="flex items-center bg-amber-50 border border-amber-100 rounded-lg px-2 py-0.5">
                           <input 
                             type="number" 
                             className="w-10 bg-transparent text-amber-700 text-right outline-none font-black text-xs" 
                             value={invoice.vatRate} 
                             onChange={e => setInvoice({...invoice, vatRate: parseFloat(e.target.value) || 0})} 
                           />
                           <span className="text-[10px] text-amber-400 ml-1">%</span>
                        </div>
                     </div>
                     <span className="text-slate-900 font-black">${vatAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase italic">
                     <div className="flex items-center gap-2">
                        <span>Retention / Withholding</span>
                        <div className="flex items-center bg-rose-50 border border-rose-100 rounded-lg px-2 py-0.5">
                           <input 
                             type="number" 
                             className="w-10 bg-transparent text-rose-700 text-right outline-none font-black text-xs" 
                             value={invoice.withholdingRate} 
                             onChange={e => setInvoice({...invoice, withholdingRate: parseFloat(e.target.value) || 0})} 
                           />
                           <span className="text-[10px] text-rose-300 ml-1">%</span>
                        </div>
                     </div>
                     <span className="text-rose-600 font-black">-${withholdingAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>

                  <div className="h-0.5 bg-slate-900 my-4"></div>
                  <div className="flex justify-between items-center">
                     <span className="text-xl font-black italic text-slate-400 uppercase tracking-tighter">Amount Due</span>
                     <span className="text-5xl font-black italic tracking-tighter text-slate-900">${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
               </div>
            </div>

            <div className="mt-20 pt-10 border-t border-slate-100 flex items-end justify-between opacity-50 relative z-10">
               <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest italic">Electronic Bank Settlement:</p>
                  <div className="text-[9px] font-mono text-slate-400 leading-relaxed uppercase">
                     Bank Name: BuildGlobal Trust<br/>
                     IBAN: GB92 BOS 4422 9982 01<br/>
                     Swift/BIC: BUILDSYSX
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <ShieldCheck size={40} className="text-slate-200" />
                  <div className="text-right">
                     <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest">BuildOS Verified Invoice</p>
                     <p className="text-[8px] font-mono text-slate-300">ID: BOS_CERT_9422_ALPHA</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Status Management Card */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
                <CircleDot size={100} />
             </div>
             <h4 className="font-black text-slate-900 italic mb-6 flex items-center gap-2">
                <CircleDot size={18} className="text-slate-900" /> Lifecycle Status
             </h4>
             <div className="space-y-3 relative z-10">
                {(Object.keys(STATUS_CONFIG) as InvoiceStatus[]).map((status) => {
                   const config = STATUS_CONFIG[status];
                   const isActive = invoice.status === status;
                   return (
                      <button
                         key={status}
                         onClick={() => setInvoice({ ...invoice, status })}
                         className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all group/status ${isActive ? 'bg-slate-900 border-slate-900 shadow-lg translate-x-1' : 'bg-slate-50 border-transparent hover:border-slate-200'}`}
                      >
                         <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${isActive ? 'bg-white/10 text-white' : config.bg + ' ' + config.color}`}>
                               <config.icon size={16} />
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-white' : 'text-slate-500'}`}>{config.label}</span>
                         </div>
                         {isActive && <CheckCircle2 size={14} className="text-emerald-400" />}
                      </button>
                   );
                })}
             </div>
          </div>

          {/* Template Selection Card */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
                <Layers size={100} />
             </div>
             <h4 className="font-black text-slate-900 italic mb-6 flex items-center gap-2">
                <Layers size={18} className="text-blue-500" /> Service Templates
             </h4>
             <div className="grid grid-cols-2 gap-3 relative z-10">
                {INVOICE_TEMPLATES.map((template) => (
                   <button 
                     key={template.id}
                     onClick={() => applyTemplate(template.id)}
                     className={`p-4 rounded-2xl border-2 transition-all text-center flex flex-col items-center justify-center gap-2 group/btn ${template.bg} border-transparent hover:border-slate-900 active:scale-95`}
                   >
                      <div className={`p-3 rounded-xl bg-white shadow-sm ${template.color} group-hover/btn:scale-110 transition-transform`}>
                         <template.icon size={20} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-tight text-slate-700 leading-none">{template.name}</span>
                   </button>
                ))}
             </div>
             <p className="mt-4 text-[9px] text-slate-400 font-bold italic text-center">Selecting a template replaces current items.</p>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group border border-white/5">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-1000">
              <Sparkles size={120} />
            </div>
            <div className="relative z-10">
               <div className="flex items-center gap-2 mb-6 text-amber-500">
                  <Sparkles size={20} />
                  <span className="font-black text-[10px] tracking-[0.2em] uppercase">Gemini Billing AI</span>
               </div>
               <h4 className="text-xl font-black italic mb-4 leading-tight">Draft Items via AI</h4>
               <p className="text-xs text-slate-400 font-medium italic mb-6 leading-relaxed">
                  "Describe the work performed. Gemini will break it down into professional line items."
               </p>
               <textarea 
                 rows={4}
                 placeholder="e.g. Completed foundation pour for Grid A-D. Used 14 workers for 8 hours..."
                 className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-medium italic text-slate-200 outline-none focus:ring-2 focus:ring-amber-500 transition-all mb-4 placeholder:text-white/20"
                 value={aiPrompt}
                 onChange={e => setAiPrompt(e.target.value)}
               />
               <button 
                 onClick={handleAiDraft}
                 disabled={isAiLoading || !aiPrompt.trim()}
                 className="w-full py-4 bg-amber-500 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-amber-400 transition-all flex items-center justify-center gap-2 disabled:opacity-30 shadow-xl shadow-amber-500/20"
               >
                  {isAiLoading ? <Loader2 size={16} className="animate-spin" /> : <ChevronRight size={16}/>} Build Smart Draft
               </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
                <Settings2 size={100} />
             </div>
             <h4 className="font-black text-slate-900 italic mb-4 flex items-center gap-2">
                <Percent size={18} className="text-amber-500" /> Tax Settings
             </h4>
             <div className="space-y-4 relative z-10">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Current Locale</p>
                   <p className="text-sm font-bold text-slate-900 italic">California State / US</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100 text-center">
                      <p className="text-[9px] font-black text-amber-600 uppercase">Standard VAT</p>
                      <button onClick={() => setInvoice({...invoice, vatRate: 15})} className="text-xl font-black text-amber-700">15%</button>
                   </div>
                   <div className="p-3 bg-rose-50 rounded-2xl border border-rose-100 text-center">
                      <p className="text-[9px] font-black text-rose-600 uppercase">Retention</p>
                      <button onClick={() => setInvoice({...invoice, withholdingRate: 5})} className="text-xl font-black text-rose-700">5%</button>
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
             <h4 className="font-black text-slate-900 italic mb-6">Service Controls</h4>
             <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all group">
                   <div className="flex items-center gap-3">
                      <Download size={18} className="text-slate-400" />
                      <span className="text-xs font-bold text-slate-600">Export as PDF</span>
                   </div>
                   <ChevronRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-all" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all group">
                   <div className="flex items-center gap-3">
                      <Printer size={18} className="text-slate-400" />
                      <span className="text-xs font-bold text-slate-600">Print Copy</span>
                   </div>
                   <ChevronRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-all" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all group">
                   <div className="flex items-center gap-3">
                      <History size={18} className="text-slate-400" />
                      <span className="text-xs font-bold text-slate-600">Revision History</span>
                   </div>
                   <ChevronRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-all" />
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGeneratorView;
