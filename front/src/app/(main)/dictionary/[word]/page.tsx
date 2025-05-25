"use client";
import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import AskAi from "@/services/askAi";
import ReactMarkdown from "react-markdown";
import SpinerLoading from "@/components/layouts/SpinerLoading";
import { BookMark } from "@/components/svgs/BookMark";
import {
  useCreateVocabItem,
  useDeleteVocabItem,
  useUpdateVocabStatus,
  useUserVocab,
  useVocabItemByTerm,
} from "@/hooks/useUsersVocab";
import { useAuth } from "@/hooks/useAuth";
import { word_statuses } from "@/types/dbTypes";

interface WordAnalysis {
  word: string;
  analysis: string;
}

export default function WordPage() {
  const { word } = useParams();
  const [analysis, setAnalysis] = useState<WordAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const {
    data: vocabItem,
    isLoading,
    error: vocabError,
  } = useVocabItemByTerm(word as string, user?.id!);
  const { mutate: deleteMark } = useDeleteVocabItem();
  const { mutate: addMark } = useCreateVocabItem();
  const router = useRouter();
  const convertedWord = useMemo(
    () => word?.toString().replaceAll(".", "").replaceAll("%20", " "),
    [word]
  );
  const { mutate: updateStatus } = useUpdateVocabStatus();

  useEffect(() => {
    if (!convertedWord) return;

    const abortController = new AbortController();

    const fetchAnalysis = async () => {
      try {
        await AskAi(
          convertedWord,
          "Проанализируй это слово/выражение по американскому английскому, следуя подробной схеме",
          (data) => {
            setAnalysis({
              word: convertedWord,
              analysis: data.definition,
            });
          },
          abortController
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();

    return () => abortController.abort();
  }, [convertedWord]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="c flex-col px-2 py-1 w-full">
      <div className="w-full c justify-between pb-1 pr-3">
        <button
          className="bg-black text-white py-0-5 px-2 rounded-xl"
          onClick={() => router.back()}
        >
          &lt;-
        </button>
        <div className="c gap-1 items-stretch relative">
          <h1
            className={`text-3xl font-bold text-center uppercase text-${
              vocabItem?.status == "upto" ? "black" : vocabItem?.status
            }`}
          >
            {convertedWord}
          </h1>
          <select
            name="status"
            id="status"
            className="bg-white text-black rounded px-0-5 absolute inset-0 opacity-0 cursor-pointer"
            value={vocabItem?.status}
            onChange={(e) =>
              updateStatus({
                id: vocabItem?.id!,
                status: e.target.value as word_statuses,
              })
            }
          >
            <option value="unknown" className="bg-unknown text-white">
              Не знаю
            </option>
            <option value="learned" className="bg-learned text-white">
              Знаю
            </option>
            <option value="learning" className="bg-learning text-white">
              Учу
            </option>
            <option value="upto" className="bg-upto text-white">
              В планах
            </option>
          </select>
        </div>
        <div
          className={`p-1 md:p-0-5 rounded cp ${vocabItem ? "bg-gray-600" : ""}`}
          onClick={() =>
            vocabItem
              ? deleteMark(vocabItem?.id!)
              : addMark({
                  user: user?.id,
                  term: convertedWord,
                  status: "upto",
                })
          }
        >
          <BookMark
            className={`w-5 md:w-2 ${
              vocabItem ? "fill-gold" : "fill-black hover:fill-dark-gold"
            }`}
          />
        </div>
      </div>

      {!loading && analysis?.analysis ? (
        <div className="prose overflow-y-scroll thin-scrollbar h-full w-full">
          <ReactMarkdown>{analysis.analysis}</ReactMarkdown>
        </div>
      ) : (
        <SpinerLoading className="relative top-0 left-0 h-full" />
      )}
    </div>
  );
}
