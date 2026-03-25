import React from 'react';
import { Truck, PackageCheck, Phone, MapPin, Navigation } from 'lucide-react';
import { Record as AppRecord } from '@/src/types';
import { cn } from '@/src/lib/utils';

interface DeliveryScreenProps {
  deliveryRecords: AppRecord[];
  toggleDeliveryStatus: (id: number, currentStatus: string) => void;
}

export const DeliveryScreen: React.FC<DeliveryScreenProps> = ({
  deliveryRecords,
  toggleDeliveryStatus
}) => {
  return (
    <div className="animate-in fade-in duration-300 max-w-4xl mx-auto">
      <div className="mb-4 flex items-center gap-2 px-2">
        <Truck className="text-indigo-600" size={24} />
        <h2 className="text-lg font-bold text-slate-800">Delivery ပို့ရန် စာရင်းများ</h2>
      </div>
      <div className="space-y-4">
        {deliveryRecords.length === 0 ? (
          <div className="p-10 text-center text-slate-500 bg-white rounded-xl shadow-sm border border-slate-100">ပို့ရန် စာရင်းမရှိသေးပါ။</div>
        ) : (
          deliveryRecords.map(r => (
            <div
              key={r.id}
              className={cn(
                "bg-white rounded-2xl shadow-sm border p-4 transition-colors",
                r.deliveryStatus === 'delivered' ? 'border-emerald-300 bg-emerald-50/50' : 'border-amber-200 bg-amber-50/30'
              )}
            >
              <div className="flex justify-between items-start mb-3 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-slate-800">{r.name} <span className="text-xs text-slate-500 font-normal ml-2">{r.date}</span></h3>
                  <p className="text-xs font-mono text-indigo-600 mt-0.5">[{r.code}] {r.productName !== '-' ? r.productName : ''} - {r.quantity} ခု</p>
                </div>
                <button
                  onClick={() => toggleDeliveryStatus(r.id, r.deliveryStatus)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-colors",
                    r.deliveryStatus === 'delivered' ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm' : 'bg-white text-amber-600 border-amber-300 hover:bg-amber-50'
                  )}
                >
                  {r.deliveryStatus === 'delivered' ? <><PackageCheck size={14} /> ပို့ပြီး</> : <><Truck size={14} /> ပို့ရန်ကျန်</>}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-start gap-2 text-slate-600"><Phone size={16} className="text-slate-400 mt-0.5 shrink-0" /> {r.customerPhone || 'ဖုန်းနံပါတ်မရှိ'}</div>
                <div className="flex items-start gap-2 text-slate-600"><MapPin size={16} className="text-slate-400 mt-0.5 shrink-0" /> {r.city}</div>
                <div className="flex items-start gap-2 text-slate-600 md:col-span-2"><Navigation size={16} className="text-slate-400 mt-0.5 shrink-0" /> {r.deliveryAddress || 'လိပ်စာမရှိ'}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
