
import React, { useState } from 'react';
import { calculateMacros, getFoodNutrition } from '../services/geminiService';
import { Goal, Macros as MacroType, UserMetrics, FoodNutrition } from '../types';

interface NutritionProps {
  macros: MacroType | null;
  setMacros: (m: MacroType) => void;
  metrics: UserMetrics;
  setMetrics: (m: UserMetrics) => void;
}

const Macros: React.FC<NutritionProps> = ({ macros, setMacros, metrics, setMetrics }) => {
  const [loading, setLoading] = useState(false);
  const [foodLoading, setFoodLoading] = useState(false);
  const [foodQuery, setFoodQuery] = useState('');
  const [foodResult, setFoodResult] = useState<FoodNutrition | null>(null);

  const handleCalc = async () => {
    setLoading(true);
    try {
      const result = await calculateMacros(metrics);
      setMacros({
        calories: result.calories,
        protein: result.protein,
        carbs: result.carbs,
        fats: result.fats,
      });
    } catch (_error) {
      alert('Recalibration failed. Coach is offline.');
    } finally {
      setLoading(false);
    }
  };

  const handleFoodSearch = async () => {
    if (!foodQuery.trim()) return;
    setFoodLoading(true);
    try {
      const result = await getFoodNutrition(foodQuery);
      setFoodResult(result);
    } catch (_error) {
      alert('Analysis failed. Input item not recognized.');
    } finally {
      setFoodLoading(false);
    }
  };

  return (
    <div className="space-y-12 animate-in slide-in-from-right duration-500 pb-20">
      <div className="glass p-8 rounded-2xl border border-zinc-800/50">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-8 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"></div>
          <h2 className="text-3xl font-oswald font-bold text-white uppercase tracking-tight">MACRO PROTOCOL</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 block uppercase tracking-widest">Weight (kg)</label>
            <input type="number" value={metrics.weight} onChange={(e) => setMetrics({ ...metrics, weight: Number(e.target.value) })} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white focus:border-blue-600 outline-none transition-all font-bold" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 block uppercase tracking-widest">Height (cm)</label>
            <input type="number" value={metrics.height} onChange={(e) => setMetrics({ ...metrics, height: Number(e.target.value) })} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white focus:border-blue-600 outline-none transition-all font-bold" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 block uppercase tracking-widest">Training Objective</label>
            <select value={metrics.goal} onChange={(e) => setMetrics({ ...metrics, goal: e.target.value as Goal })} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white focus:border-blue-600 outline-none transition-all font-bold">
              <option value={Goal.BULK}>Mass Phase (Bulk)</option>
              <option value={Goal.CUT}>Fat Loss (Cut)</option>
              <option value={Goal.MAINTENANCE}>Recomp (Maintain)</option>
            </select>
          </div>
        </div>
        <button onClick={handleCalc} disabled={loading} className="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-800 text-white font-bold rounded-xl transition-all shadow-xl font-oswald tracking-[0.2em] uppercase">
          {loading ? 'CALCULATING TARGETS...' : 'SYNC NUTRITION PROTOCOL'}
        </button>
      </div>

      {macros && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 glass p-10 rounded-2xl flex flex-col items-center justify-center bg-blue-600/5 border border-blue-600/20">
            <h3 className="text-blue-400 text-[10px] font-bold tracking-widest mb-4 uppercase">DAILY KCAL BUDGET</h3>
            <div className="text-8xl font-oswald font-bold text-white mb-2 tracking-tighter">{macros.calories}</div>
            <p className="text-blue-200/30 text-[10px] font-bold tracking-widest uppercase">ENERGY / DAY</p>
          </div>
          <div className="lg:col-span-3 glass p-10 rounded-2xl flex flex-col justify-center border border-zinc-800/50">
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
               <div className="flex flex-col items-center group">
                 <div className="w-full bg-zinc-900 h-2 rounded-full mb-4 overflow-hidden">
                    <div className="bg-blue-600 h-full w-[100%] group-hover:bg-blue-400 transition-colors"></div>
                 </div>
                 <span className="block text-5xl font-oswald font-bold text-white group-hover:text-blue-500 transition-colors">{macros.protein}G</span>
                 <span className="text-blue-300/40 text-[10px] font-bold tracking-widest uppercase mt-1">PROTEIN (ANABOLIC)</span>
               </div>
               <div className="flex flex-col items-center group">
                 <div className="w-full bg-zinc-900 h-2 rounded-full mb-4 overflow-hidden">
                    <div className="bg-cyan-500 h-full w-[100%] group-hover:bg-cyan-400 transition-colors"></div>
                 </div>
                 <span className="block text-5xl font-oswald font-bold text-white group-hover:text-cyan-500 transition-colors">{macros.carbs}G</span>
                 <span className="text-blue-300/40 text-[10px] font-bold tracking-widest uppercase mt-1">CARBS (FUEL)</span>
               </div>
               <div className="flex flex-col items-center group">
                 <div className="w-full bg-zinc-900 h-2 rounded-full mb-4 overflow-hidden">
                    <div className="bg-blue-200/20 h-full w-[100%] group-hover:bg-blue-200/40 transition-colors"></div>
                 </div>
                 <span className="block text-5xl font-oswald font-bold text-white group-hover:text-blue-200 transition-colors">{macros.fats}G</span>
                 <span className="text-blue-300/40 text-[10px] font-bold tracking-widest uppercase mt-1">FATS (HORMONES)</span>
               </div>
             </div>
          </div>
        </div>
      )}

      <div className="glass p-8 rounded-2xl border border-zinc-800/50">
        <div className="flex items-center gap-3 mb-8">
           <div className="w-2 h-8 bg-cyan-600 rounded-full shadow-[0_0_15px_rgba(8,145,178,0.4)]"></div>
           <h2 className="text-3xl font-oswald font-bold text-white uppercase tracking-tight">AI NUTRITION LAB</h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input 
            type="text" 
            value={foodQuery} 
            onChange={(e) => setFoodQuery(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && handleFoodSearch()}
            placeholder="e.g., 'Double bacon cheeseburger with fries' or '200g Grilled Salmon'" 
            className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 text-white focus:border-cyan-600 outline-none transition-all font-bold" 
          />
          <button onClick={handleFoodSearch} disabled={foodLoading} className="px-10 py-5 bg-cyan-600 hover:bg-cyan-700 disabled:bg-zinc-800 text-white font-bold rounded-xl uppercase font-oswald tracking-[0.2em] shadow-lg shadow-cyan-900/20">
            {foodLoading ? 'ANALYZING...' : 'RUN ANALYSIS'}
          </button>
        </div>
        {foodResult && (
          <div className="p-8 bg-zinc-900/40 rounded-2xl border border-zinc-800 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${
                    foodResult.grade.includes('A') ? 'bg-green-600/20 text-green-500 border border-green-600/30' : 
                    foodResult.grade.includes('B') ? 'bg-blue-600/20 text-blue-500 border border-blue-600/30' : 
                    'bg-orange-600/20 text-orange-500 border border-orange-600/30'
                  }`}>
                    GRADE: {foodResult.grade}
                  </span>
                  <span className="text-zinc-500 text-[10px] font-bold tracking-widest uppercase">Serving: {foodResult.servingSize}</span>
                </div>
                <p className="text-3xl font-oswald font-bold text-white uppercase">{foodResult.foodName}</p>
              </div>
              <div className="grid grid-cols-4 gap-6 bg-black/40 p-6 rounded-2xl border border-zinc-800/50 flex-1 md:flex-none">
                <div className="text-center">
                   <span className="block text-2xl font-oswald font-bold text-white">{foodResult.calories}</span>
                   <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">KCAL</span>
                </div>
                <div className="text-center">
                   <span className="block text-2xl font-oswald font-bold text-blue-500">{foodResult.protein}g</span>
                   <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">PRO</span>
                </div>
                <div className="text-center">
                   <span className="block text-2xl font-oswald font-bold text-cyan-500">{foodResult.carbs}g</span>
                   <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">CARB</span>
                </div>
                <div className="text-center">
                   <span className="block text-2xl font-oswald font-bold text-blue-200/50">{foodResult.fats}g</span>
                   <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">FAT</span>
                </div>
              </div>
            </div>
            <div className="p-6 glass border-l-4 border-l-cyan-600 bg-cyan-600/5 italic">
              <h5 className="text-[10px] font-bold text-zinc-500 tracking-[0.3em] uppercase mb-2">COACH'S VERDICT</h5>
              <p className="text-blue-100 text-lg leading-relaxed">"{foodResult.coachTip}"</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Macros;
