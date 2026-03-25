import React from 'react';
import { Menu, ClipboardList, DownloadCloud, Settings, Home, MonitorPlay, PackagePlus, PackageSearch, Truck, CalendarDays, List, LogOut, X } from 'lucide-react';
import { MenuBtn } from './MenuBtn';
import { cn } from '@/src/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  isInstallable: boolean;
  handleInstallClick: () => void;
  titles: Record<string, string>;
  productsCount: number;
  recordsCount: number;
  deliveryCount: number;
  user: any;
  handleLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  activeScreen,
  setActiveScreen,
  isMenuOpen,
  setIsMenuOpen,
  isInstallable,
  handleInstallClick,
  titles,
  productsCount,
  recordsCount,
  deliveryCount,
  user,
  handleLogout
}) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans py-4 transition-all duration-300 relative select-none pb-10">
      <div className="max-w-6xl mx-auto px-2 md:px-4 transition-all duration-300">
        <header className="flex items-center justify-between mb-4 bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-100 sticky top-2 z-30">
          <div className="flex items-center gap-2 md:gap-3">
            <button onClick={() => setIsMenuOpen(true)} className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 hover:text-indigo-600 rounded-lg transition-colors">
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-100 shadow-sm hidden sm:block">
                <img src="./logo.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <h1 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">SOKO</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isInstallable && (
              <button onClick={handleInstallClick} className="hidden md:flex bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-lg items-center gap-1.5 transition-colors">
                <DownloadCloud size={14} /> Install App
              </button>
            )}
            <div className="text-xs md:text-sm font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 md:px-4 py-1.5 rounded-lg shadow-sm truncate max-w-[150px] md:max-w-xs text-center">
              {titles[activeScreen] || ''}
            </div>
          </div>
        </header>

        {isMenuOpen && <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity" onClick={() => setIsMenuOpen(false)} />}
        <div className={cn(
          "fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col",
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}>
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-indigo-50">
            <div className="flex items-center gap-3 text-indigo-900">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-indigo-200 shadow-sm">
                <img src="./logo.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-lg">SOKO App</span>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
          <div className="p-4 flex-1 space-y-1.5 overflow-y-auto">
            <p className="text-[10px] font-bold text-slate-400 mb-2 px-2 uppercase tracking-wider">ပင်မလုပ်ဆောင်ချက်</p>
            <MenuBtn icon={Home} label="ပင်မစာမျက်နှာ" screen="home" activeScreen={activeScreen} onClick={(s) => { setActiveScreen(s); setIsMenuOpen(false); }} />
            <MenuBtn icon={MonitorPlay} label="POS (လက်လီအရောင်း)" screen="pos" activeScreen={activeScreen} onClick={(s) => { setActiveScreen(s); setIsMenuOpen(false); }} />
            <MenuBtn icon={PackagePlus} label="ပစ္စည်း စာရင်းသွင်းမည်" screen="addProduct" activeScreen={activeScreen} onClick={(s) => { setActiveScreen(s); setIsMenuOpen(false); }} />
            <MenuBtn icon={PackageSearch} label="ကုန်ပစ္စည်း စာရင်း" screen="viewProducts" count={productsCount} activeScreen={activeScreen} onClick={(s) => { setActiveScreen(s); setIsMenuOpen(false); }} />
            <div className="my-4 border-t border-slate-100"></div>
            <p className="text-[10px] font-bold text-slate-400 mb-2 px-2 uppercase tracking-wider">အော်ဒါမှတ်တမ်းများ</p>
            <MenuBtn icon={Truck} label="Delivery စာရင်း" screen="delivery" count={deliveryCount} activeScreen={activeScreen} onClick={(s) => { setActiveScreen(s); setIsMenuOpen(false); }} />
            <MenuBtn icon={CalendarDays} label="နေ့စဉ်အရောင်း" screen="daily" activeScreen={activeScreen} onClick={(s) => { setActiveScreen(s); setIsMenuOpen(false); }} />
            <MenuBtn icon={List} label="မှတ်တမ်းအားလုံး" screen="view" count={recordsCount} activeScreen={activeScreen} onClick={(s) => { setActiveScreen(s); setIsMenuOpen(false); }} />
            <div className="my-4 border-t border-slate-100"></div>
            <MenuBtn icon={Settings} label="ဆက်တင်များ (Settings)" screen="settings" activeScreen={activeScreen} onClick={(s) => { setActiveScreen(s); setIsMenuOpen(false); }} />
            
            {isInstallable && (
              <button onClick={handleInstallClick} className="w-full flex items-center justify-center gap-2 mt-4 py-3 bg-indigo-50 border border-indigo-200 text-indigo-600 font-bold rounded-xl transition-colors text-sm">
                <DownloadCloud size={16} /> ဖုန်းတွင် App အဖြစ်သွင်းမည်
              </button>
            )}
          </div>
          <div className="p-4 border-t border-slate-100 space-y-3 bg-slate-50">
            <div className="flex items-center gap-2 text-xs text-slate-600 font-bold">
              <img src={user?.user_metadata?.avatar_url || ''} className="w-8 h-8 rounded-full bg-white border shadow-sm" onError={(e: any) => e.target.style.display = 'none'} />
              <div className="flex flex-col truncate">
                <span className="truncate">{user?.user_metadata?.full_name || user?.email || 'User'}</span>
                <span className="text-[10px] text-emerald-600">Cloud Sync Active</span>
              </div>
            </div>
            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 font-bold rounded-lg transition-colors text-sm shadow-sm">
              <LogOut size={16} /> ထွက်မည် (Logout)
            </button>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};
