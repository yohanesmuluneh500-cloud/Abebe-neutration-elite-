
import React, { useState } from 'react';
import { calculateMacros, getFoodNutrition } from '../services/geminiService';
import { Goal, Macros as MacroType, UserMetrics } from '../types';

interface NutritionProps {
  macros: MacroType | null;
  setMacros: (m: MacroType) => void;
  metrics: UserMetrics;
  setMetrics: (m: UserMetrics) => void;
}

interface FoodResult {
  foodName: string;
  servingSize: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  grade: string;
  coachTip: string;
}

const NUTRITION_STAPLES = [
  {
    category: "PRIME PROTEINS",
    color: "text-blue-500",
    foods: [
      { name: "Chicken Breast", size: "100g (Cooked)", cal: 165, p: 31, c: 0, f: 3.6 },
      { name: "Egg Whites", size: "100g", cal: 52, p: 11, c: 0.7, f: 0.2 },
      { name: "Whey Isolate", size: "1 Scoop (30g)", cal: 110, p: 25, c: 2, f: 0.5 },
      { name: "Lean Ground Beef (93/7)", size: "100g", cal: 210, p: 26, c: 0, f: 11 },
      { name: "Tilapia / White Fish", size: "100g", cal: 128, p: 26, c: 0, f: 2.7 },
    ]
  },
  {
    category: "COMPLEX CARBS",
    color: "text-cyan-400",
    foods: [
      { name: "White Rice", size: "100g (Cooked)", cal: 130, p: 2.7, c: 28, f: 0.3 },
      { name: "Sweet Potato", size: "100g (Baked)", cal: 90, p: 2, c: 21, f: 0.2 },
      { name: "Oats / Oatmeal", size: "50g (Dry)", cal: 190, p: 7, c: 32, f: 3.5 },
      { name: "Cream of Rice", size: "45g (Dry)", cal: 160, p: 3, c: 36, f: 0 },
      { name: "Quinoa", size: "100g (Cooked)", cal: 120, p: 4.4, c: 21, f: 1.9 },
    ]
  },
  {
    category: "ESSENTIAL FATS",
    color: "text-blue-200/50",
    foods: [
      { name: "Avocado", size: "100g", cal: 160, p: 2, c: 8.5, f: 15 },
      { name: "Almonds", size: "28g (1 oz)", cal: 164, p: 6, c: 6, f: 14 },
      { name: "Whole Egg", size: "1 Large", cal: 72, p: 6.3, c: 0.4, f: 4.8 },
      { name: "Peanut Butter", size: "32g (2 tbsp)", cal: 188, p: 8, c: 6, f: 16 },
      { name: "Olive Oil", size: "1 tbsp (14g)", cal: 119, p: 0, c: 0, f: 14 },
    ]
  }
];

const Macros: React.FC<NutritionProps> = ({ macros, setMacros, metrics, setMetrics }) => {
  const [loading, setLoading] = useState(false);
  const [foodLoading, setFoodLoading] = useState(false);
  const [foodQuery, setFoodQuery] = useState('');
  const [foodResult, setFoodResult] = useState<FoodResult | null>(null);

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
    } catch (error) {
      console.error(error);
      alert('Failed to calculate targets.');
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
    } catch (error) {
      console.error(error);
      alert('Failed to analyze food.');
    } finally {
      setFoodLoading(false);
    }
  };

  return (
    <div className="space-y-12 animate-in slide-in-from-right duration-500 pb-20">
      <div className="glass p-6 rounded-xl border border-zinc-800/50">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
          <h2 className="text-2xl font-oswald font-bold text-white uppercase tracking-tight">MACRO TARGET PROTOCOL</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 block uppercase">Weight (kg)</label>
            <input type="number" value={metrics.weight} onChange={(e) => setMetrics({ ...metrics, weight: Number(e.target.value) })} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:border-blue-600 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 block uppercase">Height (cm)</label>
            <input type="number" value={metrics.height} onChange={(e) => setMetrics({ ...metrics, height: Number(e.target.value) })} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:border-blue-600 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 block uppercase">Goal</label>
            <select value={metrics.goal} onChange={(e) => setMetrics({ ...metrics, goal: e.target.value as Goal })} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:border-blue-600 outline-none">
              <option value={Goal.BULK}>Bulk</option>
              <option value={Goal.CUT}>Cut</option>
              <option value={Goal.MAINTENANCE}>Maintenance</option>
            </select>
          </div>
        </div>
        <button onClick={handleCalc} disabled={loading} className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-800 text-white font-bold rounded-lg transition-all shadow-lg uppercase font-oswald tracking-widest">
          {loading ? 'ANALYZING...' : 'RECALCULATE TARGETS'}
        </button>
      </div>

      {macros && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="glass p-8 rounded-xl flex flex-col items-center justify-center bg-blue-600/5">
            <h3 className="text-blue-400 text-sm font-bold tracking-widest mb-4">DAILY ENERGY BUDGET</h3>
            <div className="text-7xl font-oswald font-bold text-white mb-2">{macros.calories}</div>
            <p className="text-blue-200/40 text-xs font-bold tracking-widest uppercase">KCAL / DAY</p>
          </div>
          <div className="lg:col-span-2 glass p-8 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-8">
             <div className="text-center">
               <span className="block text-4xl font-oswald font-bold text-white">{macros.protein}G</span>
               <span className="text-blue-300/40 text-[10px] font-bold tracking-widest uppercase">PROTEIN</span>
             </div>
             <div className="text-center">
               <span className="block text-4xl font-oswald font-bold text-white">{macros.carbs}G</span>
               <span className="text-blue-300/40 text-[10px] font-bold tracking-widest uppercase">CARBS</span>
             </div>
             <div className="text-center">
               <span className="block text-4xl font-oswald font-bold text-white">{macros.fats}G</span>
               <span className="text-blue-300/40 text-[10px] font-bold tracking-widest uppercase">FATS</span>
             </div>
          </div>
        </div>
      )}

      <div className="glass p-6 rounded-xl border border-zinc-800/50">
        <h2 className="text-2xl font-oswald font-bold text-white uppercase tracking-tight mb-6">AI FOOD ANALYZER</h2>
        <div className="flex gap-3 mb-6">
          <input type="text" value={foodQuery} onChange={(e) => setFoodQuery(e.target.value)} placeholder="e.g., '10oz steak and potatoes'" className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-white focus:border-blue-600 outline-none" />
          <button onClick={handleFoodSearch} disabled={foodLoading} className="px-8 py-4 bg-cyan-600 hover:bg-cyan-700 disabled:bg-zinc-800 text-white font-bold rounded-lg uppercase font-oswald tracking-widest">
            {foodLoading ? '...' : 'ANALYZE'}
          </button>
        </div>
        {foodResult && (
          <div className="p-6 bg-zinc-900/40 rounded-xl border border-zinc-800">
            <p className="text-xl font-oswald font-bold text-white mb-2">{foodResult.foodName} ({foodResult.grade})</p>
            <p className="text-zinc-400 text-sm mb-4">"{foodResult.coachTip}"</p>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center"><span className="block font-bold text-white">{foodResult.calories}</span><span className="text-[10px] text-zinc-500">KCAL</span></div>
              <div className="text-center"><span className="block font-bold text-white">{foodResult.protein}g</span><span className="text-[10px] text-zinc-500">P</span></div>
              <div className="text-center"><span className="block font-bold text-white">{foodResult.carbs}g</span><span className="text-[10px] text-zinc-500">C</span></div>
              <div className="text-center"><span className="block font-bold text-white">{foodResult.fats}g</span><span className="text-[10px] text-zinc-500">F</span></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Macros;
