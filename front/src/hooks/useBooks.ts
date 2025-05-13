import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchBooks, fetchBook, createBook, updateBook, deleteBook } from "@/lib/api";
import { Book } from "@/types/dbTypes";

export const useBooks = (id?: string) => {
  const queryClient = useQueryClient();

  const booksQuery = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: fetchBooks,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
	
  const bookQuery = useQuery<Book>({
		queryKey: ["book", id],
    queryFn: () => fetchBook(id!),
    enabled: !!id,
  });

  const createMutation = useMutation({
    mutationFn: (data: { title: string; image?: File }) => 
      createBook({ title: data.title }, data.image),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ 
      id, 
      data,
      image 
    }: { 
      id: string; 
      data: Partial<Book>;
      image?: File;
    }) => updateBook(id, data, image),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["book", variables.id] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  return {
    booksQuery,
    bookQuery,
    createBook: createMutation,
    updateBook: updateMutation,
    deleteBook: deleteMutation,
    isMutating: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
  };
};