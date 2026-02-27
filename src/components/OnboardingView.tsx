
import React, { useState } from 'react';
import { Compass, ShieldCheck, Map as MapIcon, Star, ChevronLeft, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const OnboardingView: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const steps = [
    {
      title: "Globe Mates",
      desc: "L'écosystème de confiance pour explorateurs passionnés.",
      icon: Compass,
      color: "blue"
    },
    {
      title: "Confiance & Sécurité",
      desc: "Une communauté vérifiée et un système de confiance organique.",
      icon: ShieldCheck,
      color: "violet"
    },
    {
      title: "Découverte Libre",
      desc: "Explorez le monde et rencontrez des locaux sans algorithmes imposés.",
      icon: MapIcon,
      color: "blue"
    },
    {
      title: "Trust Score",
      desc: "Un score de confiance évolutif basé sur vos interactions réelles.",
      icon: Star,
      color: "violet"
    }
  ];

  const currentStep = steps[step];

  return (
    <div className="fixed inset-0 z-[200] bg-light-bg flex flex-col transition-colors duration-300">
      <div className="flex-1 flex flex-col items-center justify-center px-10 text-center">
        <motion.div 
          key={step}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full max-w-sm"
        >
          <div className={`w-24 h-24 mx-auto mb-10 rounded-[32px] flex items-center justify-center ${currentStep.color === 'blue' ? 'bg-blue-50 text-[#3A4FFF]' : 'bg-violet-50 text-[#7B5CFF]'} premium-glow shadow-sm border border-white`}>
            <currentStep.icon size={48} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tighter leading-none uppercase">{currentStep.title}</h1>
          <p className="text-slate-500 font-bold text-lg leading-relaxed">{currentStep.desc}</p>
        </motion.div>
      </div>

      <div className="px-10 pb-20">
        <div className="flex justify-center gap-2 mb-12">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? 'w-8 bg-[#3A4FFF]' : 'w-2 bg-slate-200'}`} />
          ))}
        </div>
        
        <div className="flex gap-4">
          {step > 0 && (
            <button 
              onClick={() => setStep(step - 1)}
              className="p-6 bg-white border border-slate-100 rounded-3xl text-slate-400 shadow-sm"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          <button 
            onClick={() => step < steps.length - 1 ? setStep(step + 1) : onComplete()}
            className="flex-1 py-6 premium-button rounded-[32px] flex items-center justify-center gap-4 shadow-xl"
          >
            {step < steps.length - 1 ? "Suivant" : "Commencer"} <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
