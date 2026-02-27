
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, ShieldCheck, MoreVertical } from 'lucide-react';
import { UserProfile, Conversation, Message } from '../types';

export const ChatDetailView: React.FC<{ conversations: Conversation[], users: UserProfile[], messages: Record<string, Message[]>, onSendMessage: (convId: string, text: string) => void }> = ({ conversations, users, messages, onSendMessage }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    const conversation = conversations.find(c => c.id === id);
    const otherId = conversation?.participants.find(p => p !== 'u1');
    const otherUser = users.find(u => u.id === otherId);
    const chatMessages = messages[id || ''] || [];

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chatMessages]);

    if (!conversation || !otherUser) return null;

    return (
        <div className="h-screen flex flex-col bg-light-bg transition-all duration-500">
            {/* Header Chat */}
            <div className="px-6 py-6 border-b border-slate-100 flex items-center gap-4 bg-white/80 backdrop-blur-xl z-10">
                <button onClick={() => navigate(-1)} className="p-3 bg-slate-50 rounded-2xl text-slate-400 transition-all active:scale-95"><ArrowLeft size={20} /></button>
                <div className="flex-1 flex items-center gap-4">
                    <img src={`https://picsum.photos/seed/${otherId}/100`} className="w-12 h-12 rounded-2xl object-cover shadow-md" alt={otherUser.name} />
                    <div>
                        <h3 className="font-black text-slate-900 leading-none mb-1">{otherUser.name}</h3>
                        <p className="text-[9px] font-black text-[#7B5CFF] uppercase tracking-widest">{otherUser.isOnline ? 'En ligne' : 'Hors ligne'}</p>
                    </div>
                </div>
                <button className="p-3 text-slate-300 hover:text-slate-500 transition-colors"><MoreVertical size={20} /></button>
            </div>

            {/* Zone de Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                <div className="flex justify-center mb-10">
                    <div className="bg-blue-50 px-6 py-3 rounded-2xl flex items-center gap-3 text-[#3A4FFF] border border-blue-100/50">
                        <ShieldCheck size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Conversation sécurisée</span>
                    </div>
                </div>
                {chatMessages.map(msg => {
                    const isMe = msg.senderId === 'u1';
                    return (
                        <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] px-6 py-4 rounded-[32px] text-sm font-bold leading-relaxed shadow-sm ${isMe ? 'premium-gradient text-white rounded-tr-none shadow-blue-500/10' : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'}`}>
                                {msg.text}
                                <div className={`text-[8px] mt-2 font-black uppercase opacity-40 ${isMe ? 'text-right' : 'text-left'}`}>
                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Input Chat */}
            <div className="p-6 bg-white border-t border-slate-100 pb-12 transition-all duration-500">
                <div className="bg-slate-50 p-2 rounded-[32px] flex items-center gap-2 border border-slate-100 focus-within:border-[#3A4FFF]/30 transition-all">
                    <input 
                        type="text" 
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && text && (onSendMessage(id!, text), setText(''))}
                        placeholder="Écrivez votre message..." 
                        className="flex-1 bg-transparent border-none outline-none px-6 py-3 font-bold text-sm text-slate-900 placeholder:text-slate-300" 
                    />
                    <button 
                        onClick={() => text && (onSendMessage(id!, text), setText(''))}
                        className="w-12 h-12 premium-button rounded-2xl flex items-center justify-center shadow-md"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};
