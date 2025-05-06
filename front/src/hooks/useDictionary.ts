import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Word } from "@/types/dbTypes";
import { createWord, deleteWord, fetchDictionary, fetchWord, updateWord } from "@/lib/api";

export const UseDictionary = (id?: any) => {
	const queryClient = useQueryClient();

	const useDictionary = useQuery<Word[]>({
		queryKey: ["dictionary"],
		queryFn: fetchDictionary
	});

	const useWord = useQuery<Word>({
		queryKey: ["word", id],
		queryFn: async () => await fetchWord(id),
		enabled: !!id
	});

	const createMutation = useMutation({
		mutationFn: createWord,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["dictionary"] });
		}
	});

	const updateMutation = useMutation({
		mutationFn: ({ id, data }: { id: string; data: Partial<Word> }) => updateWord(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["dictionary"] });

			if (id) {
				queryClient.invalidateQueries({ queryKey: ["word", id] });
			}
		}
	});

	const deleteMutation = useMutation({
		mutationFn: deleteWord,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["dictionary"] });
		}
	});

	return {
		useDictionary: useDictionary,
		useWord: useWord,
		createWord: createMutation,
		updateWord: updateMutation,
		deleteWord: deleteMutation,
		isMutating: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending
	};
};