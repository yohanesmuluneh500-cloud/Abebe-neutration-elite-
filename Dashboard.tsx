
import React from 'react';
import { Goal, Macros, WorkoutPlan } from '../types';

interface DashboardProps {
  workout: WorkoutPlan | null;
  macros: Macros | null;
  userName: string;
}

const Dashboard: React.FC<DashboardProps> = ({ workout, macros, userName }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-oswald font-bold text-white mb-2 uppercase tracking-tight">WELCOME BACK, {userName.toUpperCase()}</h2>
          <p className="text-blue-200/60">Coach Abebe is ready to push your limits. Consistency is the only path.</p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CURRENT SPLIT CARD */}
        <div className="glass p-8 rounded-xl relative overflow-hidden group border border-zinc-800/50 hover:border-blue-600/30 transition-all duration-500">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg className="w-24 h-24 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M20.57 14.86L22 13.43L20.57 12L17 15.57L8.43 7L12 3.43L10.57 2L9.14 3.43L7.71 2L6.28 3.43L4.86 2L3.43 3.43L2 2L2 3.43L3.43 4.86L2 6.28L3.43 7.71L2 9.14L3.43 10.57L2 12L3.43 13.43L2 14.86L3.43 16.28L2 17.71L3.43 19.14L2 20.57L2 22L3.43 22L4.86 20.57L6.28 22L7.71 20.57L9.14 22L10.57 20.57L12 22L12 20.57L15.57 17L20.57 14.86Z" /></svg>
          </div>
          <h3 className="text-zinc-500 font-bold text-xs tracking-widest mb-1 uppercase">CURRENT TRAINING PROTOCOL</h3>
          <p className="text-3xl font-oswald font-bold text-white uppercase mt-4">{workout?.title || 'No Active Plan'}</p>
          <p className="text-blue-400/60 text-sm mt-2 font-bold tracking-widest uppercase">{workout?.splitType || 'Visit Workouts to forge a new split.'}</p>
          
          <div className="mt-8 flex gap-1">
             <div className="h-1 flex-1 rounded-full bg-blue-600/20"></div>
             <div className="h-1 flex-1 rounded-full bg-blue-600/10"></div>
             <div className="h-1 flex-1 rounded-full bg-blue-600/5"></div>
          </div>
        </div>

        {/* DAILY MACRO TARGETS CARD */}
        <div className="glass p-8 rounded-xl border border-zinc-800/50">
          <h3 className="text-zinc-500 font-bold text-xs tracking-widest mb-6 uppercase">DAILY ANABOLIC TARGETS</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
              <span className="text-zinc-500 text-[10px] font-bold block mb-1 uppercase tracking-widest">CALORIES</span>
              <span className="text-2xl font-oswald font-bold text-white">{macros?.calories || '—'}</span>
            </div>
            <div className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
              <span className="text-blue-400 text-[10px] font-bold block mb-1 uppercase tracking-widest">PROTEIN</span>
              <span className="text-2xl font-oswald font-bold text-white">{macros?.protein || '—'}g</span>
            </div>
            <div className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
              <span className="text-cyan-400 text-[10px] font-bold block mb-1 uppercase tracking-widest">CARBS</span>
              <span className="text-2xl font-oswald font-bold text-white">{macros?.carbs || '—'}g</span>
            </div>
            <div className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
              <span className="text-slate-500 text-[10px] font-bold block mb-1 uppercase tracking-widest">FATS</span>
              <span className="text-2xl font-oswald font-bold text-white">{macros?.fats || '—'}g</span>
            </div>
          </div>
        </div>
      </div>

      <section className="glass p-6 rounded-xl border-l-4 border-blue-600 bg-blue-600/5">
        <h3 className="text-xl font-oswald font-bold text-white mb-2 italic">ABEBE'S DAILY MANTRA</h3>
        <p className="text-blue-100/70 italic leading-relaxed">"The pain of discipline is far less than the pain of regret. Leave your ego at the door, but bring your intensity. Every rep is a transaction with the future version of yourself."</p>
      </section>
    </div>
  );
};

export default Dashboard;
