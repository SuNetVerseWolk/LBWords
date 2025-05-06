import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchBooks, fetchBook, createBook, updateBook, deleteBook } from "@/lib/api";
import { Book } from "@/types/dbTypes";

export const useBooks = (id?: any) => {
  const queryClient = useQueryClient();

  const useBooks = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: fetchBooks
  });

	const useBook = useQuery<Book>({
    queryKey: ["book", id],
    queryFn: async () => await fetchBook(id),
		enabled: !!id
  });

  const createMutation = useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Book> }) => updateBook(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });

			if (id) {
				queryClient.invalidateQueries({ queryKey: ["book", id] });
			}
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    }
  });

  return {
		useBooks: useBooks,
		useBook: useBook,
    createBook: createMutation,
    updateBook: updateMutation,
    deleteBook: deleteMutation,
    isMutating: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending
  };
};