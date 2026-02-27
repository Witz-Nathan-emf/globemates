
import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Shield, Zap, ChevronRight, LogOut, Moon, Sun } from 'lucide-react';
import { UserProfile, SubscriptionPlan } from '../types';
import { Badge } from '../components/Badge';
import { TrustStars } from '../components/TrustStars';

export const ProfileView: React.FC<{ 
  currentUser: UserProfile
}> = ({ currentUser }) => {
    return (
        <div className="pb-40 pt-20 px-6 max-w-xl mx-auto bg-light-bg min-h-screen transition-all duration-500">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">Profil</h1>
                <button className="p-4 bg-white rounded-2xl text-slate-400 border border-slate-100 transition-all active:scale-95 shadow-sm"><Settings size={24} /></button>
            </div>

            {/* Carte Profil */}
            <div className="bg-white p-10 rounded-[50px] border border-slate-100 shadow-sm mb-10 text-center relative overflow-hidden transition-all duration-500">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <img src={`https://picsum.photos/seed/${currentUser.id}/300`} className="w-full h-full rounded-[40px] object-cover shadow-2xl" />
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 premium-gradient rounded-2xl flex items-center justify-center text-white border-4 border-white shadow-lg">
                    <Zap size={18} fill="white" />
                  </div>
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">{currentUser.name}, {currentUser.age}</h2>
                <div className="flex justify-center gap-3 mb-6">
                    <Badge color="blue">{currentUser.origin}</Badge>
                    <TrustStars rating={currentUser.rating} size={14} />
                </div>
                <div className="grid grid-cols-3 gap-4 border-t border-slate-50 pt-8 mt-4">
                    <div>
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Mates</p>
                        <p className="text-xl font-black text-slate-900">124</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Activités</p>
                        <p className="text-xl font-black text-slate-900">18</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Trust</p>
                        <p className="text-xl font-black text-[#7B5CFF]">4.9</p>
                    </div>
                </div>
            </div>

            {/* Menu Options */}
            <div className="space-y-4">
                <Link to="/subscription" className="w-full bg-blue-50 p-6 rounded-[32px] flex items-center justify-between group active:scale-95 transition-all border border-blue-100/50">
                    <div className="flex items-center gap-5">
                        <div className="w-12 h-12 premium-gradient rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200/50">
                            <Zap size={20} fill="white" />
                        </div>
                        <div>
                            <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Globe Mates Premium</p>
                            <p className="text-[10px] font-bold text-[#3A4FFF] uppercase tracking-widest">Gérer mon abonnement</p>
                        </div>
                    </div>
                    <ChevronRight size={20} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="bg-white rounded-[40px] border border-slate-100 p-4 space-y-2 transition-all duration-500 shadow-sm">
                    <button className="w-full p-5 rounded-3xl flex items-center justify-between hover:bg-slate-50 transition-colors group">
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                                <Shield size={20} />
                            </div>
                            <span className="text-sm font-black text-slate-900 uppercase tracking-tight">Sécurité & Confidentialité</span>
                        </div>
                        <ChevronRight size={20} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button className="w-full p-5 rounded-3xl flex items-center justify-between hover:bg-red-50 transition-colors group">
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-400">
                                <LogOut size={20} />
                            </div>
                            <span className="text-sm font-black text-red-400 uppercase tracking-tight">Déconnexion</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};
