import React from 'react';
import { AlertCircle, X, Trash2 } from 'lucide-react';
import { Record } from '@/src/types';

interface CancelOrderModalProps {
  cancelOrderModal: Record;
  onClose: () => void;
  onConfirm: () => void;
}

export const CancelOrderModal: React.FC<CancelOrderModalProps> = ({
  cancelOrderModal,
  onClose,
  onConfirm
}) => {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[60] animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl">
        <div className="border-b border-slate-100 px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <h3 className="font-bold text-lg text-rose-600 flex items-center gap-2">
            <AlertCircle size={18} /> အော်ဒါ ဖျက်သိမ်းမည်
          </h3>
          <button onClick={onClose} className="bg-slate-100 p-1.5 rounded-full text-slate-500">
            <X size={18} />
          </button>
        </div>
        <div className="p-6">
          <p className="text-slate-600 text-sm mb-4 leading-relaxed">
            <span className="font-bold text-slate-800">{cancelOrderModal.name}</span> ၏ <span className="font-bold">{cancelOrderModal.productName} ({cancelOrderModal.quantity} ခု)</span> အော်ဒါကို ဖျက်သိမ်းရန် သေချာပါသလား?
          </p>
          <div className="bg-amber-50 text-amber-700 p-3 rounded-lg text-xs border border-amber-200 font-medium leading-relaxed">
            ဤလုပ်ဆောင်ချက်သည် အရောင်းမှတ်တမ်းမှ ဖယ်ရှားပြီး ပစ္စည်းအရေအတွက်ကို လက်ကျန်ထဲသို့ အလိုအလျောက် ပြန်လည်ပေါင်းထည့်ပေးမည် ဖြစ်ပါသည်။ ငွေစာရင်းမှလည်း လျှော့ချပေးမည် ဖြစ်ပါသည်။
          </div>
        </div>
        <div className="border-t border-slate-100 p-4 flex gap-3 rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl"
          >
            မဖျက်တော့ပါ
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl flex justify-center items-center gap-2 shadow-lg shadow-red-200"
          >
            <Trash2 size={16} /> ဖျက်သိမ်းမည်
          </button>
        </div>
      </div>
    </div>
  );
};
