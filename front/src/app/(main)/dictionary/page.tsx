"use client";
import SpinerLoading from "@/components/layouts/SpinerLoading";
import { UseDictionary } from "@/hooks/useDictionary";
import { words } from "@/types/wordList";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  const {
    useDictionary: { data: words, isLoading },
  } = UseDictionary();

  return (
    <div className="grid grid-rows-12 w-full rounded-3xl max-h-full overflow-hidden">
      <h1 className="text-center text-xl font-bold">
        The Oxford 3000™ by CEFR level
      </h1>
      <h2 className="text-center row-span-2">
        The Oxford 3000 is the list of the 3000 most important words to learn in
        English, <br /> from A1 to B2 level.
      </h2>
      {isLoading ? (
        <SpinerLoading className="relative top-0 left-0 h-full row-span-9" />
      ) : (
        <div className="grid auto-fit-grid gap-1 p-2 pr-0-5 overflow-y-scroll thin-scrollbar rounded-3xl row-span-10">
          {words?.map((word, i) => (
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
