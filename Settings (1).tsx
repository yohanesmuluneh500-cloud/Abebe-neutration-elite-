
import React from 'react';

interface SettingsProps {
  userName: string;
  setUserName: (name: string) => void;
  onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({ userName, setUserName, onLogout }) => {
  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500 pb-20">
      <div className="glass p-8 rounded-xl border border-zinc-800/50">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h2 className="text-3xl font-oswald font-bold text-white uppercase tracking-tight">ACADEMY SETTINGS</h2>
          </div>
          <button 
            onClick={onLogout}
            className="px-6 py-2 bg-red-900/10 text-red-500 border border-red-900/30 rounded-lg text-[10px] font-bold tracking-widest uppercase hover:bg-red-900/30 transition-all"
          >
            Sign Out
          </button>
        </div>

        <div className="space-y-10">
          <div className="space-y-4">
            <h3 className="text-blue-500/50 font-bold text-xs tracking-[0.2em] uppercase border-b border-zinc-800 pb-2">Warrior Profile</h3>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 block uppercase tracking-widest">Display Name</label>
              <input 
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-white focus:border-blue-600 outline-none transition-all text-lg font-medium"
                placeholder="Enter your name..."
              />
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-800">
            <div className="p-4 bg-blue-600/5 rounded-lg border border-blue-600/20">
              <p className="text-[10px] font-bold text-blue-400 tracking-widest uppercase mb-2">System Attribution</p>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Iron Mind Academy (Abebe AI) developed and forged by Yohanes Muluneh. All training data is synced to the secure academy cloud.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
