import React, { useRef } from 'react';
import { Settings, CheckCircle2, Trash2 } from 'lucide-react';
import { Record } from '@/src/types';

interface RecordTableProps {
  data: Record[];
  onDebtPayment: (record: Record) => void;
  onCancelOrder: (record: Record) => void;
  onDelete: (id: number) => void;
}

export const RecordTable: React.FC<RecordTableProps> = ({ data, onDebtPayment, onCancelOrder, onDelete }) => {
  const tableClickTimer = useRef(0);
  
  const handleRowClick = (r: Record) => {
    const now = new Date().getTime();
    if (now - tableClickTimer.current < 400) {
      onCancelOrder(r);
    }
    tableClickTimer.current = now;
  };

  return (
    <div id="record-table-container" className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-x-auto">
      <table className="w-full text-left border-collapse text-sm min-w-[900px]">
        <thead>
          <tr className="bg-slate-100 text-slate-600 border-b border-slate-200">
            <th className="px-3 py-3 text-center w-12">စဉ်</th>
            <th className="px-3 py-3 whitespace-nowrap">အမည်/Code</th>
            <th className="px-3 py-3 text-right">ကျသင့်ငွေ</th>
            <th className="px-3 py-3 text-right text-emerald-600">ရငွေ (ပေးချေမှု)</th>
            <th className="px-3 py-3 text-right text-rose-500">အကြွေး (ကျန်ငွေ)</th>
            <th className="px-3 py-3 text-right text-purple-600">အမြတ်</th>
            <th className="px-3 py-3 whitespace-nowrap">မှတ်ချက်</th>
            <th className="px-3 py-3 text-center w-12"><Settings size={14} className="mx-auto" /></th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan={8} className="p-8 text-center text-slate-500">မှတ်တမ်းမရှိပါ။</td></tr>
          ) : (
            data.map((r, i) => (
              <tr
                key={r.id}
                onClick={() => handleRowClick(r)}
                className="border-b border-slate-100 hover:bg-indigo-50/50 transition-colors cursor-pointer"
                title="ဖျက်သိမ်းရန် (Cancel) နှစ်ချက်နှိပ်ပါ"
              >
                <td className="px-3 py-3 text-center text-slate-500">{i + 1}</td>
                <td className="px-3 py-3">
                  <p className="font-bold text-slate-800">{r.name}</p>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">{r.date} | {r.code}</p>
                  {r.cartItems && <p className="text-[10px] text-indigo-500 mt-0.5">({r.cartItems.length} items)</p>}
                </td>
                <td className="px-3 py-3 text-right font-medium">{r.amount > 0 ? r.amount.toLocaleString() : '-'}</td>
                <td className="px-3 py-3 text-right">
                  <span className="text-emerald-600 font-bold block">{r.received > 0 ? r.received.toLocaleString() : '-'}</span>
                  {r.received > 0 && (
                    <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded mt-1 inline-block border border-slate-200">
                      {r.paymentMethod || 'Cash'}
                    </span>
                  )}
                </td>
                <td className="px-3 py-3 text-right align-middle">
                  {r.balance > 0 ? (
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="text-rose-600 font-black">{r.balance.toLocaleString()} Ks</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); onDebtPayment(r); }}
                        className="text-[10px] bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold px-2 py-1 rounded-md transition-colors border border-rose-200 shadow-sm"
                      >
                        အကြွေးဆပ်မည်
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-end">
                      <span className="text-emerald-600 font-bold text-xs flex items-center gap-1"><CheckCircle2 size={12} /> အပြည့်ပေးချေပြီး</span>
                      {r.paidDate && <span className="text-[10px] text-slate-400 mt-0.5">{r.paidDate}</span>}
                    </div>
                  )}
                </td>
                <td className="px-3 py-3 text-right text-purple-600 font-bold">{(r.profit || 0) > 0 ? r.profit.toLocaleString() : '-'}</td>
                <td className="px-3 py-3 text-xs text-slate-500 max-w-[120px] truncate">{r.remark || '-'}</td>
                <td className="px-3 py-3 text-center">
                  <button
                    onClick={(e) => { e.stopPropagation(); onDelete(r.id); }}
                    className="text-slate-400 hover:text-red-500 bg-white p-1.5 rounded shadow-sm border border-slate-200"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="p-3 text-xs text-indigo-500 bg-indigo-50 text-center font-semibold border-t border-slate-200">
        💡 အော်ဒါကို Cancel (ဖျက်သိမ်း) လိုပါက စာရင်းပေါ်တွင် နှစ်ချက်မြန်မြန်နှိပ်ပါ (Double Tap)
      </div>
    </div>
  );
};
