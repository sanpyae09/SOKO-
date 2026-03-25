import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  val: number;
  color: 'emerald' | 'rose' | 'amber' | 'blue' | 'purple';
  isCount?: boolean;
  filter: string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, val, color, isCount, filter }) => {
  const colors = {
    emerald: 'bg-emerald-100 text-emerald-600',
    rose: 'bg-rose-100 text-rose-600',
    amber: 'bg-amber-100 text-amber-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600'
  };
  const textColors = {
    emerald: 'text-emerald-600',
    rose: 'text-rose-600',
    amber: 'text-amber-600',
    blue: 'text-blue-600',
    purple: 'text-purple-600'
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
      <div className={cn("p-3 rounded-xl", colors[color])}>
        <Icon size={24} />
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-bold text-slate-500 mb-1">{title}</h3>
        <p className={cn("text-2xl font-black", textColors[color])}>
          {val.toLocaleString()} {isCount ? <span className="text-base text-slate-500">ခု</span> : 'Ks'}
        </p>
        <p className="text-xs text-slate-400 mt-1">ကာလ: {filter}</p>
      </div>
    </div>
  );
};
