
import React from 'react';
import { Link } from 'react-router-dom';
import { UserProfile, Conversation } from '../types';

export const ChatListView: React.FC<{ conversations: Conversation[], users: UserProfile[] }> = ({ conversations, users }) => {
    return (
        <div className="pb-36 pt-20 px-6 max-w-xl mx-auto bg-light-bg min-h-screen transition-all duration-500">
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase mb-12">Messages</h1>
            <div className="space-y-4">
                {conversations.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Aucun message pour le moment</p>
                    </div>
                ) : (
                    conversations.map(conv => {
                        const otherId = conv.participants.find(p => p !== 'u1');
                        const otherUser = users.find(u => u.id === otherId);
                        return (
                            <Link key={conv.id} to={`/chat/${conv.id}`} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-6 group hover:border-[#3A4FFF]/30 transition-all active:scale-[0.98]">
                                <div className="relative">
                                    <img src={`https://picsum.photos/seed/${otherId}/100`} className="w-16 h-16 rounded-2xl object-cover shadow-md" alt={otherUser?.name} />
                                    {otherUser?.isOnline && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#7B5CFF] border-2 border-white rounded-full"></div>}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="font-black text-slate-900 text-lg truncate">{otherUser?.name}</h3>
                                        <span className="text-[8px] font-black text-slate-300 uppercase">{conv.lastMessageTime ? new Date(conv.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                                    </div>
                                    <p className="text-xs font-bold text-slate-400 truncate leading-relaxed">{conv.lastMessage}</p>
                                </div>
                            </Link>
                        );
                    })
                )}
            </div>
        </div>
    );
};
