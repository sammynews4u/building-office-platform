
import React, { useState } from 'react';
import { 
  Filter, 
  Search, 
  ShoppingCart, 
  Star, 
  MapPin, 
  Truck, 
  Wrench, 
  Package,
  Calendar,
  Box,
  ClipboardList,
  Plus,
  ArrowRight,
  ArrowLeft,
  Info,
  CalendarDays,
  Clock,
  ChevronDown,
  TrendingUp,
  Sparkles,
  Zap,
  Target,
  Crown,
  CheckCircle2,
  FileText,
  MessageSquare
} from 'lucide-react';
import { AppView } from '../types';

interface MarketplaceViewProps {
  setView?: (view: AppView) => void;
}

type MarketplaceSection = 'browse' | 'inventory' | 'orders';

const mockItems = [
  { id: 1, title: 'Tower Crane - 50m Jib', category: 'Equipment', subCategory: 'Cranes', unit: 'day', rating: 4.9, image: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=400', provider: 'SkyLift Equipment', stock: 2, type: 'Rental', bulkPricing: false, isFeatured: true },
  { id: 2, title: 'TMT Steel Bars - Fe 550D', category: 'Material', subCategory: 'Steel', unit: 'ton', rating: 4.5, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400', provider: 'Indus Steel Works', stock: 500, type: 'Sale', bulkPricing: true, isSponsored: true },
  { id: 3, title: 'Modular Scaffolding System', category: 'Equipment', subCategory: 'Scaffolding', unit: 'sqm/day', rating: 4.8, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=400', provider: 'SafeStep Rentals', stock: 1200, type: 'Rental', bulkPricing: true },
  { id: 4, title: 'High-Strength Portland Cement (Type V)', category: 'Material', subCategory: 'Cement', unit: 'bag', rating: 4.7, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400', provider: 'Summit Concrete', stock: 2500, type: 'Sale', bulkPricing: true },
  { id: 5, title: 'Diesel Concrete Mixer 400L', category: 'Equipment', subCategory: 'Mixers', unit: 'day', rating: 4.6, image: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=400', provider: 'BuildHard Machineries', stock: 8, type: 'Rental', bulkPricing: false },
  { id: 6, title: 'Rare Grade Aluminum Composite', category: 'Material', subCategory: 'Facade', unit: 'sheet', rating: 5.0, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=400', provider: 'Elite Surfaces', stock: 150, type: 'Sale', bulkPricing: false },
];

const MarketplaceView: React.FC<MarketplaceViewProps> = ({ setView }) => {
  const [activeSection, setActiveSection] = useState<MarketplaceSection>('browse');
  const [filter, setFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <button 
        onClick={() => setView?.(AppView.DASHBOARD)}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-black uppercase text-[10px] tracking-widest transition-colors group mb-2"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
      </button>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 italic tracking-tight">Procurement Marketplace</h1>
          <p className="text-slate-500 font-medium">Source materials and equipment. Submit request for quotes to verified suppliers.</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm w-fit">
          <button
            onClick={() => setActiveSection('browse')}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${activeSection === 'browse' ? 'bg-amber-500 text-slate-900 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Search size={16} /> Browse
          </button>
          <button
            onClick={() => setActiveSection('inventory')}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${activeSection === 'inventory' ? 'bg-amber-500 text-slate-900 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Box size={16} /> My Inventory
          </button>
          <button
            onClick={() => setActiveSection('orders')}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${activeSection === 'orders' ? 'bg-amber-500 text-slate-900 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <ClipboardList size={16} /> Quotes
          </button>
        </div>
      </div>

      {activeSection === 'browse' && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search for 'Tower Crane', 'TMT Steel', 'Scaffolding'..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none shadow-sm"
              />
            </div>
            <div className="flex gap-2">
              <select 
                className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-black focus:ring-2 focus:ring-amber-500 outline-none shadow-sm cursor-pointer"
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
              >
                <option value="All">All Categories</option>
                <option value="Equipment">Equipment (Rent)</option>
                <option value="Material">Materials (Buy)</option>
              </select>
              <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 shadow-sm">
                <Filter size={20} />
              </button>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center gap-10 shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-1000"><Zap size={200}/></div>
             <div className="flex-1 space-y-4 relative z-10">
                <div className="flex items-center gap-2 text-amber-500">
                   <Target size={20} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Sponsored Sourcing</span>
                </div>
                <h2 className="text-3xl font-black italic tracking-tighter">Premium Grade Structural Steel Batch</h2>
                <p className="text-sm text-slate-400 font-medium italic">"Bulk availability for major infrastructure projects. Submit your BOQ for high-volume discount matching."</p>
                <div className="flex gap-4">
                   <button className="px-6 py-2 bg-amber-500 text-slate-900 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-amber-400 transition-all">Request Price</button>
                   <p className="text-xs text-slate-500 font-bold self-center">by Indus Steel Works</p>
                </div>
             </div>
             <div className="w-full md:w-80 h-40 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center relative z-10">
                <Package size={40} className="text-white/20" />
                <span className="absolute bottom-4 right-4 text-[8px] font-black uppercase text-white/40 tracking-widest">ADVERTISEMENT</span>
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockItems
              .filter(item => filter === 'All' || item.category === filter)
              .map((item) => (
              <div 
                key={item.id} 
                className={`bg-white rounded-[2.5rem] border overflow-hidden hover:shadow-2xl transition-all group flex flex-col cursor-pointer ${item.isFeatured ? 'border-amber-500 ring-4 ring-amber-500/5' : 'border-slate-200'}`}
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {item.isFeatured && (
                       <span className="px-3 py-1 bg-amber-500 text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg flex items-center gap-1">
                          <Crown size={10} fill="currentColor" /> Featured
                       </span>
                    )}
                    {item.isSponsored && (
                       <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                          Promoted
                       </span>
                    )}
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md backdrop-blur-md ${item.type === 'Rental' ? 'bg-blue-600/90 text-white' : 'bg-emerald-600/90 text-white'}`}>
                      {item.type}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <button className="p-3 bg-white/90 backdrop-blur rounded-2xl text-slate-900 shadow-xl hover:bg-amber-500 transition-colors">
                      <MessageSquare size={18} />
                    </button>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-black text-xl text-slate-900 group-hover:text-amber-600 transition-colors leading-tight italic tracking-tight">{item.title}</h3>
                    <div className="flex items-center gap-1 text-amber-500 shrink-0">
                      <Star size={16} fill="currentColor" />
                      <span className="text-sm font-black">{item.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-8 mt-2">
                    <div className="flex items-center gap-1 font-bold">
                      <Wrench size={14} className="text-slate-400" /> 
                      <span className="truncate max-w-[120px]">{item.provider}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400 font-bold uppercase tracking-tighter">
                      <Package size={14} /> {item.stock} Units
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Procurement</p>
                      <p className="text-xl font-black text-slate-900 tracking-tighter italic">Quote on Request</p>
                    </div>
                    {item.bulkPricing && (
                      <div className="bg-amber-50 text-amber-700 text-[10px] font-black px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-sm border border-amber-100">
                        <TrendingUp size={14} /> Volume Match
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'inventory' && (
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
          <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
            <div>
              <h2 className="text-2xl font-black text-slate-900 italic tracking-tight">Company Inventory</h2>
              <p className="text-sm text-slate-500 font-medium">Manage assets your company owns or is currently listing for rent/sale on BuildOS.</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-4 bg-slate-900 text-white rounded-2xl text-sm font-black hover:bg-slate-800 shadow-xl transition-all">
              <Plus size={18} /> List Asset
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-100">
                  <th className="px-10 py-5">Asset Details</th>
                  <th className="px-10 py-5">Category</th>
                  <th className="px-10 py-5">Stock / Units</th>
                  <th className="px-10 py-5">Status</th>
                  <th className="px-10 py-5">Marketplace Opt.</th>
                  <th className="px-10 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { name: 'Excavator Model X-2', cat: 'Heavy Machinery', stock: 1, status: 'On Site #R-8', rev: '$12,400', color: 'bg-blue-100 text-blue-700', boosted: true },
                  { name: 'Portable Generator 50KW', cat: 'Electrical', stock: 3, status: 'Idle', rev: '$2,100', color: 'bg-slate-100 text-slate-700', boosted: false },
                  { name: 'Steel Shuttering Plates', cat: 'Formwork', stock: 450, status: 'Available', rev: '$8,900', color: 'bg-emerald-100 text-emerald-700', boosted: false },
                ].map((asset, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-all cursor-pointer group">
                    <td className="px-10 py-8">
                      <p className="font-black text-slate-900 text-lg italic">{asset.name}</p>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">SKU: INV-{100 + i}</p>
                    </td>
                    <td className="px-10 py-8 text-sm font-black text-slate-600 uppercase tracking-widest">{asset.cat}</td>
                    <td className="px-10 py-8 text-lg font-black text-slate-900">{asset.stock}</td>
                    <td className="px-10 py-8">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${asset.color}`}>
                        {asset.status}
                      </span>
                    </td>
                    <td className="px-10 py-8">
                       {asset.boosted ? (
                          <span className="flex items-center gap-2 text-[10px] font-black text-amber-500 uppercase">
                             <Crown size={12} fill="currentColor"/> Featured Active
                          </span>
                       ) : (
                          <button className="text-[10px] font-black text-blue-600 uppercase hover:underline">Boost Listing</button>
                       )}
                    </td>
                    <td className="px-10 py-8 text-right">
                      <button className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm">
                         <ChevronDown size={18} className="text-slate-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Item Details Overlay (Modal) */}
      {selectedItem && (
        <div className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl relative animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-8 right-8 p-3 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors z-10 shadow-sm"
            >
              <Plus size={24} className="rotate-45" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              <div className="p-10 lg:p-16 space-y-10">
                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 h-96 relative group">
                  <img src={selectedItem.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={selectedItem.title} />
                  {selectedItem.isFeatured && (
                    <div className="absolute top-6 left-6 px-4 py-2 bg-amber-500 text-slate-900 text-xs font-black uppercase tracking-widest rounded-xl shadow-2xl">
                       Featured Asset
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl">
                      {selectedItem.category}
                    </span>
                    <span className="px-4 py-1.5 bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest rounded-xl">
                      {selectedItem.subCategory}
                    </span>
                  </div>
                  <h2 className="text-4xl font-black text-slate-900 mb-3 italic tracking-tighter leading-none">{selectedItem.title}</h2>
                  <div className="flex items-center gap-6 text-slate-500 mb-10">
                    <div className="flex items-center gap-1 font-black text-lg text-amber-500 italic">
                      <Star size={20} className="fill-current" />
                      {selectedItem.rating}
                    </div>
                    <div className="h-6 w-px bg-slate-200"></div>
                    <div className="flex items-center gap-2 text-sm font-bold italic">
                      <MapPin size={18} className="text-slate-400" /> By {selectedItem.provider}
                    </div>
                  </div>
                  <p className="text-slate-500 leading-relaxed text-sm font-medium italic">
                    "This high-performance {selectedItem.title.toLowerCase()} is optimized for demanding worksites. Guaranteed industrial standards and verified maintenance history available on the blockchain ledger."
                  </p>
                </div>

                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><Truck size={100}/></div>
                  <h4 className="font-black text-slate-900 mb-6 flex items-center gap-2 italic">
                    <Truck size={22} className="text-amber-500" /> Logistics Intelligence
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                      <span className="text-slate-400">Next Available Window</span>
                      <span className="text-slate-900 font-black">24h - Tomorrow</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                      <span className="text-slate-400">Shipping Network</span>
                      <span className="text-slate-900 font-black">Global-X Priority</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                      <span className="text-slate-400">BuildOS Fee Contribution</span>
                      <span className="text-emerald-600 font-black">1.5% Managed</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50/50 p-10 lg:p-16 lg:border-l border-slate-100 flex flex-col justify-between">
                <div className="space-y-10">
                  <div className="mb-10">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 italic">Valuation Status</p>
                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter italic">
                      Request Quotation
                    </h3>
                    <p className="text-sm text-slate-500 font-medium italic mt-2">Pricing is dynamic based on project location and volume requirements.</p>
                    <p className="text-[10px] font-black text-emerald-600 uppercase mt-4 flex items-center gap-2">
                       <CheckCircle2 size={12}/> Escrow Protection Active for this Asset
                    </p>
                  </div>

                  {selectedItem.type === 'Rental' ? (
                    <div className="space-y-8">
                      <div>
                        <h4 className="font-black text-slate-900 mb-6 flex items-center gap-2 italic">
                          <CalendarDays size={20} className="text-blue-500" /> Availability Sync
                        </h4>
                        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/20">
                          <div className="grid grid-cols-7 gap-3 mb-6">
                            {['S','M','T','W','T','F','S'].map(d => <div key={d} className="text-[10px] font-black text-slate-300 text-center">{d}</div>)}
                            {Array.from({length: 31}).map((_, i) => (
                              <div key={i} className={`h-10 w-full flex items-center justify-center text-xs font-black rounded-xl transition-all ${i < 12 ? 'bg-rose-50 text-rose-300 cursor-not-allowed' : i < 18 ? 'bg-amber-100 text-amber-700 shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-600 cursor-pointer shadow-sm'}`}>
                                {i + 1}
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-6">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-rose-300"></div>
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Booked</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Available</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8">
                       {selectedItem.bulkPricing && (
                         <div>
                            <h4 className="font-black text-slate-900 mb-6 flex items-center gap-2 italic">
                              <Package size={20} className="text-emerald-500" /> High-Volume Discounts
                            </h4>
                            <div className="space-y-3">
                              {[
                                { qty: '1 - 10', tier: 'Standard Rate' },
                                { qty: '11 - 50', tier: 'Preferred Rate' },
                                { qty: '50+', tier: 'Enterprise Rate' },
                              ].map((tier, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg transition-all group">
                                  <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900">{tier.qty} {selectedItem.unit}s</span>
                                  <span className="text-sm font-black text-slate-900 group-hover:text-emerald-600">{tier.tier}</span>
                                </div>
                              ))}
                            </div>
                         </div>
                       )}
                    </div>
                  )}

                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-4">Required Quantity</label>
                    <div className="flex items-center gap-6 bg-white p-3 border border-slate-200 rounded-[2rem] shadow-xl">
                      <button className="h-12 w-12 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-600 hover:bg-slate-200 transition-colors">-</button>
                      <input type="number" defaultValue={1} className="flex-1 text-center font-black text-2xl bg-transparent outline-none italic" />
                      <button className="h-12 w-12 bg-slate-900 rounded-2xl flex items-center justify-center font-black text-white hover:bg-slate-800 transition-colors shadow-lg">+</button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-10">
                  <button className="w-full py-5 bg-amber-500 text-slate-900 rounded-[2rem] font-black text-xl italic hover:bg-amber-600 shadow-2xl shadow-amber-500/30 transition-all flex items-center justify-center gap-4 active:scale-95">
                    <FileText size={24} /> Request Official Quote
                  </button>
                  <button className="w-full py-5 bg-white text-slate-900 border-2 border-slate-200 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                    <MessageSquare size={18} /> Message Supplier
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketplaceView;
