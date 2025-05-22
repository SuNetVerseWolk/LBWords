import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
	maxRetries: 10
});

export async function POST(req: Request) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 300000);

  try {
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid JSON format" },
        { status: 400 }
      );
    }

    const { text, term } = requestBody;
    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Invalid text parameter" },
        { status: 400 }
      );
    }
    if (!term || typeof term !== "string" || term.trim().length === 0) {
      return NextResponse.json(
        { error: "Invalid term parameter" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create(
      {
        model: process.env.NEXT_PUBLIC_OPENAI_MODEL || "deepseek/deepseek-chat:free",
        messages: [
          {
            role: "user",
            content: `
						Term: "${term}"
						Text: "${text}"
            Define the following term "${term}" in 1-2 sentences depending on the text so that Russian could get the meaning of the term not exacly of the text.
						You should understand where to use English and where to use Russian to make the definition more clear by sight, shortly don't translate everything into Russian.
            Use simple and casual Russian language and provide context if needed.
						Don't use the term in ur response and don't describe the text.
          `,
          },
        ],
        temperature: 0.7,
      },
      {
        signal: controller.signal,
      }
    );

    clearTimeout(timeout);
    const definition = completion.choices[0].message.content?.trim() || "";
    if (!definition) {
      return NextResponse.json(
        { error: "Failed to generate definition" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      definition,
    });
  } catch (error) {
		clearTimeout(timeout);
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
