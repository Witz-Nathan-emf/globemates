
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Navigation, Users, MessageCircle, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navItems = [
    { path: '/home', icon: HomeIcon, label: 'Feed' },
    { path: '/explore', icon: Navigation, label: 'Carte' },
    { path: '/mates', icon: Users, label: 'Mates' },
    { path: '/chats', icon: MessageCircle, label: 'Messages' },
    { path: '/profile', icon: User, label: 'Profil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 px-4 py-4 flex justify-between items-center z-50 rounded-t-[32px] shadow-[0_-10px_40px_rgba(58,79,255,0.08)] transition-all duration-500">
      {navItems.map((item) => {
        const isActive = location.pathname.startsWith(item.path);
        return (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`flex flex-col items-center gap-1 transition-all active:scale-90 ${isActive ? 'text-[#3A4FFF]' : 'text-slate-300 hover:text-slate-500'}`}
          >
            <item.icon size={22} strokeWidth={isActive ? 3 : 2} className={isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(79,107,255,0.5)]' : ''} />
            <span className={`text-[8px] font-black uppercase tracking-[0.1em] ${isActive ? 'opacity-100' : 'opacity-40'}`}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
