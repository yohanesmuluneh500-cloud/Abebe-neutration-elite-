
import React from 'react';
import { Macros, WorkoutPlan } from '../types';

interface DashboardProps {
  workout: WorkoutPlan | null;
  macros: Macros | null;
  userName: string;
}

const Dashboard: React.FC<DashboardProps> = ({ workout, macros, userName }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-zinc-900 pb-8">
        <div>
          <span className="text-blue-500 font-bold text-[10px] tracking-[0.4em] uppercase mb-2 block">Academy Terminal</span>
          <h2 className="text-4xl font-oswald font-bold text-white mb-2 uppercase tracking-tight">WELCOME BACK, {userName.toUpperCase()}</h2>
          <p className="text-blue-200/40 text-sm italic font-medium">"Intensity is not a choice, it is a requirement." — Coach Abebe</p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* CURRENT SPLIT CARD */}
        <div className="glass p-8 rounded-2xl relative overflow-hidden group border border-zinc-800/50 hover:border-blue-600/30 transition-all duration-500 bg-gradient-to-br from-blue-900/10 to-transparent">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <svg className="w-32 h-32 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M20.57 14.86L22 13.43L20.57 12L17 15.57L8.43 7L12 3.43L10.57 2L9.14 3.43L7.71 2L6.28 3.43L4.86 2L3.43 3.43L2 2L2 3.43L3.43 4.86L2 6.28L3.43 7.71L2 9.14L3.43 10.57L2 12L3.43 13.43L2 14.86L3.43 16.28L2 17.71L3.43 19.14L2 20.57L2 22L3.43 22L4.86 20.57L6.28 22L7.71 20.57L9.14 22L10.57 20.57L12 22L12 20.57L15.57 17L20.57 14.86Z" /></svg>
          </div>
          <h3 className="text-zinc-500 font-bold text-[10px] tracking-widest mb-1 uppercase">ACTIVE PROTOCOL</h3>
          <p className="text-4xl font-oswald font-bold text-white uppercase mt-4 mb-1">{workout?.title || 'No Active Plan'}</p>
          <p className="text-blue-400 font-bold tracking-[0.2em] text-xs uppercase opacity-60">{workout?.splitType || 'Enter the workout lab to forge iron.'}</p>
          
          <div className="mt-12 flex gap-1.5">
             <div className="h-1.5 flex-1 rounded-full bg-blue-600/40"></div>
             <div className="h-1.5 flex-1 rounded-full bg-blue-600/20"></div>
             <div className="h-1.5 flex-1 rounded-full bg-blue-600/10"></div>
          </div>
        </div>

        {/* DAILY MACRO TARGETS CARD */}
        <div className="glass p-8 rounded-2xl border border-zinc-800/50">
          <h3 className="text-zinc-500 font-bold text-[10px] tracking-widest mb-8 uppercase">ANABOLIC TARGETS</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-zinc-900/50 rounded-xl border border-zinc-800 flex flex-col items-center">
              <span className="text-zinc-500 text-[9px] font-bold block mb-1 uppercase tracking-widest">CALORIES</span>
              <span className="text-3xl font-oswald font-bold text-white">{macros?.calories || '—'}</span>
            </div>
            <div className="p-5 bg-zinc-900/50 rounded-xl border border-zinc-800 flex flex-col items-center">
              <span className="text-blue-500 text-[9px] font-bold block mb-1 uppercase tracking-widest">PROTEIN</span>
              <span className="text-3xl font-oswald font-bold text-white">{macros?.protein || '—'}g</span>
            </div>
            <div className="p-5 bg-zinc-900/50 rounded-xl border border-zinc-800 flex flex-col items-center">
              <span className="text-cyan-400 text-[9px] font-bold block mb-1 uppercase tracking-widest">CARBS</span>
              <span className="text-3xl font-oswald font-bold text-white">{macros?.carbs || '—'}g</span>
            </div>
            <div className="p-5 bg-zinc-900/50 rounded-xl border border-zinc-800 flex flex-col items-center">
              <span className="text-blue-200/30 text-[9px] font-bold block mb-1 uppercase tracking-widest">FATS</span>
              <span className="text-3xl font-oswald font-bold text-white">{macros?.fats || '—'}g</span>
            </div>
          </div>
        </div>
      </div>

      <section className="glass p-8 rounded-2xl border-l-8 border-blue-600 bg-gradient-to-r from-blue-600/5 to-transparent relative group">
        <div className="absolute -left-1 top-0 bottom-0 w-1 bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <h3 className="text-2xl font-oswald font-bold text-white mb-3 italic tracking-tight flex items-center gap-3">
          <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
          ABEBE'S DAILY PROTOCOL
        </h3>
        <p className="text-blue-50/70 italic text-lg leading-relaxed max-w-4xl">
          "The weight room is a laboratory for character. Every session you fail to give 100%, you lose more than just muscle; you lose momentum. Recalibrate your mind and conquer the steel."
        </p>
      </section>
    </div>
  );
};

export default Dashboard;
