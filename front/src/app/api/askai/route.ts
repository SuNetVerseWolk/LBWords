import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

const SYSTEM_PROMPT = `You are an expert English language teacher specializing in American English. 
Provide detailed analysis following this exact structure:

### Pronunciation
IPA transcription, dialect differences
### Frequency
1-10 rating
### Word forms
- parts of speech, derivatives, exceptions
### Main meanings
- simple explanation + context examples
### Possible meanings
- additional explanations
### Synonyms/antonyms
- with style notes
### Collocations
- common combinations
### Idioms
- expressions + origins
### Common mistakes
- what learners confuse

### 2. Grammar
#### Rule
how it's formed + exceptions
#### Examples
- 5+ sentences
#### Related rules
- connections to other grammar
#### Frequency
usage notes

### 3. Pronunciation Tips
- how to practice + in fast speech

### Taboos
- Where not to use

### Examples
- Various contexts

### Additional notes
- Anything else important

Respond in Russian, using Markdown formatting.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    const completion = await openai.chat.completions.create({
      model: process.env.NEXT_PUBLIC_OPENAI_MODEL || "deepseek/deepseek-chat:free",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT
        },
        ...messages
      ],
      temperature: 0.7,
    });

    const result = completion.choices[0]?.message?.content;
    
    if (!result) {
      throw new Error("No response from AI");
    }

    return NextResponse.json({
      definition: result,
      fullResponse: completion // Optional: for debugging
    });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}