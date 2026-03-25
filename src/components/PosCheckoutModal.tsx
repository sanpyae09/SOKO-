import React from 'react';
import { CreditCard as CardIcon, X, User, Truck, MapPin, Navigation, CheckCircle2 } from 'lucide-react';
import { Input } from './Input';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { PaymentAccount } from '@/src/types';

interface PosCheckoutModalProps {
  posTotal: number;
  posTenderedAmount: string;
  setPosTenderedAmount: (val: string) => void;
  sellCustName: string;
  setSellCustName: (val: string) => void;
  sellPhone: string;
  setSellPhone: (val: string) => void;
  sellIsDelivery: boolean;
  setSellIsDelivery: (val: boolean) => void;
  sellCity: string;
  setSellCity: (val: string) => void;
  sellAddress: string;
  setSellAddress: (val: string) => void;
  sellRemark: string;
  setSellRemark: (val: string) => void;
  sellPaymentMethod: string;
  setSellPaymentMethod: (val: string) => void;
  paymentAccounts: PaymentAccount[];
  onClose: () => void;
  onConfirm: () => void;
}

export const PosCheckoutModal: React.FC<PosCheckoutModalProps> = ({
  posTotal,
  posTenderedAmount,
  setPosTenderedAmount,
  sellCustName,
  setSellCustName,
  sellPhone,
  setSellPhone,
  sellIsDelivery,
  setSellIsDelivery,
  sellCity,
  setSellCity,
  sellAddress,
  setSellAddress,
  sellRemark,
  setSellRemark,
  sellPaymentMethod,
  setSellPaymentMethod,
  paymentAccounts,
  onClose,
  onConfirm
}) => {
  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-4 z-[55] animate-in fade-in duration-200">
      <div className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-3xl shrink-0">
          <h3 className="font-black text-lg text-indigo-900 flex items-center gap-2">
            <CardIcon size={20} /> ငွေရှင်းတမ်း (Checkout)
          </h3>
          <button onClick={onClose} className="bg-slate-200 p-1.5 rounded-full text-slate-600 hover:bg-slate-300">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          <div className="text-center bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
            <p className="text-sm font-bold text-indigo-400 mb-1">ကျသင့်ငွေ (Total Due)</p>
            <p className="text-4xl font-black text-indigo-700">{posTotal.toLocaleString()} Ks</p>
          </div>

          <div className="space-y-4 bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">ပေးငွေ (Amount Tendered)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">Ks</span>
                <input
                  type="number"
                  value={posTenderedAmount}
                  onChange={(e) => setPosTenderedAmount(e.target.value)}
                  placeholder="0"
                  className="w-full pl-12 pr-4 py-3 text-xl font-bold bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                />
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              <button onClick={() => setPosTenderedAmount(posTotal.toString())} className="shrink-0 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg border border-slate-200">အပြည့်ပေး</button>
              <button onClick={() => setPosTenderedAmount((Number(posTenderedAmount) || 0) + 1000).toString()} className="shrink-0 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs rounded-lg border border-emerald-200">+ 1,000</button>
              <button onClick={() => setPosTenderedAmount((Number(posTenderedAmount) || 0) + 5000).toString()} className="shrink-0 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs rounded-lg border border-emerald-200">+ 5,000</button>
              <button onClick={() => setPosTenderedAmount((Number(posTenderedAmount) || 0) + 10000).toString()} className="shrink-0 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs rounded-lg border border-emerald-200">+ 10,000</button>
            </div>

            {Number(posTenderedAmount) > posTotal && (
              <div className="flex justify-between items-center bg-rose-50 border border-rose-100 p-3 rounded-xl animate-in zoom-in-95">
                <span className="font-bold text-rose-600">ပြန်အမ်းငွေ (Change)</span>
                <span className="font-black text-xl text-rose-700">{(Number(posTenderedAmount) - posTotal).toLocaleString()} Ks</span>
              </div>
            )}

            <PaymentMethodSelector selected={sellPaymentMethod} onChange={setSellPaymentMethod} accounts={paymentAccounts} />
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-2">
              <User size={16} className="text-indigo-500" /> ဝယ်သူအချက်အလက်များ
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="ဝယ်သူအမည်" value={sellCustName} onChange={(e) => setSellCustName(e.target.value)} placeholder="Customer Name" />
              <Input label="ဖုန်းနံပါတ်" value={sellPhone} onChange={(e) => setSellPhone(e.target.value)} placeholder="Phone Number" />
            </div>

            <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-xl bg-slate-50 cursor-pointer">
              <input type="checkbox" checked={sellIsDelivery} onChange={(e) => setSellIsDelivery(e.target.checked)} className="w-5 h-5 text-indigo-600 rounded" />
              <Truck size={18} className={sellIsDelivery ? "text-indigo-600" : "text-slate-400"} />
              <span className={`font-bold ${sellIsDelivery ? "text-indigo-700" : "text-slate-600"}`}>Delivery ဖြင့် ပို့မည်</span>
            </label>

            {sellIsDelivery && (
              <div className="space-y-4 p-4 border border-indigo-100 bg-indigo-50/30 rounded-xl animate-in fade-in slide-in-from-top-2">
                <Input label="မြို့" icon={MapPin} value={sellCity} onChange={(e) => setSellCity(e.target.value)} required />
                <Input label="လိပ်စာအပြည့်အစုံ" icon={Navigation} value={sellAddress} onChange={(e) => setSellAddress(e.target.value)} required rows={2} />
              </div>
            )}

            <Input label="မှတ်ချက် (Remark)" value={sellRemark} onChange={(e) => setSellRemark(e.target.value)} placeholder="Optional notes..." rows={2} />
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-white rounded-b-3xl shrink-0">
          <button onClick={onConfirm} className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg rounded-xl shadow-lg shadow-emerald-200 flex justify-center items-center gap-2 active:scale-95 transition-all">
            <CheckCircle2 size={22} /> အတည်ပြုမည် (Confirm)
          </button>
        </div>
      </div>
    </div>
  );
};
