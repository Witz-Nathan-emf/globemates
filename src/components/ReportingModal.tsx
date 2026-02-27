
import React, { useState } from 'react';
import { X, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

export const ReportingModal: React.FC<{ 
  target: { type: string, id: string } | null, 
  onClose: () => void,
  onSubmit: (data: any) => void
}> = ({ target, onClose, onSubmit }) => {
  const [reason, setReason] = useState('');
  const [evidence, setEvidence] = useState('');

  if (!target) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-full max-w-md rounded-[40px] p-10 shadow-2xl relative overflow-hidden"
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-2 bg-slate-50 rounded-full text-slate-400"><X size={20} /></button>
        <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center text-[#3A4FFF] mb-8">
          <ShieldAlert size={32} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">Signaler un problème</h2>
        <p className="text-slate-400 text-sm font-bold mb-8 uppercase tracking-widest">Type: {target.type} ID: {target.id}</p>
        
        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 mb-2 block">Motif du signalement</label>
            <select 
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold text-sm appearance-none text-slate-900"
            >
              <option value="">Choisir un motif...</option>
              <option value="harassment">Harcèlement</option>
              <option value="spam">Spam / Publicité</option>
              <option value="fake">Faux profil</option>
              <option value="inappropriate">Contenu inapproprié</option>
              <option value="safety">Risque de sécurité</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 mb-2 block">Détails supplémentaires</label>
            <textarea 
              value={evidence}
              onChange={(e) => setEvidence(e.target.value)}
              placeholder="Expliquez-nous ce qu'il s'est passé..."
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold text-sm min-h-[120px] resize-none text-slate-900"
            />
          </div>
          <button 
            onClick={() => onSubmit({ reason, evidence, target })}
            disabled={!reason}
            className="w-full py-5 premium-button rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl disabled:opacity-50 disabled:shadow-none transition-all active:scale-95"
          >
            Envoyer le signalement
          </button>
        </div>
      </motion.div>
    </div>
  );
};
