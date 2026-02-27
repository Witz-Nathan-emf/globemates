
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { VerificationStatus } from '../types';

export const VerificationBadge: React.FC<{ status: VerificationStatus }> = ({ status }) => {
  // Verification is now internal only, not visible in UI as per requirements
  if (status !== VerificationStatus.VERIFIED) return null;
  
  return (
    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest bg-blue-50 text-[#3A4FFF] border border-blue-100 shadow-sm">
      <CheckCircle size={12} /> Vérifié
    </span>
  );
};
