"use client";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
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
import axios from "axios";

const ANALYSIS_SECTIONS = [
  'pronunciation',
  'frequency',
  'wordForms',
  'mainMeanings',
  'possibleMeanings',
  'synonymsAntonyms',
  'collocations',
  'idioms',
  'commonMistakes',
  'grammarRule',
  'grammarExamples',
  'relatedRules',
  'grammarFrequency',
  'pronunciationTips',
  'taboos',
  'examples',
  'additionalNotes',
] as const;

type AnalysisSection = typeof ANALYSIS_SECTIONS[number];
type AnalysisData = Partial<Record<AnalysisSection, string>>;

export default function WordPage() {
  const { word } = useParams();
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
	const [analysis, setAnalysis] = useState<AnalysisData>({});
  const [completedSections, setCompletedSections] = useState(0);
  const totalSections = ANALYSIS_SECTIONS.length;

  const fetchAnalysis = useCallback(async () => {
    if (!convertedWord) return;

    // Abort previous requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setLoading(true);
    setError(null);
    setAnalysis({});
    setCompletedSections(0);

    try {
      const requests = ANALYSIS_SECTIONS.map(section => 
        axios.post<Record<AnalysisSection, string>>('/api/askai', {
          word: convertedWord,
          section
        }, {
          signal: abortController.signal
        })
      );

      const responses = await Promise.allSettled(requests);
      
      const newAnalysis: AnalysisData = {};
      responses.forEach((response, index) => {
        const section = ANALYSIS_SECTIONS[index];
        if (response.status === 'fulfilled') {
          newAnalysis[section] = response.value.data[section];
        } else {
          newAnalysis[section] = `**Error loading section**: ${response.reason instanceof Error ? response.reason.message : 'Unknown error'}`;
        }
        setCompletedSections(prev => prev + 1);
      });
      
      setAnalysis(newAnalysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [convertedWord]);

	const formatSectionTitle = (section: string) => {
    return section
      .replace(/([A-Z])/g, ' $1')
      .replace(/\b\w/g, l => l.toUpperCase());
  };

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
            className={`text-3xl font-bold text-center uppercase text-${vocabItem?.status}`}
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
            {loading ? "Refreshing..." : analysis ? "Reload" : "Refetch"}
          </button>
          <div
            className={`p-1 md:p-0-5 rounded cp ${
              vocabItem ? "bg-gray-600" : ""
            }`}
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
        {error && <div className="text-red-500 p-2">Error: {error}</div>}
        
        {loading && (
          <div className="c flex-col items-center p-4">
            <SpinerLoading />
            <p className="mt-2">
              Loading... ({completedSections}/{totalSections} sections)
            </p>
          </div>
        )}

        {!loading && Object.keys(analysis).length > 0 && (
          <div className="prose max-w-none">
            {ANALYSIS_SECTIONS.map(section => (
              analysis[section] && (
                <div key={section} className="mb-6">
                  <h2 className="text-xl font-bold capitalize border-b pb-1">
                    {formatSectionTitle(section)}
                  </h2>
                  <ReactMarkdown>{analysis[section]!}</ReactMarkdown>
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
