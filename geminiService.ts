
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { Goal, UserMetrics, WorkoutPlan, ChatMessage, Macros, FoodNutrition } from "../types";

// Removed redundant process declaration to follow coding guidelines

const SYSTEM_INSTRUCTION = `You are Iron Mind (also known as Coach Abebe), an elite bodybuilding coach and hypertrophy specialist. Your goal is to help the user achieve maximum muscle growth and physical symmetry.
You were created by Yohanes Muluneh. If anyone asks "who created you" or "who is your creator", your answer must be "Yohanes Muluneh".

Your Personality: Motivating, high-intensity, and scientific. Base advice on progressive overload, mechanical tension, and metabolic stress. 
Constraint: Always maintain the persona of an elite trainer. Be no-nonsense but deeply supportive of the user's hard work. Use bodybuilding terminology (e.g., anabolic window, stimulus to fatigue ratio, P.R.).
When asked for plans, ensure they are high-volume and high-intensity.`;

export const generateWorkoutPlan = async (
  frequency: number,
  goal: Goal,
  experienceLevel: string
): Promise<WorkoutPlan> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Generate a detailed hypertrophy-focused workout plan for a user training ${frequency} days per week with a goal of ${goal}. The user is at an ${experienceLevel} level. Include exercises, sets, reps, tempo, and RPE. Ensure the split is logical (e.g., PPL, Arnold, or Upper/Lower).`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "The name of the program" },
          splitType: { type: Type.STRING, description: "Type of split (e.g. PPL)" },
          days: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                dayName: { type: Type.STRING },
                exercises: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      sets: { type: Type.NUMBER },
                      reps: { type: Type.STRING },
                      tempo: { type: Type.STRING },
                      rpe: { type: Type.NUMBER },
                      formCues: { type: Type.ARRAY, items: { type: Type.STRING } }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const chatWithCoach = async (message: string, history: ChatMessage[]): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: { 
      systemInstruction: SYSTEM_INSTRUCTION 
    },
    history: history.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }))
  });

  const response = await chat.sendMessage({ message });
  return response.text || "Coach is recalculating. Stay focused.";
};

export const generateSpeech = async (text: string): Promise<string | undefined> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `Speak in a disciplined, high-intensity coach's voice: ${text}` }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } }
      }
    }
  });
  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
};

export const calculateMacros = async (metrics: UserMetrics): Promise<Macros> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Calculate exact daily macros for: Weight ${metrics.weight}kg, Height ${metrics.height}cm, Age ${metrics.age}, Goal ${metrics.goal}, Activity Level ${metrics.activityLevel}.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          calories: { type: Type.NUMBER },
          protein: { type: Type.NUMBER },
          carbs: { type: Type.NUMBER },
          fats: { type: Type.NUMBER },
          explanation: { type: Type.STRING }
        }
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

export const getFoodNutrition = async (query: string): Promise<FoodNutrition> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze the bodybuilding utility and nutrition for: ${query}`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          foodName: { type: Type.STRING },
          servingSize: { type: Type.STRING },
          calories: { type: Type.NUMBER },
          protein: { type: Type.NUMBER },
          carbs: { type: Type.NUMBER },
          fats: { type: Type.NUMBER },
          grade: { type: Type.STRING, description: "A-F grade for hypertrophy" },
          coachTip: { type: Type.STRING }
        }
      }
    }
  });
  return JSON.parse(response.text || '{}');
};
