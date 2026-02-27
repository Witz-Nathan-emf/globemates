
import React from 'react';
import { Star } from 'lucide-react';

export const TrustStars: React.FC<{ rating: number; size?: number; showLabel?: boolean }> = ({ rating, size = 10, showLabel = true }) => {
  const fullStars = Math.floor(rating);
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          size={size} 
          className={i < fullStars ? "fill-[#7B5CFF] text-[#7B5CFF]" : "text-slate-200"} 
        />
      ))}
      {showLabel && <span className="text-[9px] font-black text-[#7B5CFF] ml-1">{rating.toFixed(1)}</span>}
    </div>
  );
};
