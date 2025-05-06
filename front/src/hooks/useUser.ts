"use client";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";
import { fetchProfile } from "@/lib/api";
import Roles from "@/enums/roles";

const fetchUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return user;
};

export const useUser = () => {
  return useQuery({ queryKey: ["user"], queryFn: fetchUser });
};

export const useProfile = (id: string, error: Error | null) =>
  useQuery({
    queryKey: ["profile"],
    queryFn: async () => await fetchProfile(id!),
    enabled: !!id && !error,
  });

export const useRole = () => useQuery({
	queryKey: ['role'],
	queryFn: async () => {
		const user = await fetchUser();
		const profile = await fetchProfile(user?.id!)
		
		return profile?.role as keyof typeof Roles;
	}
})