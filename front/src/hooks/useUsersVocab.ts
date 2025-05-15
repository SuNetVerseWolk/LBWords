import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchUserVocab,
  fetchVocabItem,
  createVocabItem,
  updateVocabItem,
  updateVocabStatus,
  incrementVocabRepeats,
  deleteVocabItem,
	fetchVocabItemByTerm,
} from "@/lib/api";
import { UsersVocab, word_statuses } from '@/types/dbTypes';

export const useUserVocab = (userId: string) => {
  return useQuery({
    queryKey: ['userVocab', userId],
    queryFn: () => fetchUserVocab(userId),
    enabled: !!userId,
  });
};

export const useVocabItem = (id: string) => {
  return useQuery({
    queryKey: ['vocabItem', id],
    queryFn: () => fetchVocabItem(id),
    enabled: !!id,
  });
};
export const useVocabItemByTerm = (term: string, userId: string) => {
  return useQuery({
    queryKey: ['vocabItem', term],
    queryFn: () => fetchVocabItemByTerm(term, userId),
    enabled: !!userId && !!term,
  });
};

export const useCreateVocabItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createVocabItem,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: ['userVocab', variables.user],
      });
			queryClient.invalidateQueries({ 
        queryKey: ['vocabItem', variables.term],
      });
			queryClient.invalidateQueries({ 
        queryKey: ['vocabItem', variables.id],
      });
    },
  });
};

export const useUpdateVocabItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string } & Partial<UsersVocab>) => 
      updateVocabItem(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['vocabItem', data.id] });
      queryClient.invalidateQueries({ queryKey: ['vocabItem', data.term] });
      queryClient.invalidateQueries({ queryKey: ['userVocab', data.user] });
    },
  });
};

export const useUpdateVocabStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: word_statuses }) =>
      updateVocabStatus(id, status),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['vocabItem', data.id] });
      queryClient.invalidateQueries({ queryKey: ['vocabItem', data.term] });
      queryClient.invalidateQueries({ queryKey: ['userVocab', data.user] });
    },
  });
};

export const useIncrementVocabRepeats = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => incrementVocabRepeats(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['vocabItem', data.id] });
      queryClient.invalidateQueries({ queryKey: ['vocabItem', data.term] });
      queryClient.invalidateQueries({ queryKey: ['userVocab', data.user] });
    },
  });
};

export const useDeleteVocabItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVocabItem,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['userVocab'] });
    },
  });
};