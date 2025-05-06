import OpenAI from "openai";

interface WordData {
  definition: string;
}

const AskAi = async (
  word: string | string[],
  ask: string,
  setWordData: (data: WordData) => void,
  abortController: AbortController = new AbortController(),
  TIMEOUT_DURATION: number = 300000
): Promise<void> => {
  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), TIMEOUT_DURATION)
    );

    const response = await Promise.race([
      fetch("/api/askai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: "User will tell you a word and what you should give about it. Your response should be short and clear.",
            },
            {
              role: "user",
              content: `the word is ${word}. ${ask}`,
            },
          ] as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
        }),
        signal: abortController.signal,
      }),
      timeoutPromise,
    ]) as Response;

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    
    // More flexible response handling
    const definition = data.definition || data.response || data.message || data.content;
    
    if (!definition) {
      throw new Error("Invalid response format from server");
    }

    setWordData({ definition: typeof definition === 'string' ? definition : JSON.stringify(definition) });
  } catch (error) {
    if (error instanceof Error && !abortController.signal.aborted) {
      console.error("Failed to load definition:", error.message);
      // Provide fallback data to prevent UI issues
      setWordData({ definition: "Definition not available" });
    }
  }
};

export default AskAi;