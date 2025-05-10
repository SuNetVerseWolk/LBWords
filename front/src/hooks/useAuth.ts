"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";
import { fetchProfile, updateProfile } from "@/lib/api";
import { Profile } from "@/types/dbTypes";
import Roles from "@/enums/roles";

// Base user fetching function
const fetchUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return user;
};

export const useUser = () => {
  return useQuery({ 
    queryKey: ["user"], 
    queryFn: fetchUser 
  });
};

export const useProfile = (id?: string) => {
  const queryClient = useQueryClient();

  const profileQuery = useQuery({
    queryKey: ["profile", id],
    queryFn: async () => {
      if (!id) throw new Error("No user ID provided");
      return await fetchProfile(id);
    },
    enabled: !!id,
  });

  const updateMutation = useMutation({
    mutationFn: ({ 
      id, 
      data, 
      avatar 
    }: { 
      id: string; 
      data: Partial<Profile>; 
      avatar?: File 
    }) => updateProfile(id, data, avatar),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["profile", variables.id], data);
      // Also update role if it was changed
      if (data.role) {
        queryClient.setQueryData(["role"], data.role);
      }
    }
  });

  return {
    ...profileQuery,
    updateProfile: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error
  };
};

export const useRole = () => {
  const { data: user } = useUser();
  
  return useQuery({
    queryKey: ['role'],
    queryFn: async () => {
      if (!user?.id) return null;
      const profile = await fetchProfile(user.id);
      return profile?.role as keyof typeof Roles;
    },
    enabled: !!user?.id
  });
};

// Combined hook that provides everything
export const useAuth = () => {
  const userQuery = useUser();
  const profileQuery = useProfile(userQuery.data?.id);
  const roleQuery = useRole();

  return {
    user: userQuery.data,
    profile: profileQuery.data,
    role: roleQuery.data,
    isLoading: userQuery.isLoading || profileQuery.isLoading || roleQuery.isLoading,
    isUpdating: profileQuery.isUpdating,
    updateProfile: profileQuery.updateProfile,
    error: userQuery.error || profileQuery.error || roleQuery.error,
    refetch: () => {
      userQuery.refetch();
      profileQuery.refetch();
      roleQuery.refetch();
    }
  };
};