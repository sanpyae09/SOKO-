import React from 'react';
import { AlertCircle, Image as ImageIcon, Edit3, Trash2 } from 'lucide-react';
import { Product } from '@/src/types';
import { cn } from '@/src/lib/utils';

interface ViewProductsScreenProps {
  products: Product[];
  handleProductClick: (p: Product) => void;
  setEditingProduct: (p: Product) => void;
  onDelete: (id: number) => void;
}

export const ViewProductsScreen: React.FC<ViewProductsScreenProps> = ({
  products,
  handleProductClick,
  setEditingProduct,
  onDelete
}) => {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-4 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <div className="text-xs text-indigo-600 font-bold flex items-center gap-1">
          <AlertCircle size={14} /> ရောင်းရန် ပစ္စည်းပေါ်တွင် နှစ်ချက် (Double Tap) နှိပ်ပါ
        </div>
        <div className="text-xs text-slate-500 font-medium">စုစုပေါင်း ပစ္စည်းအမျိုးအစား - {products.length}</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length === 0 ? (
          <div className="col-span-full p-10 text-center text-slate-500 bg-white rounded-xl shadow-sm border border-slate-100">ကုန်ပစ္စည်းများ မရှိသေးပါ။</div>
        ) : (
          products.map(p => (
            <div
              key={p.id}
              onClick={() => handleProductClick(p)}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex gap-4 cursor-pointer hover:shadow-md hover:border-indigo-200 transition-all active:scale-95 duration-200 select-none relative"
            >
              {p.stock <= 3 && <div className="absolute -top-2 -left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm animate-pulse">Low Stock</div>}
              {p.image ? (
                <img src={p.image} className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-xl border border-slate-200 shrink-0" />
              ) : (
                <div className="w-24 h-24 md:w-28 md:h-28 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 shrink-0"><ImageIcon size={32} /></div>
              )}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-extrabold text-slate-800 text-base md:text-lg truncate pr-2" title={p.name}>{p.name}</h3>
                    <div className="flex gap-1 shrink-0">
                      <button onClick={(e) => { e.stopPropagation(); setEditingProduct(p); }} className="text-slate-400 hover:text-blue-500 bg-slate-50 p-1.5 rounded-md"><Edit3 size={14} /></button>
                      <button onClick={(e) => { e.stopPropagation(); onDelete(p.id); }} className="text-slate-400 hover:text-red-500 bg-slate-50 p-1.5 rounded-md"><Trash2 size={14} /></button>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 font-mono mb-1">{p.code}</p>
                </div>
                <div className="flex justify-between items-end mt-2">
                  <div>
                    <p className="text-[10px] text-slate-400 line-through mb-0.5">အရင်း: {p.cost ? p.cost.toLocaleString() : 0} Ks</p>
                    <p className="font-black text-emerald-600 text-lg md:text-xl">{p.price.toLocaleString()} Ks</p>
                  </div>
                  <span className={cn(
                    "px-3 py-1 rounded-md text-xs font-bold",
                    p.stock > 3 ? 'bg-indigo-50 text-indigo-700' : 'bg-red-50 text-red-600'
                  )}>Stock: {p.stock}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
