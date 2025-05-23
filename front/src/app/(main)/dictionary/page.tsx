"use client";
import SpinerLoading from "@/components/layouts/SpinerLoading";
import { UseDictionary } from "@/hooks/useDictionary";
import { words } from "@/types/wordList";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const router = useRouter();
  const {
    useDictionary: { data: words, isLoading },
  } = UseDictionary();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  const toggleLevel = (level: string) => {
    setSelectedLevels(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const filteredWords = words?.filter(word => {
    const matchesSearch = word.word.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(word.level);
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="flex flex-col w-full rounded-3xl h-full overflow-hidden">
      <h1 className="text-center text-xl font-bold">
        The Oxford 3000™ by CEFR level
      </h1>
      <div className="flex flex-col items-center gap-0-5">
        <h2 className="text-center">
          The Oxford 3000 is the list of the 3000 most important words to learn in
          English, <br /> from A1 to B2 level.
        </h2>
        <div className="flex w-full gap-2">
          <input
            type="text"
            placeholder="Search words..."
            className="w-full p-0-5 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex gap-1 justify-center">
            {['A1', 'A2', 'B1', 'B2'].map(level => (
              <button
                key={level}
                onClick={() => toggleLevel(level)}
                className={`px-2 py-0-5 rounded-full text-sm font-semibold transition-colors ${
                  selectedLevels.includes(level)
                    ? 'bg-amber-300 text-gray-800'
                    : 'bg-amber-100 text-gray-600 hover:bg-amber-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>
      {isLoading ? (
        <SpinerLoading className="relative top-0 left-0 h-full" />
      ) : (
        <div className="grid auto-fit-grid gap-1 p-2 pr-0-5 overflow-y-scroll thin-scrollbar rounded-3xl">
          {filteredWords?.map((word) => (
            <div
              key={word.id}
              className={`c bg-amber-50 aspect-video font-sans rounded-2xl cp relative`}
              onClick={() => router.push(`dictionary/${word.word}`)}
            >
              <span className="absolute text-gray-600 top-0-5 left-0-5 bg-amber-100 p-0-5 rounded-full text-xs font-bold -translate-1/2">
                {word.level}
              </span>
              <p>{word.word}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default page;