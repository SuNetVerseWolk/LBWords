import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchUserBooks,
  fetchUserBook,
  createUserBook,
  updateUserBook,
  updateLastPage,
  toggleBookmark,
  deleteUserBook,
} from '@/lib/api';
import { UsersBooks } from '@/types/dbTypes';

export const useUserBooks = (userId: string) => {
  return useQuery({
    queryKey: ['userBooks', userId],
    queryFn: () => fetchUserBooks(userId),
    enabled: !!userId,
  });
};

export const useUserBook = (userId?: string, bookId?: string) => {
  return useQuery({
    queryKey: ['userBook', userId, bookId],
    queryFn: () => fetchUserBook(userId!, bookId!),
    enabled: !!userId && !!bookId,
  });
};

export const useCreateUserBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUserBook,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ 
        queryKey: ['userBooks', data.user] 
      });
      queryClient.invalidateQueries({
        queryKey: ['userBook', data.user, data.book]
      });
    },
  });
};

export const useUpdateLastPage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, page }: { id: string; page: number }) =>
      updateLastPage(id, page),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ 
        queryKey: ['userBooks', data.user] 
      });
      queryClient.invalidateQueries({
        queryKey: ['userBook', data.user, data.book]
      });
    },
  });
};

export const useUpdateUserBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: UsersBooks }) => 
      updateUserBook(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ 
        queryKey: ['userBooks', data.user] 
      });
      queryClient.invalidateQueries({
        queryKey: ['userBook', data.user, data.book]
      });
    },
  });
};

export const useToggleBookmark = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => toggleBookmark(id),
    onSuccess: (data) => {
			console.log(data)
      queryClient.invalidateQueries({ 
        queryKey: ['userBooks', data.user] 
      });
      queryClient.invalidateQueries({
        queryKey: ['userBook', data.user, data.book]
      });
    },
  });
};

export const useDeleteUserBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUserBook(id),
    onSuccess: (_, variables, context) => {
      queryClient.invalidateQueries({ 
        queryKey: ['userBooks'] 
      });
      queryClient.invalidateQueries({
        queryKey: ['userBook']
      });
    },
  });
};