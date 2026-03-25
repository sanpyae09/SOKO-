import React from 'react';
import { Search, ShoppingCart, Minus, Plus, X, ChevronDown, Image as ImageIcon } from 'lucide-react';
import { Product, CartItem } from '@/src/types';
import { cn } from '@/src/lib/utils';

interface PosScreenProps {
  products: Product[];
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  cart: CartItem[];
  addToCart: (p: Product) => void;
  updateCartQty: (id: number, delta: number) => void;
  removeFromCart: (id: number) => void;
  showMobileCart: boolean;
  setShowMobileCart: (val: boolean) => void;
  posTotal: number;
  openPosCheckout: () => void;
  setCart: (val: CartItem[]) => void;
}

export const PosScreen: React.FC<PosScreenProps> = ({
  products,
  searchTerm,
  setSearchTerm,
  cart,
  addToCart,
  updateCartQty,
  removeFromCart,
  showMobileCart,
  setShowMobileCart,
  posTotal,
  openPosCheckout,
  setCart
}) => {
  return (
    <div className="animate-in fade-in duration-300 flex flex-col md:flex-row gap-4 h-[calc(100vh-100px)] max-w-6xl mx-auto relative overflow-hidden">
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 p-3 md:p-4 flex flex-col h-full overflow-hidden">
        <div className="mb-4 relative shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="ပစ္စည်းအမည် ရှာရန်..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pb-24 md:pb-0 content-start">
          {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(p => (
            <div
              key={p.id}
              onClick={() => addToCart(p)}
              className="bg-white rounded-xl p-2 border border-slate-200 shadow-sm cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 active:scale-95 transition-all flex items-center gap-3 relative group h-20"
            >
              {p.stock <= 3 && <span className="absolute -top-1 -right-1 bg-red-500 w-2.5 h-2.5 rounded-full animate-pulse z-10 shadow-sm"></span>}
              {p.image ? (
                <img src={p.image} className="w-14 h-14 object-cover rounded-lg group-hover:opacity-90 transition-opacity shrink-0" />
              ) : (
                <div className="w-14 h-14 bg-slate-100 rounded-lg flex items-center justify-center text-slate-300 shrink-0"><ImageIcon size={20} /></div>
              )}
              <div className="flex-1 min-w-0 text-left flex flex-col justify-center">
                <h3 className="font-bold text-slate-800 text-[13px] truncate" title={p.name}>{p.name}</h3>
                <p className="text-indigo-600 font-black text-sm mt-0.5 leading-none">{p.price.toLocaleString()} <span className="text-[10px] font-normal">Ks</span></p>
                <div className="mt-1"><span className="text-[10px] text-slate-500 font-medium bg-slate-100 px-1.5 py-0.5 rounded">Stock: {p.stock}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className={cn(
        "w-full md:w-[350px] bg-white rounded-t-3xl md:rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] md:shadow-sm border border-slate-100 flex flex-col shrink-0 transition-transform duration-300 z-40",
        showMobileCart ? 'fixed bottom-0 left-0 right-0 h-[85vh] slide-up' : 'hidden md:flex h-full'
      )}>
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 md:bg-white rounded-t-3xl md:rounded-t-2xl shrink-0">
          <h3 className="font-black text-slate-800 flex items-center gap-2 text-lg"><ShoppingCart size={20} className="text-indigo-600" /> ခြင်းတောင်း</h3>
          <div className="flex gap-3 items-center">
             <button onClick={() => { if (window.confirm('ခြင်းတောင်းကို အကုန်ဖျက်မလား?')) setCart([]); }} className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded-md hover:bg-red-100 transition-colors">Clear All</button>
             <button onClick={() => setShowMobileCart(false)} className="md:hidden p-1.5 bg-slate-200 text-slate-600 rounded-full"><ChevronDown size={18} /></button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-slate-50 md:bg-white">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-3">
              <ShoppingCart size={48} className="opacity-20" />
              <span className="text-sm font-medium">ပစ္စည်းမရွေးရသေးပါ</span>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200 shadow-sm relative">
                <button onClick={() => removeFromCart(item.id)} className="absolute -top-1.5 -left-1.5 bg-red-100 text-red-600 rounded-full p-1 border border-white hover:bg-red-200"><X size={12} /></button>
                <div className="min-w-0 flex-1 pl-2 pr-2">
                  <p className="font-bold text-xs text-slate-800 line-clamp-1">{item.name}</p>
                  <p className="text-[11px] text-emerald-600 font-black mt-0.5">{(item.price * item.qty).toLocaleString()} Ks</p>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200 shrink-0">
                  <button onClick={() => updateCartQty(item.id, -1)} className="p-1 bg-white rounded shadow-sm text-slate-600 hover:text-indigo-600 active:scale-95"><Minus size={14} /></button>
                  <span className="text-xs font-bold w-6 text-center">{item.qty}</span>
                  <button onClick={() => updateCartQty(item.id, 1)} className="p-1 bg-white rounded shadow-sm text-slate-600 hover:text-indigo-600 active:scale-95"><Plus size={14} /></button>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="p-4 border-t border-slate-200 bg-white rounded-b-3xl md:rounded-b-2xl shrink-0">
          <div className="flex justify-between items-end mb-4">
            <span className="font-bold text-slate-500 text-sm">စုစုပေါင်း (Total)</span>
            <div className="text-right">
               <span className="text-[10px] text-slate-400 block mb-0.5">{cart.reduce((s, i) => s + i.qty, 0)} Items</span>
               <span className="font-black text-2xl text-indigo-700 leading-none">{posTotal.toLocaleString()} <span className="text-sm">Ks</span></span>
            </div>
          </div>
          <button onClick={openPosCheckout} disabled={cart.length === 0} className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:shadow-none text-white font-bold text-lg rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
            ငွေရှင်းမည် (Pay)
          </button>
        </div>
      </div>
      
      {!showMobileCart && (
        <button onClick={() => setShowMobileCart(true)} className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-3 font-bold z-30 active:scale-95 border-2 border-white/20">
          <div className="relative">
            <ShoppingCart size={20} />
            {cart.length > 0 && <span className="absolute -top-2 -right-3 bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-[18px] text-center">{cart.reduce((s, i) => s + i.qty, 0)}</span>}
          </div>
          <span className="border-l border-white/30 pl-3">{posTotal.toLocaleString()} Ks</span>
        </button>
      )}
    </div>
  );
};
