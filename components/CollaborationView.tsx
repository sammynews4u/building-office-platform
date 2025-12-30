
import React, { useState } from 'react';
import { 
  Hash, 
  MessageSquare, 
  Users, 
  Bell, 
  Search, 
  Plus, 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical, 
  Circle, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Smartphone, 
  Mail, 
  Settings2,
  HardHat,
  Target,
  Workflow,
  Sparkles,
  FileText,
  X,
  ChevronRight,
  CalendarClock,
  History,
  ArrowLeft
} from 'lucide-react';
import { AppView } from '../types';

interface CollaborationViewProps {
  setView?: (view: AppView) => void;
}

interface Message {
  id: string;
  sender: string;
  senderRole: string;
  content: string;
  timestamp: string;
  avatar: string;
  isMe?: boolean;
  attachments?: string[];
}

const mockMessages: Message[] = [
  { id: '1', sender: 'James Supt.', senderRole: 'Foreman', content: 'Steel delivery for the Riverside site is arriving at 09:00 AM sharp. Please clear the primary hoist area.', timestamp: '08:15 AM', avatar: 'https://picsum.photos/seed/james/100/100' },
  { id: '2', sender: 'Sarah Jones', senderRole: 'Safety', content: 'Safety audit scheduled for Level 4 tomorrow. Ensure all fall protection gear is inspected.', timestamp: '10:30 AM', avatar: 'https://picsum.photos/seed/sarah/100/100' },
  { id: '3', sender: 'Alex Foreman', senderRole: 'Admin', content: 'Understood, James. I\'ll notify the crane operator now.', timestamp: '10:45 AM', avatar: 'https://picsum.photos/seed/user82/100/100', isMe: true },
  { id: '4', sender: 'Elena Struct', senderRole: 'Engineer', content: 'Revised column alignment drawings have been uploaded to the Documents portal. Ref: #DWG-822-R2.', timestamp: '11:15 AM', avatar: 'https://picsum.photos/seed/eng/100/100' },
];

const mockNotifications = [
  { id: 'n1', type: 'finance', title: 'Invoice Paid', desc: 'Urban-X Corp paid INV-2024-002', time: '10m ago', icon: CheckCircle2, color: 'text-emerald-500' },
  { id: 'ms-1', type: 'milestone', title: 'Upcoming Deadline', desc: 'Grand Oak: "Topping Out" is due in 3 days.', time: 'System Alert', icon: CalendarClock, color: 'text-amber-500' },
  { id: 'ms-2', type: 'milestone', title: 'Milestone Overdue', desc: 'Metro Hub: "Excavation" target missed by 5 days.', time: 'System Alert', icon: AlertCircle, color: 'text-rose-500' },
  { id: 'n2', type: 'project', title: 'New Site Issue', desc: 'Critical delay reported at Riverside Ph 2', time: '1h ago', icon: AlertCircle, color: 'text-rose-500' },
  { id: 'n3', type: 'hiring', title: 'Job Match', desc: 'New tender match for Infrastructure projects', time: '4h ago', icon: Sparkles, color: 'text-amber-500' },
  { id: 'n4', type: 'hr', title: 'Leave Approved', desc: 'David Miller\'s leave request approved', time: 'Yesterday', icon: Clock, color: 'text-blue-500' },
];

const CollaborationView: React.FC<CollaborationViewProps> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'notifications' | 'settings'>('chat');
  const [activeChannel, setActiveChannel] = useState('#riverside-site');
  const [message, setMessage] = useState('');

  const channels = [
    { name: '#general', type: 'department', icon: Hash },
    { name: '#riverside-site', type: 'project', icon: HardHat },
    { name: '#finance-team', type: 'department', icon: Target },
    { name: '#safety-compliance', type: 'department', icon: Workflow },
  ];

  const dms = [
    { name: 'James Supt.', status: 'online', avatar: 'https://picsum.photos/seed/james/100/100' },
    { name: 'Sarah Jones', status: 'away', avatar: 'https://picsum.photos/seed/sarah/100/100' },
    { name: 'Elena Struct', status: 'online', avatar: 'https://picsum.photos/seed/eng/100/100' },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      <button 
        onClick={() => setView?.(AppView.DASHBOARD)}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-black uppercase text-[10px] tracking-widest transition-colors group mb-3 w-fit"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
      </button>

      <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex animate-in fade-in duration-500 min-h-0">
        {/* Navigation Sidebar */}
        <div className="w-80 border-r border-slate-100 flex flex-col bg-slate-50/30 shrink-0">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
            <div className="flex bg-slate-100 p-1 rounded-xl">
               <button onClick={() => setActiveTab('chat')} className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'chat' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>Messages</button>
               <button onClick={() => setActiveTab('notifications')} className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'notifications' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>Alerts</button>
            </div>
            <button className="p-2 bg-slate-900 text-white rounded-xl shadow-lg hover:scale-105 transition-transform"><Plus size={18}/></button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-hide">
            {activeTab === 'chat' ? (
              <>
                <div className="space-y-2">
                  <p className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Project Channels</p>
                  {channels.map((ch) => (
                    <button
                      key={ch.name}
                      onClick={() => setActiveChannel(ch.name)}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-2xl transition-all group ${activeChannel === ch.name ? 'bg-amber-500 text-slate-900 shadow-xl shadow-amber-500/20' : 'hover:bg-white text-slate-500'}`}
                    >
                      <ch.icon size={18} className={activeChannel === ch.name ? 'text-slate-900' : 'text-slate-300'} />
                      <span className="text-sm font-bold truncate">{ch.name}</span>
                      {ch.name === '#riverside-site' && activeChannel !== ch.name && (
                         <span className="ml-auto w-2 h-2 rounded-full bg-rose-500"></span>
                      )}
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  <p className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Private Discussions</p>
                  {dms.map((dm) => (
                    <button
                      key={dm.name}
                      onClick={() => setActiveChannel(dm.name)}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-2xl transition-all ${activeChannel === dm.name ? 'bg-slate-900 text-white shadow-xl' : 'hover:bg-white text-slate-500'}`}
                    >
                      <div className="relative">
                         <img src={dm.avatar} className="w-8 h-8 rounded-xl border border-slate-200" alt=""/>
                         <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${dm.status === 'online' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                      </div>
                      <span className="text-sm font-bold">{dm.name}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : activeTab === 'notifications' ? (
              <div className="space-y-6">
                 <p className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Real-time Feed</p>
                 <div className="space-y-3">
                    {mockNotifications.map(n => (
                      <div key={n.id} className="p-4 bg-white border border-slate-100 rounded-3xl hover:border-amber-500 transition-all group cursor-pointer shadow-sm">
                         <div className="flex gap-4">
                            <div className={`p-2 rounded-xl bg-slate-50 ${n.color}`}><n.icon size={20}/></div>
                            <div className="flex-1 overflow-hidden">
                               <p className="text-sm font-black text-slate-900 leading-tight">{n.title}</p>
                               <p className="text-xs text-slate-500 mt-0.5 truncate">{n.desc}</p>
                               <p className="text-[9px] text-slate-400 font-bold uppercase mt-2">{n.time}</p>
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            ) : null}
          </div>

          <div className="p-4 border-t border-slate-100 bg-white">
             <button onClick={() => setActiveTab('settings')} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-500 hover:bg-slate-50 transition-all font-bold text-sm">
                <Settings2 size={18} /> Integration settings
             </button>
          </div>
        </div>

        {/* Main Chat Interface */}
        <div className="flex-1 flex flex-col bg-slate-50/20 relative min-w-0">
          {activeTab === 'settings' ? (
            <div className="flex-1 p-12 overflow-y-auto animate-in zoom-in-95 duration-500">
               <div className="max-w-2xl mx-auto space-y-12">
                  <div>
                     <h2 className="text-3xl font-black italic text-slate-900 tracking-tight mb-2">Collaboration Settings</h2>
                     <p className="text-slate-500">Configure how BuildOS communicates with your team outside the app.</p>
                  </div>

                  <div className="space-y-6">
                     <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                        <h3 className="font-black text-lg mb-8 flex items-center gap-2">
                           <Bell size={20} className="text-amber-500" /> Multi-channel Notifications
                        </h3>
                        <div className="space-y-6">
                           {[
                             { label: 'Email Integration', desc: 'Daily project digests and critical site reports.', icon: Mail, status: 'Enabled' },
                             { label: 'SMS Alerts', desc: 'Instant alerts for safety incidents and equipment delays.', icon: Smartphone, status: 'Enabled' },
                             { label: 'Desktop Push', desc: 'Real-time chat and document approval requests.', icon: Bell, status: 'Disabled' },
                             { label: 'Milestone Reminders', desc: 'Automated alerts for upcoming deadlines.', icon: CalendarClock, status: 'Enabled' },
                           ].map((s, i) => (
                             <div key={i} className="flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                   <div className="p-3 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform"><s.icon size={20}/></div>
                                   <div>
                                      <p className="text-sm font-black text-slate-900">{s.label}</p>
                                      <p className="text-xs text-slate-400 font-medium">{s.desc}</p>
                                   </div>
                                </div>
                                <button className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${s.status === 'Enabled' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600'}`}>
                                   {s.status}
                                </button>
                             </div>
                           ))}
                        </div>
                     </div>

                     <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5"><Sparkles size={150} /></div>
                        <h3 className="text-xl font-black text-amber-500 mb-4 italic">BuildOS AI Bridge</h3>
                        <p className="text-sm text-slate-400 leading-relaxed font-medium mb-8 italic">
                           "Gemini AI can automatically summarize channel discussions every 24h and send them to your email. This ensures you never miss a site decision."
                        </p>
                        <button className="w-full py-4 bg-white/10 hover:bg-white text-white hover:text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border border-white/20">
                           Configure AI Recaps
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="p-6 border-b border-slate-100 bg-white flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${activeChannel.startsWith('#') ? 'bg-amber-100 text-amber-700 shadow-sm shadow-amber-500/10' : 'bg-slate-100 text-slate-700'} transition-colors`}>
                     {activeChannel.startsWith('#') ? <Hash size={24} /> : <MessageSquare size={24} />}
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-slate-900 italic tracking-tight">{activeChannel}</h3>
                    <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest flex items-center gap-1">
                      <Circle size={8} fill="currentColor" /> 14 Online Members
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="relative group hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input type="text" placeholder="Find in transcript..." className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-xs font-bold w-48 outline-none focus:ring-2 focus:ring-amber-500 transition-all" />
                  </div>
                  <button className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors"><MoreVertical size={20}/></button>
                </div>
              </div>

              {/* Chat Content */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
                {mockMessages.map((msg) => (
                  <div key={msg.id} className={`flex gap-4 ${msg.isMe ? 'flex-row-reverse' : ''} group animate-in slide-in-from-bottom-2 duration-300`}>
                    <img src={msg.avatar} className="w-12 h-12 rounded-2xl object-cover shrink-0 shadow-lg border-2 border-white" alt=""/>
                    <div className={`max-w-xl space-y-2 ${msg.isMe ? 'items-end' : 'items-start'}`}>
                      <div className={`flex items-center gap-3 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                         <span className="text-sm font-black text-slate-900 italic">{msg.sender}</span>
                         <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">{msg.senderRole}</span>
                         <span className="text-[9px] text-slate-300 font-bold">{msg.timestamp}</span>
                      </div>
                      <div className={`p-5 rounded-[2rem] shadow-xl text-sm leading-relaxed font-medium border ${
                         msg.isMe 
                           ? 'bg-slate-900 text-white rounded-tr-none border-slate-800' 
                           : 'bg-white text-slate-700 rounded-tl-none border-slate-100'
                      }`}>
                        {msg.content}
                      </div>
                      {msg.attachments && (
                         <div className={`flex gap-2 mt-2 ${msg.isMe ? 'justify-end' : ''}`}>
                            {msg.attachments.map((at, i) => (
                               <div key={i} className="flex items-center gap-2 p-2 bg-white border border-slate-100 rounded-xl shadow-sm hover:border-amber-500 transition-all cursor-pointer">
                                  <FileText size={16} className="text-blue-500" />
                                  <span className="text-[10px] font-bold text-slate-600 truncate max-w-[100px]">{at}</span>
                               </div>
                            ))}
                         </div>
                      )}
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-4 py-8">
                   <div className="flex-1 h-px bg-slate-100"></div>
                   <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">New messages below</span>
                   <div className="flex-1 h-px bg-slate-100"></div>
                </div>
              </div>

              {/* Input Area */}
              <div className="p-8 bg-white border-t border-slate-100 sticky bottom-0 z-10 shadow-[0_-20px_40px_-10px_rgba(0,0,0,0.02)]">
                <div className="flex flex-col gap-4">
                   <div className="flex items-end gap-4 bg-slate-50 border border-slate-100 p-4 rounded-[2.5rem] focus-within:ring-4 focus-within:ring-amber-500/10 focus-within:border-amber-500 transition-all group">
                      <button className="p-3 hover:bg-white rounded-2xl text-slate-400 hover:text-amber-500 transition-all shadow-sm"><Paperclip size={20}/></button>
                      <textarea 
                         rows={1}
                         placeholder={`Message ${activeChannel}...`}
                         className="flex-1 bg-transparent border-none outline-none text-sm font-medium py-3 resize-none max-h-32 scrollbar-hide"
                         value={message}
                         onChange={(e) => setMessage(e.target.value)}
                      />
                      <div className="flex gap-2 pb-1">
                         <button className="p-2 hover:bg-white rounded-xl text-slate-400 transition-all"><Smile size={20}/></button>
                         <button 
                           className={`h-12 w-12 rounded-2xl flex items-center justify-center shadow-xl transition-all ${message.trim() ? 'bg-slate-900 text-white scale-110 active:scale-95' : 'bg-slate-200 text-slate-400'}`}
                           disabled={!message.trim()}
                         >
                            <Send size={22} className={message.trim() ? 'animate-in fade-in zoom-in-50 duration-300' : ''} />
                         </button>
                      </div>
                   </div>
                   <div className="flex justify-between items-center px-4">
                      <div className="flex gap-6">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Smartphone size={12} /> SMS Bridge: <span className="text-emerald-500">Active</span>
                         </p>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Mail size={12} /> Email Relay: <span className="text-emerald-500">Synced</span>
                         </p>
                      </div>
                      <button className="text-[10px] font-black text-blue-600 uppercase hover:underline flex items-center gap-1">
                         Summarize Discussion <Sparkles size={12} />
                      </button>
                   </div>
                </div>
              </div>
            </>
          )}

          <div className="absolute top-0 right-0 h-full w-80 bg-white border-l border-slate-100 translate-x-full transition-transform z-20">
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborationView;
