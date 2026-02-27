
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Shield, Users, Map as MapIcon, Zap } from 'lucide-react';
import { AppNotification } from '../types';

export const NotificationCenter: React.FC<{ notifications: AppNotification[] }> = ({ notifications }) => {
    const navigate = useNavigate();
    const getIcon = (type: string) => {
        switch(type) {
            case 'security': return <Shield size={20} className="text-red-400" />;
            case 'social': return <Users size={20} className="text-[#7B5CFF]" />;
            case 'activity': return <MapIcon size={20} className="text-[#3A4FFF]" />;
            case 'subscription': return <Zap size={20} className="text-amber-400" />;
            default: return <Bell size={20} className="text-slate-400" />;
        }
    };

    return (
        <div className="h-screen flex flex-col bg-light-bg transition-all duration-500">
            <div className="px-6 py-8 border-b border-slate-100 flex items-center gap-6 bg-white/80 backdrop-blur-xl z-10">
                <button onClick={() => navigate(-1)} className="p-4 bg-slate-50 rounded-2xl text-slate-400 transition-all active:scale-95"><ArrowLeft size={24} /></button>
                <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Notifications</h1>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                {notifications.map(notif => (
                    <div key={notif.id} className={`p-6 rounded-[32px] border transition-all duration-500 ${notif.isRead ? 'bg-white border-slate-100' : 'bg-blue-50/50 border-blue-100 shadow-sm'}`}>
                        <div className="flex gap-5">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-50 shrink-0">
                                {getIcon(notif.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-black text-slate-900 text-sm uppercase tracking-tight">{notif.title}</h4>
                                    <span className="text-[8px] font-black text-slate-300 uppercase">{new Date(notif.timestamp).toLocaleDateString()}</span>
                                </div>
                                <p className="text-xs font-bold text-slate-400 leading-relaxed">{notif.content}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
