"use client";
import { useAuth } from "@/hooks/useAuth";
import { useUserVocab } from "@/hooks/useUsersVocab";
import VocabCard from "../ui/VocabCard";
import SpinerLoading from "./SpinerLoading";
import { useState } from "react";

const statusLabels = {
  unknown: "Не знаю",
  learned: "Знаю",
  learning: "Учу",
  upto: "В планах",
};

const VocabList = () => {
  const { user } = useAuth();
  const { data: vocabItems, isLoading, error } = useUserVocab(user?.id || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const filteredVocabItems = vocabItems?.filter((item) => {
    const matchesSearch = item.term
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatuses.length === 0 || selectedStatuses.includes(item.status);
    return matchesSearch && matchesStatus;
  });

  if (error) return <div className="c">Error: {error.message}</div>;

  return (
    <div className="flex flex-col h-full w-full space-y-2 md:space-y-1">
      <h2 className="text-center text-xl font-bold mt-1">
        Ваш словарь - {isLoading ? 0 : filteredVocabItems?.length}
      </h2>

      <div className="flex flex-col md:flex-row gap-2 md:gap-0-5">
        <input
          type="text"
          placeholder="Search vocabulary..."
          className="w-full p-2 md:p-0-5 rounded-lg border border-main-darken focus:outline-none focus:ring-2 focus:ring-main-accent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex gap-0-5 justify-center">
          {Object.entries(statusLabels).map(([status, label]) => (
            <button
              key={status}
              onClick={() => toggleStatus(status)}
              className={`px-2 py-1-5 md:px-1 md:py-0-5 rounded-2xl text-sm font-semibold transition-colors ${
                selectedStatuses.includes(status)
                  ? `bg-${status} text-white`
                  : `bg-gray-100 text-${status} hover:bg-gray-200`
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-full overflow-y-scroll pr-0-5 thin-scrollbar space-y-1">
        {isLoading ? (
          <SpinerLoading />
        ) : filteredVocabItems?.length === 0 ? (
          <div className="text-center text-gray-500 py-4">
            No vocabulary items found
          </div>
        ) : (
          filteredVocabItems?.map((item) => (
            <VocabCard key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default VocabList;
