import React from 'react';
import { ClipboardList, DownloadCloud } from 'lucide-react';

interface LoginProps {
  handleGoogleLogin: () => void;
  isInstallable: boolean;
  handleInstallClick: () => void;
}

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
      <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
      <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
      <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
      <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 41.939 C -8.804 39.869 -11.514 38.739 -14.754 38.739 C -19.444 38.739 -23.494 41.439 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
    </g>
  </svg>
);

export const Login: React.FC<LoginProps> = ({ handleGoogleLogin, isInstallable, handleInstallClick }) => {
  return (
    <div className="min-h-[90vh] bg-slate-50 flex flex-col items-center pt-8 md:pt-12 p-4">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-full shadow-lg shadow-emerald-200 mb-10 mt-[-2vh] flex items-center gap-3">
        <span className="text-2xl">🌿</span> 
        <span className="font-black tracking-wide text-sm md:text-base">ပြည်တွင်းဖြစ်ကို အားပေးပါ</span> 
        <span className="text-2xl">🌿</span>
      </div>

      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl max-w-sm w-full text-center space-y-8 border border-slate-100 relative overflow-hidden animate-in fade-in zoom-in duration-500">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-50 rounded-full blur-2xl opacity-70"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-50 rounded-full blur-2xl opacity-70"></div>
        <div className="relative z-10">
          <div className="bg-white w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg overflow-hidden border border-slate-100">
            <img src="./logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">SOKO App</h1>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed font-medium">အရောင်းနှင့် မှတ်တမ်းစီမံခန့်ခွဲမှုစနစ်</p>
        </div>
        
        <div className="space-y-4 relative z-10">
          <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-100 hover:bg-slate-50 hover:border-slate-200 text-slate-700 font-bold py-3.5 rounded-2xl transition-all shadow-sm">
            <GoogleIcon /> Google ဖြင့် ဝင်ရောက်မည်
          </button>
          {isInstallable && (
            <button onClick={handleInstallClick} className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-2xl transition-all shadow-md shadow-indigo-200 mt-4">
              <DownloadCloud size={18} /> App အဖြစ် Install လုပ်မည်
            </button>
          )}
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed font-medium relative z-10 border-t border-slate-100 pt-6 mt-4">လုံခြုံစိတ်ချရသော Cloud စနစ်ဖြင့် သင့်ဒေတာများကို သိမ်းဆည်းပေးပါသည်။</p>
      </div>
    </div>
  );
};
