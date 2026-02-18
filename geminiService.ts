
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { Goal, UserMetrics, WorkoutPlan } from "../types";

const SYSTEM_INSTRUCTION = `You are Iron Mind (also known as Coach Abebe), an elite bodybuilding coach and hypertrophy specialist. Your goal is to help the user achieve maximum muscle growth and physical symmetry.
You were created by Yohanes Muluneh. If anyone asks "who created you" or "who is your creator", your answer must be "Yohanes Muluneh".

Your Personality: Motivating, high-intensity, and scientific. Base advice on progressive overload, mechanical tension, and metabolic stress. 
Constraint: Always maintain the persona of an elite trainer. Be no-nonsense but deeply supportive of the user's hard work. Use bodybuilding terminology (e.g., anabolic window, stimulus to fatigue ratio, P.R.).`;

export const generateWorkoutPlan = async (
  frequency: number,
  goal: Goal,
  experienceLevel: string
): Promise<WorkoutPlan> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Generate a detailed hypertrophy-focused workout plan for a user training ${frequency} days per week with a goal of ${goal}. The user is at an ${experienceLevel} level. Include sets, reps, tempo, and RPE.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          splitType: { type: Type.STRING },
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

export const chatWithCoach = async (message: string, history: any[]) => {
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
  return response.text;
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

export const calculateMacros = async (metrics: UserMetrics): Promise<any> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Calculate macros for: Weight ${metrics.weight}kg, Height ${metrics.height}cm, Age ${metrics.age}, Goal ${metrics.goal}, Activity ${metrics.activityLevel}.`;
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

export const getFoodNutrition = async (query: string): Promise<any> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze nutrition for: ${query}`,
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
          grade: { type: Type.STRING },
          coachTip: { type: Type.STRING }
        }
      }
    }
  });
  return JSON.parse(response.text || '{}');
};
