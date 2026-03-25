import React from 'react';
import { Banknote, Smartphone, LucideIcon } from 'lucide-react';
import { PaymentAccount } from '@/src/types';
import { cn } from '@/src/lib/utils';

interface PaymentMethodSelectorProps {
  selected: string;
  onChange: (id: string) => void;
  accounts: PaymentAccount[];
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ selected, onChange, accounts }) => {
  const defaultOptions = [
    { id: 'Cash', label: 'ငွေသား', icon: Banknote },
    { id: 'KBZ Pay', label: 'KBZ Pay', icon: Smartphone },
    { id: 'Wave Money', label: 'Wave Money', icon: Smartphone }
  ];

  const displayOptions = accounts && accounts.length > 0 
    ? [{ id: 'Cash', label: 'ငွေသား', icon: Banknote }, ...accounts.map(acc => ({ id: `${acc.provider} - ${acc.name}`, label: acc.provider, detail: acc.name, icon: Smartphone }))] 
    : defaultOptions;

  return (
    <div className="space-y-2 w-full">
      <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">ငွေပေးချေမှုပုံစံ</label>
      <div className="grid grid-cols-3 gap-2">
        {displayOptions.map(opt => {
          const IconComponent = opt.icon;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-xl border transition-all",
                selected === opt.id 
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm' 
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
              )}
            >
              <IconComponent size={16} className={cn("mb-1", selected === opt.id ? 'text-indigo-500' : 'text-slate-400')} />
              <span className="text-[10px] font-bold text-center leading-tight">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
