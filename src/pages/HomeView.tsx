
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Bell, Search, ArrowRight, ShieldCheck, Sparkles, Map as MapIcon, MapPin } from 'lucide-react';
import { UserProfile, Activity, SubscriptionPlan } from '../types';
import { TrustStars } from '../components/TrustStars';

export const HomeView: React.FC<{ users: UserProfile[], activities: Activity[], currentUser: UserProfile }> = ({ users, activities, currentUser }) => {
    const suggestedMates = useMemo(() => users.filter(u => u.id !== currentUser.id).slice(0, 6), [users, currentUser]);
    const topActivities = useMemo(() => activities.slice(0, 5), [activities]);

    return (
        <div className="pb-40 pt-16 px-6 bg-light-bg min-h-screen transition-all duration-500">
            {/* Header Profil Rapide */}
            <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white p-1 shadow-lg border border-slate-100 relative">
                        <img src={`https://picsum.photos/seed/${currentUser.id}/150`} className="w-full h-full object-cover rounded-xl" alt="Me" />
                        {currentUser.subscriptionPlan !== SubscriptionPlan.FREE && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 premium-gradient rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm">
                            <Zap size={12} fill="white" />
                          </div>
                        )}
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-slate-900 leading-none mb-1">Hello {currentUser.name}!</h2>
                        <div className="flex items-center gap-2">
                          <p className="text-[10px] font-black text-[#3A4FFF] uppercase tracking-widest">Paris, France 🇫🇷</p>
                        </div>
                    </div>
                </div>
                <Link to="/notifications" className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 text-[#3A4FFF] relative transition-all hover:scale-105 active:scale-95">
                    <Bell size={20} />
                    <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-[#7B5CFF] border-2 border-white rounded-full"></div>
                </Link>
            </div>

            {/* Barre de Recherche Graphique */}
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 mb-10 transition-all focus-within:ring-2 focus-within:ring-[#3A4FFF]/20">
                <Search size={20} className="text-slate-300" />
                <input type="text" placeholder="Où allons-nous aujourd'hui ?" className="bg-transparent border-none outline-none font-bold text-sm w-full placeholder:text-slate-300 text-slate-900" />
            </div>

            {/* Suggestions de Mates */}
            <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900">Mates suggérés</h3>
                    <Link to="/mates" className="text-[10px] font-black text-[#3A4FFF] uppercase flex items-center gap-1 group">
                        Tout voir <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar">
                    {suggestedMates.map(mate => (
                        <Link key={mate.id} to={`/user/${mate.id}`} className="min-w-[180px] bg-white p-5 rounded-[40px] border border-slate-100 shadow-sm flex flex-col items-center group active:scale-95 transition-all hover:border-[#3A4FFF]/30">
                            <div className="relative mb-4">
                                <img src={`https://picsum.photos/seed/${mate.id}/200`} className="w-24 h-24 rounded-[32px] object-cover group-hover:scale-105 transition-transform shadow-lg" />
                                <div className={`absolute -bottom-1 -right-1 w-7 h-7 border-4 border-white rounded-full flex items-center justify-center ${mate.isOnline ? 'bg-[#7B5CFF]' : 'bg-slate-200'}`}>
                                  {mate.isOnline && <div className="w-2 h-2 bg-white rounded-full animate-pulse" />}
                                </div>
                            </div>
                            <h4 className="font-black text-slate-900 text-center mb-1">{mate.name}, {mate.age}</h4>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center mb-3">{mate.origin}</p>
                            <div className="flex flex-col items-center gap-2">
                              <TrustStars rating={mate.rating} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Bannière Sécurité */}
            <div className="premium-gradient p-8 rounded-[40px] text-white shadow-xl shadow-blue-100 mb-12 relative overflow-hidden group">
                <ShieldCheck size={80} className="absolute -right-6 -bottom-6 opacity-20 group-hover:scale-110 transition-transform duration-700" />
                <h3 className="text-xl font-black mb-2 flex items-center gap-2">
                    <Sparkles size={20} /> Voyagez serein
                </h3>
                <p className="text-xs font-bold text-white/80 leading-relaxed mb-6">Notre écosystème de confiance garantit votre sécurité.</p>
                <button className="bg-white text-[#3A4FFF] px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:shadow-xl transition-all active:scale-95">En savoir plus</button>
            </div>

            {/* Activités Populaires */}
            <div>
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 mb-6">Activités à la une</h3>
                <div className="grid gap-6">
                    {topActivities.map(act => (
                        <Link key={act.id} to="/explore" className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-6 group hover:border-[#3A4FFF]/30 transition-all active:scale-[0.98]">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg ${act.type === 'Culture' ? 'bg-[#7B5CFF]' : 'bg-[#3A4FFF]'}`}>
                                <MapIcon size={24} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-black text-slate-900 truncate text-lg tracking-tight mb-1">{act.title}</h4>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                                        <MapPin size={10} /> {act.locationName}
                                    </span>
                                    <span className="text-[10px] font-black text-[#3A4FFF]">{act.interestedUserIds.length} mates</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
