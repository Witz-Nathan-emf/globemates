
import React from 'react';

export const Badge: React.FC<{ children: React.ReactNode; color?: string; className?: string }> = ({ children, color = 'blue', className = '' }) => {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-[#3A4FFF] border-blue-100',
    violet: 'bg-violet-50 text-[#7B5CFF] border-violet-100',
    slate: 'bg-slate-50 text-slate-500 border-slate-100',
    white: 'bg-white/20 text-white border-white/30',
  };
  const colors = colorMap[color] || `bg-${color}-50 text-${color}-600 border-${color}-100`;
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${colors} ${className}`}>
      {children}
    </span>
  );
};
