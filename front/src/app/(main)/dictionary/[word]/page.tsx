"use client";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
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
    isLoading: isVocabLoading,
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
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchAnalysis = useCallback(async () => {
    if (!convertedWord) return;

    // Abort previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setLoading(true);
    setError(null);
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
      if (err instanceof Error && err.name === 'AbortError') {
        console.log('Fetch aborted');
      } else {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [convertedWord]);

  useEffect(() => {
    fetchAnalysis();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchAnalysis]);

  if (vocabError) return <div>Error: {vocabError.message}</div>;

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
        <div className="flex items-center gap-2">
          <button
            onClick={fetchAnalysis}
            className="bg-blue-500 text-white px-2 py-1 rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Refreshing...' : analysis ? 'Reload' : 'Refetch'}
          </button>
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
      </div>

      <div className="flex-1 overflow-y-auto thin-scrollbar">
        {error && (
          <div className="text-red-500 p-2">
            Error: {error}
          </div>
        )}
        {loading && !analysis?.analysis && <SpinerLoading className="h-full" />}
        {analysis?.analysis && (
          <div className="prose max-w-none">
            <ReactMarkdown>{analysis.analysis}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}