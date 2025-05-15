"use client";
import { useAuth } from "@/hooks/useAuth";
import { useUserVocab } from "@/hooks/useUsersVocab";
import VocabCard from "../ui/VocabCard";
import SpinerLoading from "./SpinerLoading";

const VocabList = () => {
  const { user } = useAuth();
  const { data: vocabItems, isLoading, error } = useUserVocab(user?.id || "");

  if (isLoading) return <SpinerLoading />;
  if (error) return <div className="c">Error: {error.message}</div>;

  return (
    <div className="flex flex-col h-full w-full space-y-2 mt-1">
      <h2 className="text-center text-xl font-bold">Your Vocabulary - {vocabItems?.length}</h2>
      <div className="h-full overflow-y-scroll pr-0-5 thin-scrollbar space-y-1">
        {vocabItems?.map((item) => (
          <VocabCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default VocabList;
