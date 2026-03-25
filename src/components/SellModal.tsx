import React from 'react';
import { ShoppingCart, X, Truck, Phone, MapPin, Navigation, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { Input } from './Input';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { Product, PaymentAccount } from '@/src/types';

interface SellModalProps {
  product: Product;
  sellQty: number;
  setSellQty: (val: number) => void;
  sellCustName: string;
  setSellCustName: (val: string) => void;
  sellReceived: string;
  setSellReceived: (val: string) => void;
  sellPaymentMethod: string;
  setSellPaymentMethod: (val: string) => void;
  sellIsDelivery: boolean;
  setSellIsDelivery: (val: boolean) => void;
  sellPhone: string;
  setSellPhone: (val: string) => void;
  sellCity: string;
  setSellCity: (val: string) => void;
  sellAddress: string;
  setSellAddress: (val: string) => void;
  sellRemark: string;
  setSellRemark: (val: string) => void;
  paymentAccounts: PaymentAccount[];
  onClose: () => void;
  onConfirm: (e: React.FormEvent) => void;
}

export const SellModal: React.FC<SellModalProps> = ({
  product,
  sellQty,
  setSellQty,
  sellCustName,
  setSellCustName,
  sellReceived,
  setSellReceived,
  sellPaymentMethod,
  setSellPaymentMethod,
  sellIsDelivery,
  setSellIsDelivery,
  sellPhone,
  setSellPhone,
  sellCity,
  setSellCity,
  sellAddress,
  setSellAddress,
  sellRemark,
  setSellRemark,
  paymentAccounts,
  onClose,
  onConfirm
}) => {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex justify-between items-center rounded-t-3xl z-10 shrink-0">
          <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
            <ShoppingCart size={20} className="text-indigo-600" /> ရောင်းမည်
          </h3>
          <button onClick={onClose} className="bg-slate-100 p-1.5 rounded-full text-slate-500 hover:bg-slate-200">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="flex gap-4 mb-6 bg-slate-50 p-3 rounded-xl border border-slate-100">
            {product.image ? (
              <img src={product.image} className="w-14 h-14 rounded-lg object-cover" />
            ) : (
              <div className="w-14 h-14 bg-slate-200 rounded-lg flex items-center justify-center">
                <ImageIcon size={20} className="text-slate-400" />
              </div>
            )}
            <div>
              <p className="font-bold text-slate-800">{product.name} <span className="text-xs font-mono text-slate-500">({product.code})</span></p>
              <p className="text-emerald-600 font-bold text-sm">{product.price.toLocaleString()} Ks</p>
              <p className="text-xs text-slate-500 mt-1">လက်ကျန်: <span className="font-bold text-indigo-600">{product.stock}</span> ခု</p>
            </div>
          </div>

          <form id="sellForm" onSubmit={onConfirm} className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Input label="ဝယ်သူအမည်" value={sellCustName} onChange={(e) => setSellCustName(e.target.value)} required />
              </div>
              <div className="w-1/3">
                <Input label="အရေအတွက်" type="number" value={sellQty} onChange={(e) => setSellQty(Number(e.target.value))} required min={1} max={product.stock} />
              </div>
            </div>
            <Input label="ပေးငွေ / ရငွေ (Ks)" type="number" value={sellReceived} onChange={(e) => setSellReceived(e.target.value)} placeholder="အပြည့်ပေးလျှင် မထည့်လည်းရသည် (အကြွေးအတွက် 0 ထားပါ)" />
            <PaymentMethodSelector selected={sellPaymentMethod} onChange={setSellPaymentMethod} accounts={paymentAccounts} />
            
            <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-xl bg-slate-50 cursor-pointer">
              <input type="checkbox" checked={sellIsDelivery} onChange={(e) => setSellIsDelivery(e.target.checked)} className="w-5 h-5 text-indigo-600 rounded" />
              <Truck size={18} className={sellIsDelivery ? "text-indigo-600" : "text-slate-400"} />
              <span className={`font-bold ${sellIsDelivery ? "text-indigo-700" : "text-slate-600"}`}>Delivery ဖြင့် ပို့မည်</span>
            </label>

            {sellIsDelivery && (
              <div className="space-y-4 p-4 border border-indigo-100 bg-indigo-50/30 rounded-xl animate-in fade-in slide-in-from-top-2">
                <Input label="ဖုန်းနံပါတ်" icon={Phone} value={sellPhone} onChange={(e) => setSellPhone(e.target.value)} required />
                <Input label="မြို့" icon={MapPin} value={sellCity} onChange={(e) => setSellCity(e.target.value)} required />
                <Input label="လိပ်စာအပြည့်အစုံ" icon={Navigation} value={sellAddress} onChange={(e) => setSellAddress(e.target.value)} required rows={2} />
              </div>
            )}
            <Input label="မှတ်ချက် (Optional)" value={sellRemark} onChange={(e) => setSellRemark(e.target.value)} />
          </form>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-slate-100 p-4 flex gap-3 rounded-b-3xl shrink-0">
          <button type="button" onClick={onClose} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
          <button type="submit" form="sellForm" className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl flex justify-center items-center gap-2 shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors">
            <CheckCircle2 size={18} /> အတည်ပြုမည်
          </button>
        </div>
      </div>
    </div>
  );
};
