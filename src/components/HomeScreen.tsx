import React from 'react';
import { PieChart, TrendingDown, CreditCard, Activity, AlertTriangle } from 'lucide-react';
import { StatCard } from './StatCard';
import { Product, Record as AppRecord } from '@/src/types';

interface HomeScreenProps {
  lowStockProducts: Product[];
  homeFilter: string;
  setHomeFilter: (val: string) => void;
  homeStats: any;
  filterOptions: Record<string, string>;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  lowStockProducts,
  homeFilter,
  setHomeFilter,
  homeStats,
  filterOptions
}) => {
  return (
    <div className="animate-in fade-in duration-300 space-y-6 max-w-4xl mx-auto">
      {lowStockProducts.length > 0 && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl shadow-sm animate-pulse">
          <h3 className="text-red-700 font-bold flex items-center gap-2 mb-2">
            <AlertTriangle size={18} /> လက်ကျန်နည်းနေသော ပစ္စည်းများ
          </h3>
          <ul className="text-sm text-red-600 list-disc pl-5 space-y-1">
            {lowStockProducts.map(p => (
              <li key={p.id}>{p.name} <span className="font-bold">({p.stock} ခု သာကျန်ပါသည်)</span></li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-6 text-white shadow-lg shadow-indigo-200">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <PieChart size={20} className="text-indigo-200" /> ငွေစာရင်းအနှစ်ချုပ်
          </h2>
          <div className="relative">
            <select 
              value={homeFilter} 
              onChange={(e) => setHomeFilter(e.target.value)}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold outline-none appearance-none"
            >
              <option value="weekly" className="text-black">ယခုအပတ်</option>
              <option value="monthly" className="text-black">ယခုလ</option>
              <option value="yearly" className="text-black">ယခုနှစ်</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><p className="text-indigo-100 text-sm mb-1">စုစုပေါင်း ရောင်းအား</p><p className="text-xl md:text-3xl font-bold">{homeStats.sales.toLocaleString()} <span className="text-sm font-medium text-indigo-200">Ks</span></p></div>
          <div><p className="text-indigo-100 text-sm mb-1">ဝင်ငွေ (ရငွေ)</p><p className="text-xl md:text-3xl font-black text-emerald-300">{homeStats.income.toLocaleString()} <span className="text-sm font-medium text-indigo-200">Ks</span></p></div>
          <div className="col-span-2 md:col-span-1 border-t md:border-t-0 md:border-l border-white/20 pt-4 md:pt-0 md:pl-4">
            <p className="text-indigo-100 text-sm mb-1 font-semibold">အမြတ်ငွေ (Profit)</p>
            <p className="text-xl md:text-3xl font-black text-yellow-300">{homeStats.profit.toLocaleString()} <span className="text-sm font-medium text-indigo-200">Ks</span></p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard icon={TrendingDown} title="ထွက်ငွေ (Change/Refund)" val={homeStats.expense} color="rose" filter={filterOptions[homeFilter]} />
        <StatCard icon={CreditCard} title="ရရန်ကျန်ငွေ (Balance)" val={homeStats.balance} color="amber" filter={filterOptions[homeFilter]} />
        <StatCard icon={Activity} title="စုစုပေါင်း အော်ဒါ (Orders)" val={homeStats.orders} color="blue" isCount filter={filterOptions[homeFilter]} />
      </div>
    </div>
  );
};
