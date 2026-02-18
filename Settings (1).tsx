
import React from 'react';

interface SettingsProps {
  userName: string;
  setUserName: (name: string) => void;
  onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({ userName, setUserName, onLogout }) => {
  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500 pb-20">
      <div className="glass p-10 rounded-2xl border border-zinc-800/50 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 opacity-50"></div>
        
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center border border-blue-600/30">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-4xl font-oswald font-bold text-white uppercase tracking-tight">TERMINAL CONFIG</h2>
          </div>
          <button 
            onClick={onLogout}
            className="px-6 py-3 bg-red-900/5 hover:bg-red-900/20 text-red-500 border border-red-900/30 rounded-xl text-[10px] font-bold tracking-[0.2em] uppercase transition-all"
          >
            DISCONNECT SESSION
          </button>
        </div>

        <div className="space-y-12">
          <div className="space-y-6">
            <h3 className="text-blue-500 font-bold text-[10px] tracking-[0.3em] uppercase border-b border-zinc-800/50 pb-3">WARRIOR IDENTITY</h3>
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-zinc-500 block uppercase tracking-widest">DISPLAY NAME</label>
              <input 
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 text-white focus:border-blue-600 outline-none transition-all text-xl font-bold font-oswald tracking-tight"
                placeholder="Name..."
              />
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-800/50">
            <div className="p-6 bg-blue-600/5 rounded-2xl border border-blue-600/20 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <p className="text-[10px] font-bold text-blue-400 tracking-[0.3em] uppercase">SYSTEM ATTRIBUTION</p>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                Iron Mind Academy (Coach Abebe) is a proprietary hypertrophy intelligence system forged and maintained by <span className="text-blue-100">Yohanes Muluneh</span>. All training data and neural logs are synced securely to the academy cloud.
              </p>
              <div className="mt-2 text-[9px] text-zinc-600 font-bold uppercase tracking-widest">Version 2.5.4 Hyper-Drive</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
