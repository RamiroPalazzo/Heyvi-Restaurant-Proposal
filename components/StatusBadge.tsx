import React from 'react';
import { StatusType } from '../types';

interface StatusBadgeProps {
  status: StatusType;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const isGreen = status === StatusType.AVAILABLE || status === StatusType.PROPOSAL_READY;
  
  const baseClasses = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border shadow-sm";
  const colorClasses = isGreen
    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
    : "bg-blue-50 text-blue-600 border-blue-100";
    
  const dotColor = isGreen ? "bg-emerald-500" : "bg-blue-500";

  let label = "Pending";
  if (status === StatusType.AVAILABLE) label = "Avail";
  if (status === StatusType.PROPOSAL_READY) label = "Proposal";

  return (
    <span className={`${baseClasses} ${colorClasses}`}>
      <span className={`h-2 w-2 rounded-full ${dotColor} animate-pulse`} />
      {label}
    </span>
  );
};