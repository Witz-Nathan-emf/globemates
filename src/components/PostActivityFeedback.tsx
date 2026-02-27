
import React, { useState } from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Activity, UserProfile } from '../types';

export const PostActivityFeedback: React.FC<{ activity: Activity, mate: UserProfile, onClose: () => void }> = ({ activity, mate, onClose }) => {
  const [rating, setRating] = useState(0);
  const [step, setStep] = useState(0);
  
  const criteria = [
    { label: 'Respect', key: 'respect' },
    { label: 'Ponctualité', key: 'punctuality' },
    { label: 'Comportement', key: 'behavior' },
    { label: 'Fiabilité', key: 'reliability' }
  ];

  return (
    <div className="fixed inset-0 z-[150] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-6">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white w-full max-w-md rounded-[50px] p-12 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
          <div className="h-full bg-[#3A4FFF] transition-all duration-500" style={{ width: `${((step + 1) / (criteria.length + 1)) * 100}%` }} />
        </div>

        {step < criteria.length ? (
          <>
            <div className="w-24 h-24 mx-auto mb-8 rounded-[32px] overflow-hidden border-4 border-white shadow-xl">
              <img src={`https://picsum.photos/seed/${mate.id}/200`} className="w-full h-full object-cover" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">Comment était {mate.name} ?</h2>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10">Critère: {criteria[step].label}</p>
            
            <div className="flex justify-center gap-3 mb-12">
              {[1, 2, 3, 4, 5].map(star => (
                <button 
                  key={star} 
                  onClick={() => setRating(star)}
                  className={`p-3 rounded-2xl transition-all ${rating >= star ? 'bg-[#7B5CFF] text-white scale-110' : 'bg-slate-50 text-slate-200'}`}
                >
                  <Star size={28} fill={rating >= star ? 'currentColor' : 'none'} />
                </button>
              ))}
            </div>

            <button 
              onClick={() => { setStep(step + 1); setRating(0); }}
              disabled={rating === 0}
              className="w-full py-6 premium-button rounded-[32px] font-black text-xs uppercase tracking-[0.4em] shadow-xl disabled:opacity-50 transition-all active:scale-95"
            >
              Suivant
            </button>
          </>
        ) : (
          <>
            <div className="w-24 h-24 mx-auto mb-8 bg-blue-50 rounded-[32px] flex items-center justify-center text-[#3A4FFF]">
              <CheckCircle size={48} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">Merci !</h2>
            <p className="text-slate-400 font-bold mb-12">Votre avis aide à maintenir la communauté Globe Mates sûre et fiable.</p>
            <button 
              onClick={onClose}
              className="w-full py-6 bg-slate-900 text-white rounded-[32px] font-black text-xs uppercase tracking-[0.4em] shadow-xl transition-all active:scale-95"
            >
              Fermer
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
};
