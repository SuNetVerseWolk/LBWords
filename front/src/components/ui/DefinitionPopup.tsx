import { useState, useEffect, useMemo } from "react";
import { BookMark } from "../svgs/BookMark";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import {
  useCreateVocabItem,
  useDeleteVocabItem,
  useUserVocab,
	useVocabItemByTerm,
} from "@/hooks/useUsersVocab";

interface DefinitionPopupProps {
  text: string;
  selectedText: string;
  position: { top: number; left: number };
  onClose: () => void;
}

export default function DefinitionPopup({
  text,
  selectedText,
  position,
  onClose,
}: DefinitionPopupProps) {
  selectedText = useMemo(
    () => selectedText.replaceAll(".", "").trim().toLocaleLowerCase(),
    [selectedText]
  );
  const [definition, setDefinition] = useState<string>("Loading...");
  const [isError, setIsError] = useState(false);
  const { user } = useAuth();
  const { data: vocabItem, isLoading, error } = useVocabItemByTerm(selectedText, user?.id!);
  const { mutate: addMark } = useCreateVocabItem();
  const { mutate: deleteMark } = useDeleteVocabItem();

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user) {
      return;
    }

    try {
      if (vocabItem) {
        deleteMark(vocabItem?.id!);
      } else {
        addMark({
          user: user.id,
          term: selectedText,
          status: "upto",
        });
      }
    } catch (error) {
      console.error("Failed to bookmark word:", error);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const TIMEOUT_DURATION = 300000;

    const fetchData = async () => {
      try {
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("Request timed out after 300 seconds")),
            TIMEOUT_DURATION
          )
        );

        const response = (await Promise.race([
          fetch("/api/define", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: text, term: selectedText }),
            signal: abortController.signal,
          }),
          timeoutPromise,
        ])) as Response;

        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        if (!data?.definition || typeof data.definition !== "string") {
          throw new Error("Invalid response format from server");
        }

        setDefinition(data.definition);
        setIsError(false);
      } catch (error) {
        if (!abortController.signal.aborted) {
          setIsError(true);
          setDefinition(
            error instanceof Error ? error.message : "Failed to load definition"
          );
        }
      }
    };

    fetchData();
    return () => abortController.abort();
  }, [selectedText]);

  return (
    <div
      className="fixed bg-white p-1 rounded-lg shadow-lg border border-gray-200 z-50 max-w-xs max-h-4/12 inset-0"
      style={{ top: position.top, left: position.left }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center gap-1">
        <Link href={"/dictionary/" + selectedText} className="truncate">
          <h3 className={`font-semibold text-lg truncate cp uppercase text-${vocabItem?.status}`}>{selectedText}</h3>
        </Link>
        <div className="c gap-0-5">
          <div className={`p-0-5 rounded cp ${vocabItem ? "bg-gray-600" : ""}`}>
            <BookMark
              className={`w-2 ${
                vocabItem ? "fill-gold" : "fill-black hover:fill-dark-gold"
              }`}
              onClick={handleBookmarkClick}
            />
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            ×
          </button>
        </div>
      </div>

      <div className={`text-sm ${isError ? "text-red-500" : "text-gray-600"}`}>
        {isError ? (
          <div className="flex items-center gap-2">
            ⚠️ {/* or your SVG/icon */}
            {definition}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {definition === "Loading..." && (
              <span className="animate-spin">🌀</span>
            )}
            <span>{definition}</span>
          </div>
        )}
      </div>
    </div>
  );
}
