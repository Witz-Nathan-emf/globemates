
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, ShieldAlert, Zap, MapPin, Globe, Star } from 'lucide-react';
import { UserProfile, SubscriptionPlan } from '../types';
import { Badge } from '../components/Badge';
import { VerificationBadge } from '../components/VerificationBadge';
import { TrustStars } from '../components/TrustStars';

export const UserDetailView: React.FC<{ 
  users: UserProfile[], 
  currentUserId: string, 
  onMessage: (targetId: string) => void, 
  onReport: (id: string) => void 
}> = ({ users, currentUserId, onMessage, onReport }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = users.find(u => u.id === id);

    if (!user) return null;

    return (
        <div className="pb-40 bg-light-bg min-h-screen transition-all duration-500">
            {/* Header Image */}
            <div className="relative h-[50vh] w-full overflow-hidden">
                <img src={`https://picsum.photos/seed/${user.id}/800/1000`} className="w-full h-full object-cover" alt={user.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-light-bg via-transparent to-transparent" />
                <button onClick={() => navigate(-1)} className="absolute top-10 left-6 p-4 bg-white/20 backdrop-blur-md rounded-2xl text-white border border-white/30 transition-all active:scale-95"><ArrowLeft size={24} /></button>
                <div className="absolute bottom-10 left-10 right-10">
                    <div className="flex items-center gap-3 mb-4">
                        <VerificationBadge status={user.verificationStatus} />
                        {user.subscriptionPlan !== SubscriptionPlan.FREE && (
                          <span className="px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest bg-amber-400 text-white shadow-lg flex items-center gap-1">
                            <Zap size={10} fill="white" /> Premium
                          </span>
                        )}
                    </div>
                    <h1 className="text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">{user.name}, {user.age}</h1>
                </div>
            </div>

            <div className="px-10 -mt-6 relative z-10">
                {/* Stats Bar */}
                <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl flex justify-between items-center mb-12 transition-all duration-500">
                    <div className="text-center">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Trust Score</p>
                        <div className="flex items-center gap-2">
                            <Star size={14} className="fill-[#7B5CFF] text-[#7B5CFF]" />
                            <span className="text-xl font-black text-slate-900">{user.rating.toFixed(1)}</span>
                        </div>
                    </div>
                    <div className="w-px h-10 bg-slate-100" />
                    <div className="text-center">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Avis</p>
                        <p className="text-xl font-black text-slate-900">{user.ratingCount}</p>
                    </div>
                    <div className="w-px h-10 bg-slate-100" />
                    <div className="text-center">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Mates</p>
                        <p className="text-xl font-black text-slate-900">42</p>
                    </div>
                </div>

                {/* Bio & Details */}
                <div className="space-y-12">
                    <section>
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-300 mb-6">À propos</h3>
                        <p className="text-lg font-bold text-slate-500 leading-relaxed">{user.bio}</p>
                    </section>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
                            <Globe size={20} className="text-[#3A4FFF] mb-4" />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Origine</p>
                            <p className="font-black text-slate-900">{user.origin}</p>
                        </div>
                        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
                            <MapPin size={20} className="text-[#7B5CFF] mb-4" />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Localisation</p>
                            <p className="font-black text-slate-900">Paris, FR</p>
                        </div>
                    </div>

                    <section>
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-300 mb-6">Langues</h3>
                        <div className="flex flex-wrap gap-3">
                            {user.languages.map(lang => <Badge key={lang} color="blue">{lang}</Badge>)}
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-300 mb-6">Centres d'intérêt</h3>
                        <div className="flex flex-wrap gap-3">
                            {user.interests.map(interest => <Badge key={interest} color="violet">{interest}</Badge>)}
                        </div>
                    </section>

                    {/* Trust Breakdown */}
                    <section className="bg-slate-900 p-10 rounded-[50px] text-white shadow-2xl border border-transparent">
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-10">Détail de confiance</h3>
                        <div className="space-y-8">
                            {Object.entries(user.trustBreakdown).map(([key, val]) => {
                                const score = val as number;
                                return (
                                    <div key={key}>
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{key}</span>
                                            <span className="text-sm font-black text-[#7B5CFF]">{score.toFixed(1)}</span>
                                        </div>
                                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full premium-gradient transition-all duration-1000" style={{ width: `${(score / 5) * 100}%` }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </div>
            </div>

            {/* Floating Action Bar */}
            <div className="fixed bottom-10 left-10 right-10 flex gap-4 z-50">
                <button 
                  onClick={() => { onMessage(user.id); navigate('/chats'); }}
                  className="flex-1 py-6 premium-button rounded-[32px] flex items-center justify-center gap-4 shadow-2xl"
                >
                    <MessageCircle size={24} />
                    <span className="font-black text-xs uppercase tracking-[0.2em]">Envoyer un message</span>
                </button>
                <button 
                  onClick={() => onReport(user.id)}
                  className="p-6 bg-white border border-slate-100 rounded-[32px] text-red-400 shadow-xl transition-all active:scale-95"
                >
                    <ShieldAlert size={24} />
                </button>
            </div>
        </div>
    );
};
