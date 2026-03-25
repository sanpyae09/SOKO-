import React from 'react';
import { CreditCard, X, CheckSquare } from 'lucide-react';
import { Input } from './Input';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { Record, PaymentAccount } from '@/src/types';

interface DebtPaymentModalProps {
  debtPaymentRecord: Record;
  debtPaymentDate: string;
  setDebtPaymentDate: (val: string) => void;
  debtPaymentMethod: string;
  setDebtPaymentMethod: (val: string) => void;
  paymentAccounts: PaymentAccount[];
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const DebtPaymentModal: React.FC<DebtPaymentModalProps> = ({
  debtPaymentRecord,
  debtPaymentDate,
  setDebtPaymentDate,
  debtPaymentMethod,
  setDebtPaymentMethod,
  paymentAccounts,
  onClose,
  onSubmit
}) => {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[60] animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl">
        <div className="border-b border-slate-100 px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <h3 className="font-bold text-lg text-rose-600 flex items-center gap-2">
            <CreditCard size={18} /> အကြွေးပေးချေမည်
          </h3>
          <button onClick={onClose} className="bg-slate-100 p-1.5 rounded-full text-slate-500">
            <X size={18} />
          </button>
        </div>
        <div className="p-6">
          <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 mb-5 text-center">
            <p className="text-sm text-rose-600 font-medium mb-1">ဆပ်ရမည့် အကြွေးပမာဏ</p>
            <p className="text-3xl font-black text-rose-700">{debtPaymentRecord.balance.toLocaleString()} Ks</p>
            <p className="text-xs text-rose-500 mt-2 font-medium">({debtPaymentRecord.name} ထံမှ)</p>
          </div>
          <form id="debtForm" onSubmit={onSubmit} className="space-y-5">
            <Input
              label="ပေးချေသည့် နေ့စွဲ"
              type="date"
              value={debtPaymentDate}
              onChange={(e) => setDebtPaymentDate(e.target.value)}
              required
            />
            <PaymentMethodSelector
              selected={debtPaymentMethod}
              onChange={setDebtPaymentMethod}
              accounts={paymentAccounts}
            />
          </form>
        </div>
        <div className="border-t border-slate-100 p-4 flex gap-3 rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="debtForm"
            className="flex-1 py-2.5 bg-emerald-600 text-white font-bold rounded-xl flex justify-center items-center gap-2 shadow-lg shadow-emerald-200"
          >
            <CheckSquare size={16} /> အတည်ပြုမည်
          </button>
        </div>
      </div>
    </div>
  );
};
