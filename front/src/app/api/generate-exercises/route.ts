// src/app/api/generate-exercises/route.ts
import { ExerciseType } from '@/types/exerciseTypes';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
	maxRetries: 10
});

export async function POST(request: Request) {
  try {
    const { words, type, userId } = await request.json();

    const prompt = createPrompt(words, type);
    
    const completion = await openai.chat.completions.create({
      model: process.env.NEXT_PUBLIC_OPENAI_MODEL || "deepseek/deepseek-chat:free",
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const exercises = parseResponse(completion.choices[0].message.content);
    
    return NextResponse.json(exercises, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate exercises' },
      { status: 500 }
    );
  }
}

function createPrompt(words: string[], type: string): string {
  const exerciseTypes = {
    'fill-in-the-blank': `Generate Russian fill-in-the-blank exercises using these words: ${words.join(', ')}. Return ONLY a JSON array with objects containing: question (with ______ placeholder), answer, type. Example: [{"question": "Я ______ домой", "answer": "иду", "type": "fill-in-the-blank"}]`,
		'matching': `Create Russian-to-English matching exercises. Return JSON array with objects containing: 
			question: "Match the Russian words with their English translations", 
			options: array of {"russian": "...", "english": "..."}, 
			answer: correct english translation, 
			type: "matching"`,
    'mixed': `Generate various Russian language exercises (fill-in-the-blank, matching, sentence-completion) using these words: ${words.join(', ')}. Return ONLY a JSON array with exercise objects. Do not include any explanatory text.`
  };

  return `${exerciseTypes[type as keyof ExerciseType] || exerciseTypes.mixed}\n\nImportant: Return ONLY the JSON array with no additional text or formatting.`;
}

// src/app/api/generate-exercises/route.ts
function parseResponse(content: string | null): any[] {
  try {
    if (!content) return [];
    
    // Extract JSON from possible markdown formatting
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
    const jsonString = jsonMatch ? jsonMatch[1] : content;

    // Remove any remaining non-JSON text
    const jsonStart = jsonString.indexOf('[');
    const jsonEnd = jsonString.lastIndexOf(']') + 1;
    const cleanJson = jsonString.slice(jsonStart, jsonEnd);

    return JSON.parse(cleanJson);
  } catch (error) {
    console.error('Parsing error:', error);
    return [];
  }
}