import React from 'react';
import { CalendarDays, Search, FileText } from 'lucide-react';
import { RecordTable } from '@/src/components/RecordTable';
import { Record as AppRecord } from '@/src/types';

interface RecordsScreenProps {
  activeScreen: string;
  dailyDate: string;
  setDailyDate: (val: string) => void;
  homeFilter: string;
  setHomeFilter: (val: string) => void;
  filterOptions: Record<string, string>;
  generatePDF: () => void;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  data: AppRecord[];
  onDebtPayment: (record: AppRecord) => void;
  onCancelOrder: (record: AppRecord) => void;
  onDelete: (id: number) => void;
}

export const RecordsScreen: React.FC<RecordsScreenProps> = ({
  activeScreen,
  dailyDate,
  setDailyDate,
  homeFilter,
  setHomeFilter,
  filterOptions,
  generatePDF,
  searchTerm,
  setSearchTerm,
  data,
  onDebtPayment,
  onCancelOrder,
  onDelete
}) => {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          {activeScreen === 'daily' ? (
            <>
              <CalendarDays className="text-indigo-500" size={20} />
              <h2 className="font-bold text-slate-800 mr-2">နေ့စဉ်အရောင်း</h2>
              <input
                type="date"
                value={dailyDate}
                onChange={(e) => setDailyDate(e.target.value)}
                className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg outline-none bg-slate-50 font-bold text-indigo-700"
              />
            </>
          ) : (
            <>
              <select
                value={homeFilter}
                onChange={(e) => setHomeFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-sm font-bold outline-none"
              >
                <option value="weekly">ယခုအပတ်</option>
                <option value="monthly">ယခုလ</option>
                <option value="yearly">ယခုနှစ်</option>
                <option value="all">အားလုံး</option>
              </select>
              <button
                onClick={generatePDF}
                className="bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2 border border-rose-200 transition-colors ml-auto md:ml-0 shadow-sm"
              >
                <FileText size={16} /> PDF ထုတ်မည်
              </button>
            </>
          )}
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="ရှာဖွေရန် (အမည်, Code...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-lg outline-none bg-slate-50"
          />
        </div>
      </div>
      <RecordTable 
        data={data} 
        onDebtPayment={onDebtPayment} 
        onCancelOrder={onCancelOrder} 
        onDelete={onDelete}
      />
    </div>
  );
};
