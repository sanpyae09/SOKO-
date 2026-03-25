import React from 'react';
import { CheckCircle2, X, Receipt, Download } from 'lucide-react';
import { Record } from '@/src/types';

interface VoucherModalProps {
  voucherData: Record;
  shopName: string;
  shopPhone: string;
  shopAddress: string;
  onClose: () => void;
  onDownload: () => void;
}

export const VoucherModal: React.FC<VoucherModalProps> = ({
  voucherData,
  shopName,
  shopPhone,
  shopAddress,
  onClose,
  onDownload
}) => {
  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-[70] animate-in fade-in zoom-in duration-300">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
          <h3 className="font-bold text-indigo-700 flex items-center gap-2">
            <CheckCircle2 size={18} /> အရောင်းအောင်မြင်ပါသည်
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto">
          <div id="receipt-box" className="p-6 receipt-container mx-auto w-full max-w-[340px] relative bg-white">
            <div className="text-center mb-5">
              <h1 className="text-2xl font-black tracking-wider text-black">{shopName}</h1>
              {shopPhone && <p className="text-xs text-gray-600 mt-1">{shopPhone}</p>}
              {shopAddress && <p className="text-[10px] text-gray-500 mt-0.5 leading-tight px-4">{shopAddress}</p>}
              <p className="text-[11px] text-gray-500 uppercase tracking-widest mt-2 font-bold border-t border-dashed border-gray-300 pt-2">
                Sale Receipt
              </p>
            </div>
            <div className="border-b-2 border-dashed border-slate-300 pb-3 mb-3 text-sm space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Date:</span>
                <span className="font-bold text-black">{voucherData.date}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Order ID:</span>
                <span className="font-mono font-bold text-black">#{voucherData.id.toString().slice(-6)}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-500 font-medium whitespace-nowrap mr-2">Customer:</span>
                <span className="font-bold text-black text-right break-words">{voucherData.name}</span>
              </div>
              {voucherData.customerPhone && (
                <div className="flex justify-between items-start">
                  <span className="text-gray-500 font-medium whitespace-nowrap mr-2">Phone:</span>
                  <span className="font-bold text-black text-right break-words">{voucherData.customerPhone}</span>
                </div>
              )}
            </div>

            <div className="border-b-2 border-dashed border-slate-300 pb-3 mb-4">
              <div className="flex justify-between text-xs font-bold text-black mb-2 uppercase bg-gray-100 p-1.5 rounded">
                <span className="w-1/2 text-left pl-1">Item</span>
                <span className="w-1/4 text-center">Qty</span>
                <span className="w-1/4 text-right pr-1">Amt</span>
              </div>
              {voucherData.cartItems ? voucherData.cartItems.map((item, i) => (
                <div key={i} className="flex justify-between text-sm font-bold text-black items-start px-1 mb-2">
                  <span className="w-1/2 text-left break-words pr-2 leading-tight text-[13px]">{item.name}</span>
                  <span className="w-1/4 text-center">{item.qty}</span>
                  <span className="w-1/4 text-right">{(item.price * item.qty).toLocaleString()}</span>
                </div>
              )) : (
                <div className="flex justify-between text-sm font-bold text-black items-start px-1">
                  <span className="w-1/2 text-left break-words pr-2 leading-tight text-[13px]">{voucherData.productName}</span>
                  <span className="w-1/4 text-center">{voucherData.quantity}</span>
                  <span className="w-1/4 text-right">{voucherData.amount.toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="space-y-2.5 text-sm mb-6 px-1">
              <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                <span className="font-bold text-gray-600">Total Amount</span>
                <span className="font-black text-xl text-black">
                  {voucherData.amount.toLocaleString()} <span className="text-xs font-bold">Ks</span>
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-600 font-medium">
                <span>Paid ({voucherData.paymentMethod})</span>
                <span className="font-bold text-black">{voucherData.received.toLocaleString()} Ks</span>
              </div>
              {voucherData.balance > 0 && (
                <div className="flex justify-between items-center text-red-600 bg-red-50 p-1.5 rounded-md border border-red-100">
                  <span className="font-bold">Balance Due</span>
                  <span className="font-black">{voucherData.balance.toLocaleString()} Ks</span>
                </div>
              )}
              {voucherData.change > 0 && (
                <div className="flex justify-between items-center text-emerald-600 bg-emerald-50 p-1.5 rounded-md border border-emerald-100">
                  <span className="font-bold">Change</span>
                  <span className="font-black">{voucherData.change.toLocaleString()} Ks</span>
                </div>
              )}
            </div>
            <div className="text-center flex flex-col items-center justify-center gap-1.5 mt-2">
              <Receipt size={24} className="text-gray-300" />
              <p className="text-[11px] font-bold text-gray-500">Thank you for shopping with us!</p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 flex gap-3 bg-slate-50 rounded-b-2xl shrink-0">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:bg-slate-50"
          >
            ပိတ်မည်
          </button>
          <button
            onClick={onDownload}
            className="flex-1 py-2.5 bg-indigo-600 text-white font-bold rounded-xl flex justify-center items-center gap-2 shadow-md hover:bg-indigo-700"
          >
            <Download size={16} /> ပုံအဖြစ် သိမ်းမည်
          </button>
        </div>
      </div>
    </div>
  );
};
