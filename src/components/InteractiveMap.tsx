
import React, { useState, useRef } from 'react';
import { Map as MapIcon } from 'lucide-react';
import { Activity, UserProfile } from '../types';

export const InteractiveMap: React.FC<{ 
  activities: Activity[], 
  onSelectActivity: (a: Activity) => void,
  currentUser: UserProfile,
}> = ({ activities, onSelectActivity, currentUser }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    setOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => setIsDragging(false);

  const getPos = (lat: number, lng: number) => {
    const scale = 8000;
    const top = 50 - (lat - 48.8566) * scale;
    const left = 50 + (lng - 2.3522) * scale;
    return { 
      top: `calc(${top}% + ${offset.y}px)`, 
      left: `calc(${left}% + ${offset.x}px)` 
    };
  };

  return (
    <div 
      className={`relative w-full h-full bg-light-bg overflow-hidden cursor-${isDragging ? 'grabbing' : 'grab'} transition-colors duration-300`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="absolute inset-[-3000px] pointer-events-none transition-transform duration-75" style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}>
          <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
              {/* Rivières Stylisées (Bleu premium doux) */}
              <path d="M0,800 Q400,700 800,1000 T1600,900 T2400,1100 T3200,1000 T4000,1200" fill="none" stroke="#3A4FFF" strokeWidth="120" />
              {/* Rues Graphiques (Gris très clair) */}
              <g stroke="currentColor" className="text-slate-100" strokeWidth="12">
                  {Array.from({ length: 30 }).map((_, i) => (
                      <React.Fragment key={i}>
                        <line x1="0" y1={i * 250} x2="5000" y2={i * 250 + 150} />
                        <line x1={i * 250} y1="0" x2={i * 250 + 150} y2="5000" />
                      </React.Fragment>
                  ))}
              </g>
          </svg>
      </div>

      {/* User Spot */}
      <div className="absolute z-10" style={getPos(currentUser.location.lat, currentUser.location.lng)}>
        <div className="relative -translate-x-1/2 -translate-y-1/2">
           <div className="w-12 h-12 bg-white rounded-full border-4 border-[#3A4FFF] shadow-2xl flex items-center justify-center animate-pulse">
              <div className="w-3 h-3 bg-[#3A4FFF] rounded-full"></div>
           </div>
        </div>
      </div>

      {/* Markers */}
      {activities.map(a => (
        <button 
          key={a.id} 
          onClick={(e) => { e.stopPropagation(); onSelectActivity(a); }}
          className="absolute transition-all hover:scale-125 z-20 group"
          style={getPos(a.location.lat, a.location.lng)}
        >
          <div className="relative -translate-x-1/2 -translate-y-1/2">
            <div className={`w-14 h-14 rounded-[22px] flex items-center justify-center border-4 border-white shadow-xl transition-all ${a.type === 'Culture' ? 'bg-[#7B5CFF]' : 'bg-[#3A4FFF]'}`}>
              <MapIcon size={24} className="text-white" />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};
