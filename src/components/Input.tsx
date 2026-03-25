import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  icon?: LucideIcon;
  rows?: number;
}

export const Input: React.FC<InputProps> = ({ label, icon: Icon, rows, className, ...props }) => {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
        {Icon && <Icon size={14} className="text-indigo-500" />} {label}
      </label>
      {rows ? (
        <textarea
          rows={rows}
          className={cn(
            "w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white disabled:bg-slate-100 disabled:text-slate-500 resize-none",
            className
          )}
          {...props as any}
        />
      ) : (
        <input
          className={cn(
            "w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white disabled:bg-slate-100 disabled:text-slate-500",
            className
          )}
          {...props}
        />
      )}
    </div>
  );
};
