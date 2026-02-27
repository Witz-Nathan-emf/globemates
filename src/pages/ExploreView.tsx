
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, X, MapPin, HandMetal, Users, Calendar, Clock, Trophy, Share2, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, UserProfile, ActivityStatus } from '../types';
import { InteractiveMap } from '../components/InteractiveMap';
import { Badge } from '../components/Badge';

export const ExploreView: React.FC<{ 
  activities: Activity[], 
  users: UserProfile[],
  currentUser: UserProfile, 
  onMessage: (targetId: string, text?: string) => void,
  onJoin: (id: string) => void,
  onCreateActivity: (activity: any) => void
}> = ({ activities, users, currentUser, onMessage, onJoin, onCreateActivity }) => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();

  const organizer = selectedActivity ? users.find(u => u.id === selectedActivity.creatorId) : null;

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-light-bg transition-all duration-500">
      <div className="flex-1 relative">
        <InteractiveMap activities={activities} currentUser={currentUser} onSelectActivity={setSelectedActivity} />
        
        {/* Create Activity Button */}
        <button 
          onClick={() => setShowCreateModal(true)}
          className="absolute top-10 right-10 z-30 p-5 premium-button rounded-3xl shadow-[0_10px_30px_rgba(58,79,255,0.3)] transition-all active:scale-95"
        >
          <UserPlus size={24} />
        </button>

        <AnimatePresence>
          {selectedActivity && (
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-0 sm:p-6"
            >
              <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedActivity(null)} />
              
              <div className="bg-white w-full max-w-2xl h-[90vh] sm:h-auto sm:max-h-[85vh] rounded-t-[40px] sm:rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col z-10">
                {/* Header Visuel */}
                <div className="relative h-64 sm:h-80 shrink-0">
                  <img 
                    src={`https://picsum.photos/seed/${selectedActivity.id}/1200/800`} 
                    className="w-full h-full object-cover" 
                    alt={selectedActivity.title} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                  
                  <button 
                    onClick={() => setSelectedActivity(null)} 
                    className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30 transition-all active:scale-90 hover:bg-white/40"
                  >
                    <X size={20} />
                  </button>

                  <div className="absolute bottom-6 left-8 right-8">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge color="blue">{selectedActivity.type}</Badge>
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black text-[#3A4FFF] uppercase tracking-widest shadow-sm">
                        {selectedActivity.status}
                      </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight tracking-tight uppercase">{selectedActivity.title}</h2>
                    <div className="flex items-center gap-4 mt-2">
                      <p className="text-sm font-bold text-slate-500 flex items-center gap-1.5"><MapPin size={16} className="text-[#3A4FFF]" /> {selectedActivity.locationName}</p>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                      <p className="text-sm font-bold text-slate-500">1.2 km</p>
                    </div>
                  </div>
                </div>

                {/* Content Scrollable */}
                <div className="flex-1 overflow-y-auto px-8 py-10 no-scrollbar">
                  {/* Section Infos Clés */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
                    <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 flex flex-col gap-2">
                      <Users size={20} className="text-[#3A4FFF]" />
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Participants</p>
                        <p className="text-sm font-black text-slate-900">{selectedActivity.participants.length} / {selectedActivity.maxParticipants}</p>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 flex flex-col gap-2">
                      <Calendar size={20} className="text-[#7B5CFF]" />
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Date</p>
                        <p className="text-sm font-black text-slate-900">{new Date(selectedActivity.dateTime).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 flex flex-col gap-2">
                      <Clock size={20} className="text-amber-500" />
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Heure</p>
                        <p className="text-sm font-black text-slate-900">{new Date(selectedActivity.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 flex flex-col gap-2">
                      <Clock size={20} className="text-emerald-500" />
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Durée</p>
                        <p className="text-sm font-black text-slate-900">2h 30m</p>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 flex flex-col gap-2">
                      <Trophy size={20} className="text-indigo-500" />
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Niveau</p>
                        <p className="text-sm font-black text-slate-900">Tous niveaux</p>
                      </div>
                    </div>
                    {organizer && (
                      <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 flex flex-col gap-2">
                        <img src={`https://picsum.photos/seed/${organizer.id}/100`} className="w-6 h-6 rounded-full object-cover" />
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Organisateur</p>
                          <p className="text-sm font-black text-slate-900">{organizer.name}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Section Description */}
                  <section className="mb-10">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-300 mb-4">Description</h3>
                    <p className="text-base font-bold text-slate-500 leading-relaxed">
                      {selectedActivity.description || "Rejoignez-nous pour cette superbe activité ! Un moment de partage et de découverte vous attend avec la communauté Globe Mates."}
                    </p>
                  </section>

                  {/* Section Participants */}
                  <section className="mb-10">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-300">Participants</h3>
                      <button className="text-[10px] font-black text-[#3A4FFF] uppercase tracking-widest">Voir tous</button>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {selectedActivity.participants.map(pid => {
                        const p = users.find(u => u.id === pid);
                        return (
                          <div key={pid} className="flex items-center gap-3 bg-white p-2 pr-4 rounded-2xl border border-slate-100 shadow-sm">
                            <img src={`https://picsum.photos/seed/${pid}/100`} className="w-10 h-10 rounded-full object-cover" />
                            <div>
                              <p className="text-xs font-black text-slate-900">{p?.name || 'Mate'}</p>
                              <div className="flex items-center gap-1">
                                <Trophy size={10} className="text-amber-400 fill-amber-400" />
                                <span className="text-[9px] font-black text-slate-400">{p?.rating.toFixed(1) || '4.5'}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                </div>

                {/* Section Actions */}
                <div className="p-8 bg-white border-t border-slate-100 flex flex-col gap-4 shrink-0">
                  <div className="flex gap-4">
                    <button 
                      onClick={() => onJoin(selectedActivity.id)} 
                      disabled={selectedActivity.status !== ActivityStatus.OPEN || selectedActivity.participants.includes(currentUser.id)}
                      className="flex-1 py-5 premium-button rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-xl disabled:opacity-50"
                    >
                      {selectedActivity.participants.includes(currentUser.id) ? "Déjà inscrit" : "Rejoindre l'activité"}
                    </button>
                    <button 
                      onClick={() => { onMessage(selectedActivity.creatorId); navigate('/chats'); }} 
                      className="p-5 bg-slate-50 text-[#3A4FFF] rounded-[24px] border border-slate-100 transition-all active:scale-95 shadow-sm"
                    >
                      <HandMetal size={24} />
                    </button>
                  </div>
                  <div className="flex justify-between items-center px-2">
                    <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">
                      <Share2 size={14} /> Partager
                    </button>
                    <button className="flex items-center gap-2 text-[10px] font-black text-red-300 uppercase tracking-widest hover:text-red-500 transition-colors">
                      <ShieldAlert size={14} /> Signaler
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Create Activity Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white w-full max-w-md rounded-[40px] p-10 shadow-2xl relative overflow-hidden border border-slate-100"
              >
                <button onClick={() => setShowCreateModal(false)} className="absolute top-8 right-8 p-2 bg-slate-50 rounded-full text-slate-400 transition-all active:scale-90"><X size={20} /></button>
                <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tight">Créer une activité</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 mb-2 block">Titre</label>
                    <input type="text" placeholder="Ex: Picnic au Canal" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold text-sm placeholder:text-slate-300 transition-all focus:border-[#3A4FFF]/30" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 mb-2 block">Type</label>
                      <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold text-sm appearance-none transition-all focus:border-[#3A4FFF]/30">
                        <option>Culture</option>
                        <option>Activité</option>
                        <option>Sport</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 mb-2 block">Places</label>
                      <input type="number" defaultValue={5} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold text-sm transition-all focus:border-[#3A4FFF]/30" />
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      onCreateActivity({});
                      setShowCreateModal(false);
                    }}
                    className="w-full py-5 premium-button rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl"
                  >
                    Publier l'activité
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
