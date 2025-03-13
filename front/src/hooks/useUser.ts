'use client';

import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabaseClient';

const fetchUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return user;
};

export const useUser = () => {
  return useQuery({ queryKey: ['user'], queryFn: fetchUser });
};