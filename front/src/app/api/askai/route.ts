import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  maxRetries: 10
});

const SECTION_PROMPTS: Record<string, string> = {
  pronunciation: `Provide IPA transcription and dialect differences`,
  frequency: `Provide frequency rating (1-10)`,
  wordForms: `List parts of speech, derivatives, and exceptions`,
  mainMeanings: `Explain main meanings with context examples`,
  possibleMeanings: `List possible additional meanings`,
  synonymsAntonyms: `Provide synonyms/antonyms with style notes`,
  collocations: `List common collocations`,
  idioms: `Provide idioms with origins`,
  commonMistakes: `List common learner mistakes`,
  grammarRule: `Explain grammar rules with exceptions`,
  grammarExamples: `Provide 5+ example sentences`,
  relatedRules: `Describe related grammar rules`,
  grammarFrequency: `Provide grammar usage notes`,
  pronunciationTips: `Give pronunciation practice tips`,
  taboos: `List usage taboos`,
  examples: `Provide various context examples`,
  additionalNotes: `Add important additional notes`
};

export async function POST(req: Request) {
  try {
    const { word, section } = (await req.json()) as { word: string; section: string };
    
    if (!SECTION_PROMPTS[section]) {
      return NextResponse.json(
        { error: `Invalid section: ${section}` },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an expert English language teacher. Focus ONLY on:
${SECTION_PROMPTS[section]} for "${word}".
Respond in Russian using Markdown. Be concise.`;

    const completion = await openai.chat.completions.create({
      model: process.env.NEXT_PUBLIC_OPENAI_MODEL || "deepseek/deepseek-chat:free",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Analyze: ${word}` }
      ],
      temperature: 0.7,
      max_tokens: 300
    });

    const result = completion.choices[0]?.message?.content || "";
    return NextResponse.json({ [section]: result });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}