
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, CheckCircle2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { UserProfile, SubscriptionPlan } from '../types';

export const SubscriptionView: React.FC<{ currentUser: UserProfile }> = ({ currentUser }) => {
    const navigate = useNavigate();
    const plans = [
        {
            name: SubscriptionPlan.FREE,
            price: '0€',
            features: ['Exploration limitée', 'Confiance organique', 'Support standard'],
            color: 'slate'
        },
        {
            name: SubscriptionPlan.PREMIUM,
            price: '9.99€',
            features: ['Exploration illimitée', 'Badge Premium', 'Trust Boost +20%', 'Support prioritaire'],
            color: 'blue',
            popular: true
        },
        {
            name: SubscriptionPlan.PREMIUM_PLUS,
            price: '19.99€',
            features: ['Tout le Premium', 'Visibilité max', 'Trust Boost +50%', 'Accès événements VIP'],
            color: 'violet'
        }
    ];

    return (
        <div className="h-screen flex flex-col bg-light-bg transition-all duration-500">
            <div className="px-6 py-8 flex items-center gap-6 z-10">
                <button onClick={() => navigate(-1)} className="p-4 bg-white rounded-2xl text-slate-400 border border-slate-100 transition-all active:scale-95 shadow-sm"><ArrowLeft size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 pb-20 no-scrollbar">
                <div className="text-center mb-12">
                    <div className="w-20 h-20 premium-gradient rounded-[32px] flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-blue-200">
                        <Zap size={40} fill="white" />
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tighter leading-none">Passez au niveau supérieur</h1>
                    <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Libérez tout le potentiel de Globe Mates</p>
                </div>

                <div className="space-y-6">
                    {plans.map((plan, i) => (
                        <motion.div 
                            key={plan.name}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className={`p-10 rounded-[50px] border-2 transition-all duration-500 relative overflow-hidden ${plan.popular ? 'border-[#3A4FFF] bg-blue-50/30' : 'border-slate-100 bg-white'}`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 right-0 bg-[#3A4FFF] text-white px-6 py-2 rounded-bl-3xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                    <Sparkles size={12} /> Recommandé
                                </div>
                            )}
                            <h3 className="text-2xl font-black text-slate-900 mb-1 uppercase tracking-tight">{plan.name}</h3>
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                                <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">/ mois</span>
                            </div>
                            <ul className="space-y-4 mb-10">
                                {plan.features.map(feat => (
                                    <li key={feat} className="flex items-center gap-4 text-sm font-bold text-slate-600">
                                        <CheckCircle2 size={18} className={plan.popular ? "text-[#3A4FFF]" : "text-slate-300"} />
                                        {feat}
                                    </li>
                                ))}
                            </ul>
                            <button className={`w-full py-5 rounded-3xl font-black text-xs uppercase tracking-[0.3em] transition-all active:scale-95 ${plan.name === currentUser.subscriptionPlan ? 'bg-slate-100 text-slate-400 cursor-default' : plan.popular ? 'premium-button shadow-xl' : 'bg-slate-900 text-white border border-transparent'}`}>
                                {plan.name === currentUser.subscriptionPlan ? 'Plan Actuel' : 'Choisir ce plan'}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
