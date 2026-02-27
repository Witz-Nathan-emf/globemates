
import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { UserProfile, SubscriptionPlan } from '../types';
import { Badge } from '../components/Badge';
import { TrustStars } from '../components/TrustStars';
import { calculateDistance } from '../utils/geo';

export const MatesListView: React.FC<{ users: UserProfile[], currentUser: UserProfile }> = ({ users, currentUser }) => {
    return (
        <div className="pb-36 pt-20 px-6 max-w-xl mx-auto bg-light-bg min-h-screen transition-all duration-500">
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase mb-12">Mates</h1>
            <div className="space-y-6">
                {users.filter(u => u.id !== currentUser.id).map(user => (
                    <Link key={user.id} to={`/user/${user.id}`} className="bg-white p-6 rounded-[40px] border border-slate-100 shadow-sm flex items-center gap-6 group relative overflow-hidden transition-all duration-500 hover:border-[#3A4FFF]/30 active:scale-[0.98]">
                        <div className="relative">
                          <img src={`https://picsum.photos/seed/${user.id}/200`} className="w-24 h-24 rounded-[32px] object-cover group-hover:scale-105 transition-all shadow-md" />
                          {user.isOnline && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#7B5CFF] border-2 border-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-black text-slate-900 text-xl truncate">{user.name}, {user.age}</h3>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                <Badge color="slate">{user.origin}</Badge>
                                <TrustStars rating={user.rating} />
                                <span className="text-[10px] font-black text-[#3A4FFF] uppercase tracking-tighter">{calculateDistance(currentUser.location.lat, currentUser.location.lng, user.location.lat, user.location.lng).toFixed(1)} km</span>
                            </div>
                        </div>
                        {user.subscriptionPlan !== SubscriptionPlan.FREE && (
                          <div className="absolute top-0 right-0 p-4">
                            <Zap size={14} className="text-[#7B5CFF]" fill="currentColor" />
                          </div>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
};
