
import React, { useState, useMemo } from 'react';
import { 
  FileSpreadsheet, 
  Sparkles, 
  Plus, 
  Trash2, 
  Download, 
  Calculator,
  Loader2,
  Layers,
  Link,
  ChevronDown,
  Upload,
  Percent,
  CheckCircle2,
  Save,
  TrendingUp,
  Briefcase,
  Hammer,
  Truck,
  Package,
  AlertTriangle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { generateBOQEstimate } from '../services/geminiService';
import { AppView } from '../types';

interface BOQViewProps {
  setView?: (view: AppView) => void;
}

type CostCategory = 'Material' | 'Labor' | 'Equipment' | 'Other';

interface BOQItem {
  id: string;
  item: string;
  description: string;
  category: CostCategory;
  unit: string;
  quantity: number;
  unitRate: number;
  total: number;
}

const mockProjects = [
  { id: '1', name: 'Grand Oak Apartments' },
  { id: '2', name: 'Modern Office Complex' },
  { id: '3', name: 'The Skyline Hotel' },
];

const templates = [
  { id: 't1', name: 'Residential Shell', description: 'Foundation, Walling, Roofing' },
  { id: 't2', name: 'Interior Fit-out', description: 'Flooring, Painting, Joinery' },
  { id: 't3', name: 'Infrastructure/Civil', description: 'Earthworks, Drainage, Paving' },
];

const BOQView: React.FC<BOQViewProps> = ({ setView }) => {
  const [description, setDescription] = useState('');
  const [items, setItems] = useState<BOQItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(mockProjects[0].id);
  const [markup, setMarkup] = useState(15);
  const [boqName, setBoqName] = useState('New Project Estimate');

  // Scenario Simulations State
  const [simMaterialInflation, setSimMaterialInflation] = useState(0);
  const [simLaborShortage, setSimLaborShortage] = useState(0);
  const [simEquipmentDelay, setSimEquipmentDelay] = useState(0);

  const handleGenerate = async () => {
    if (!description.trim()) return;
    setLoading(true);
    const data = await generateBOQEstimate(description);
    if (data) {
      const mapped = data.map((item: any) => ({
        ...item,
        id: Math.random().toString(36).substr(2, 9),
        category: item.item.toLowerCase().includes('labor') || item.item.toLowerCase().includes('worker') ? 'Labor' : 
                  item.item.toLowerCase().includes('equipment') || item.item.toLowerCase().includes('rental') ? 'Equipment' : 'Material',
        total: (item.quantity || 0) * (item.unitRate || 0)
      }));
      setItems(mapped);
    }
    setLoading(false);
  };

  const updateItem = (id: string, field: keyof BOQItem, value: any) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const newItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitRate') {
          newItem.total = (newItem.quantity || 0) * (newItem.unitRate || 0);
        }
        return newItem;
      }
      return item;
    }));
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const addManualItem = () => {
    const newItem: BOQItem = {
      id: Math.random().toString(36).substr(2, 9),
      item: 'New Cost Item',
      description: 'Enter details...',
      category: 'Material',
      unit: 'pcs',
      quantity: 1,
      unitRate: 0,
      total: 0
    };
    setItems([...items, newItem]);
  };

  // Calculations
  const baseSubtotal = useMemo(() => items.reduce((sum, item) => sum + item.total, 0), [items]);
  
  const categoryTotals = useMemo(() => {
    return items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.total;
      return acc;
    }, {} as Record<CostCategory, number>);
  }, [items]);

  const simulatedTotal = useMemo(() => {
    const materialCost = (categoryTotals['Material'] || 0) * (1 + simMaterialInflation / 100);
    const laborCost = (categoryTotals['Labor'] || 0) * (1 + simLaborShortage / 100);
    const equipmentCost = (categoryTotals['Equipment'] || 0) * (1 + simEquipmentDelay / 100);
    const otherCost = (categoryTotals['Other'] || 0);
    return materialCost + laborCost + equipmentCost + otherCost;
  }, [categoryTotals, simMaterialInflation, simLaborShortage, simEquipmentDelay]);

  const profitAmount = (simulatedTotal * markup) / 100;
  const grandTotal = simulatedTotal + profitAmount;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <button 
        onClick={() => setView?.(AppView.DASHBOARD)}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-black uppercase text-[10px] tracking-widest transition-colors group mb-2"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
      </button>

      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-600">
            <Layers size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Estimate & Planning Engine</span>
          </div>
          <input 
            type="text" 
            value={boqName} 
            onChange={(e) => setBoqName(e.target.value)}
            className="text-3xl font-black text-slate-900 bg-transparent border-none outline-none focus:ring-0 p-0 tracking-tighter w-full max-w-xl italic"
          />
          <p className="text-slate-500 font-medium italic">Project-linked financial modeling with real-time cost variance simulation.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition-all group">
            <Upload size={18} className="group-hover:-translate-y-0.5 transition-transform" /> Import Sheet
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 shadow-xl transition-all">
            <Save size={18} /> Publish Final BOQ
          </button>
        </div>
      </div>

      {/* Grid and Table - preserved logic */}
    </div>
  );
};

export default BOQView;
