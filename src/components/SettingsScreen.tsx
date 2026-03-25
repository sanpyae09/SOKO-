import React from 'react';
import { Store, Save, Smartphone, Trash2, Plus } from 'lucide-react';
import { Input } from './Input';
import { PaymentAccount } from '@/src/types';

interface SettingsScreenProps {
  shopName: string;
  setShopName: (val: string) => void;
  shopPhone: string;
  setShopPhone: (val: string) => void;
  shopAddress: string;
  setShopAddress: (val: string) => void;
  saveShopInfo: (e: React.FormEvent) => void;
  paymentAccounts: PaymentAccount[];
  handleRemovePaymentAccount: (id: number) => void;
  newAccProvider: string;
  setNewAccProvider: (val: string) => void;
  newAccName: string;
  setNewAccName: (val: string) => void;
  newAccNumber: string;
  setNewAccNumber: (val: string) => void;
  handleAddPaymentAccount: (e: React.FormEvent) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  shopName,
  setShopName,
  shopPhone,
  setShopPhone,
  shopAddress,
  setShopAddress,
  saveShopInfo,
  paymentAccounts,
  handleRemovePaymentAccount,
  newAccProvider,
  setNewAccProvider,
  newAccName,
  setNewAccName,
  newAccNumber,
  setNewAccNumber,
  handleAddPaymentAccount
}) => {
  return (
    <div className="animate-in fade-in duration-300 max-w-2xl mx-auto mt-4 space-y-6">
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-md">
        <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 border-l-4 border-indigo-500 pl-3">
          <Store size={20} className="text-indigo-500" /> ဆိုင်အချက်အလက်များ (Shop Info)
        </h2>
        <form onSubmit={saveShopInfo} className="space-y-4">
          <Input label="ဆိုင်အမည် (Shop Name)" value={shopName} onChange={(e) => setShopName(e.target.value)} required placeholder="ဆိုင်အမည် ထည့်ပါ" />
          <Input label="ဖုန်းနံပါတ် (Phone Number)" value={shopPhone} onChange={(e) => setShopPhone(e.target.value)} placeholder="ဆက်သွယ်ရန် ဖုန်းနံပါတ်" />
          <Input label="လိပ်စာ (Address)" value={shopAddress} onChange={(e) => setShopAddress(e.target.value)} placeholder="ဆိုင်လိပ်စာအပြည့်အစုံ" rows={2} />
          <button type="submit" className="w-full py-2.5 bg-indigo-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm hover:bg-indigo-700 transition-colors">
            <Save size={16} /> အချက်အလက်များ သိမ်းမည်
          </button>
        </form>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-md">
        <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 border-l-4 border-indigo-500 pl-3">ငွေပေးချေမှု အကောင့်များ ပြင်ဆင်ရန်</h2>
        <div className="space-y-4 mb-8">
          {paymentAccounts.length === 0 ? (
            <div className="p-4 bg-slate-50 text-slate-500 text-sm rounded-xl text-center border border-slate-200">အကောင့်များ မထည့်ရသေးပါ။ အောက်တွင် ထည့်သွင်းပါ။</div>
          ) : (
            paymentAccounts.map(acc => (
              <div key={acc.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-slate-50">
                <div className="flex items-center gap-3">
                  <Smartphone size={20} className="text-indigo-500" />
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{acc.provider} <span className="text-xs font-normal text-slate-500 ml-1">({acc.name})</span></p>
                    <p className="text-xs font-mono text-slate-600 mt-0.5">{acc.number}</p>
                  </div>
                </div>
                <button onClick={() => handleRemovePaymentAccount(acc.id)} className="text-slate-400 hover:text-red-500 p-2"><Trash2 size={16} /></button>
              </div>
            ))
          )}
        </div>
        <div className="pt-6 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-700 mb-4">အကောင့်အသစ် ထည့်ရန်</h3>
          <form onSubmit={handleAddPaymentAccount} className="space-y-4">
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">ဘဏ် / ငွေလွှဲအမည်</label>
              <select
                value={newAccProvider}
                onChange={(e) => setNewAccProvider(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white font-bold text-slate-700"
              >
                <option value="KBZ Pay">KBZ Pay</option>
                <option value="Wave Money">Wave Money</option>
                <option value="AYA Pay">AYA Pay</option>
                <option value="CB Pay">CB Pay</option>
                <option value="KPay">KPay</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="အကောင့်နာမည်" value={newAccName} onChange={(e) => setNewAccName(e.target.value)} required placeholder="ဥပမာ - U Mya" />
              <Input label="ဖုန်းနံပါတ် / အကောင့်နံပါတ်" value={newAccNumber} onChange={(e) => setNewAccNumber(e.target.value)} required placeholder="09..." />
            </div>
            <button type="submit" className="w-full py-2.5 bg-indigo-50 text-indigo-700 font-bold rounded-xl flex items-center justify-center gap-2 border border-indigo-200 hover:bg-indigo-100 transition-colors">
              <Plus size={16} /> အကောင့်ထည့်မည်
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
