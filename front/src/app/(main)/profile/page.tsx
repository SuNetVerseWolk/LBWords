"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUserVocab } from "@/hooks/useUsersVocab";
import { useMutation } from "@tanstack/react-query";
import SpinerLoading from "@/components/layouts/SpinerLoading";

type ExerciseType = {
  question: string;
  answer: string;
	sentence: string;
  options?: {russian: string, english: string}[];
  type:
    | "fill-in-the-blank"
    | "matching"
    | "sentence-completion"
    | "definition-match";
};

export default function RepeatPage() {
  const { user } = useAuth();
  const { data: vocabItems } = useUserVocab(user?.id || "");
  const [exercises, setExercises] = useState<ExerciseType[]>([]);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("mixed");

  const generateExercises = useMutation({
    mutationFn: async (vocabList: string[]) => {
      const response = await fetch("/api/generate-exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          words: vocabList,
          type: selectedType,
          userId: user?.id,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate exercises");
      return response.json();
    },
    onSuccess: (data) => {
			console.log(data)
      setExercises(data);
      setCurrentExercise(0);
      setUserAnswer("");
    },
    onError: (error) => {
      console.error("Exercise generation error:", error);
    },
  });

  useEffect(() => {
    if (vocabItems?.length) {
      const words = vocabItems.map((item) => item.term);
      generateExercises.mutate(words);
    }
  }, [vocabItems, selectedType]); // Added selectedType to dependencies

  const handleCheckAnswer = () => {
    if (!userAnswer) return;

    setShowResult(true);
    setTimeout(() => {
      setShowResult(false);
      setCurrentExercise((prev) => (prev + 1) % exercises.length);
      setUserAnswer("");
    }, 2000);
  };

  const getExerciseComponent = () => {
    const exercise = exercises[currentExercise];
    if (!exercise) return null;

    switch (exercise.type) {
      case "fill-in-the-blank":
        return (
          <div className="space-y-4">
            <p
              className="text-xl font-semibold"
              dangerouslySetInnerHTML={{
                __html: exercise.sentence?.replace(
                  "______",
                  "<span class='underline'>__________</span>"
                ),
              }}
            />
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="border-2 p-2 rounded-lg w-full"
              placeholder="Enter your answer"
            />
          </div>
        );

      case "matching":
        return (
          <div className="grid grid-cols-2 gap-4">
            {exercise.options?.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setUserAnswer(option.english)}
                className={`p-2 rounded-lg border ${
                  userAnswer === option.english ? "bg-amber-300" : "bg-white"
                }`}
              >
                <div className="flex justify-between">
                  <span>{option.russian}</span>
                  <span className="ml-2 text-gray-500">→</span>
                  <span>{option.english}</span>
                </div>
              </button>
            ))}
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <p className="text-xl font-semibold">{exercise.question}</p>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="border-2 p-2 rounded-lg w-full"
              placeholder="Your answer..."
            />
          </div>
        );
    }
  };

  if (!vocabItems?.length) {
    return (
      <div className="c text-gray-400 h-full">
        No words to repeat. Add words to your vocabulary first!
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Повторение слов</h1>
        <select
          value={selectedType}
          onChange={(e) => {
            setSelectedType(e.target.value);
            setExercises([]); // Reset exercises when type changes
          }}
          className="p-2 rounded-lg border"
        >
          <option value="mixed">Смешанные</option>
          <option value="fill-in-the-blank">Заполни пропуск</option>
          <option value="matching">Соответствие</option>
          <option value="sentence-completion">Заверши предложение</option>
        </select>
      </div>

      {generateExercises.isPending ? (
        <SpinerLoading />
      ) : exercises.length > 0 ? (
        <div className="flex-1 flex flex-col justify-between">
          <div className="w-full space-y-8">
            {getExerciseComponent()}

            {showResult && (
              <div
                className={`p-4 rounded-lg ${
                  userAnswer === exercises[currentExercise].answer
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {userAnswer === exercises[currentExercise].answer
                  ? "Правильно! 🎉"
                  : `Правильный ответ: ${exercises[currentExercise].answer}`}
              </div>
            )}
          </div>

          <button
            onClick={handleCheckAnswer}
            disabled={!userAnswer}
            className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 disabled:bg-gray-300 transition-colors mt-8"
          >
            Проверить
          </button>
        </div>
      ) : (
        <div className="c text-gray-400 h-full">
          {generateExercises.isError
            ? "Ошибка загрузки упражнений 😢"
            : "Выберите тип упражнений для начала"}
        </div>
      )}
    </div>
  );
}
