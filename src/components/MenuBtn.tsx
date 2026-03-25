import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface MenuBtnProps {
  icon: LucideIcon;
  label: string;
  screen: string;
  count?: number;
  activeScreen: string;
  onClick: (screen: string) => void;
  color?: string;
}

export const MenuBtn: React.FC<MenuBtnProps> = ({ icon: Icon, label, screen, count, activeScreen, onClick, color }) => {
  const isActive = activeScreen === screen;
  return (
    <button
      onClick={() => onClick(screen)}
      className={cn(
        "w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-colors",
        isActive ? 'bg-indigo-600 text-white shadow-md' : (color || 'text-slate-600 hover:bg-slate-50')
      )}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} /> {label}
      </div>
      {count !== undefined && (
        <span className={cn("text-xs px-2 py-0.5 rounded-full", isActive ? 'bg-white/20' : 'bg-slate-100')}>
          {count}
        </span>
      )}
    </button>
  );
};
