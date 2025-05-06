"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import AskAi from '@/services/askAi';
import ReactMarkdown from 'react-markdown';
import SpinerLoading from '@/components/layouts/SpinerLoading';

interface WordAnalysis {
  word: string;
  analysis: string;
}

export default function WordPage() {
  const { word } = useParams();
  const [analysis, setAnalysis] = useState<WordAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!word) return;

    const abortController = new AbortController();

    const fetchAnalysis = async () => {
      try {
        await AskAi(
          word.toString(),
          'Проанализируй это слово/выражение по американскому английскому, следуя подробной схеме',
          (data) => {
            setAnalysis({
              word: word.toString(),
              analysis: data.definition
            });
          },
          abortController
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();

    return () => abortController.abort();
  }, [word]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="c flex-col p-2 max-w-full">
      <h1 className="text-3xl font-bold pb-1 text-center">{analysis?.word}</h1>
      
      {analysis?.analysis ? (
        <div className="prose overflow-y-scroll thin-scrollbar h-full max-w-full">
          <ReactMarkdown>{analysis.analysis}</ReactMarkdown>
        </div>
      ) : (
				<SpinerLoading />
			)}
    </div>
  );
}