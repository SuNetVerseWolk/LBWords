import { Book, Profile, Word } from "@/types/dbTypes";
import { supabase } from "./supabaseClient";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Create axios instance with base config
const apiClient = axios.create({
  baseURL: API_URL,
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  return config;
});

export const fetchBooks = async (): Promise<Book[]> => {
  const response = await apiClient.get('/books');
  return response.data;
};

export const fetchDictionary = async (): Promise<Word[]> => {
  const response = await apiClient.get('/dictionary');
  return response.data;
};

export const fetchBook = async (id: string): Promise<Book> => {
  const response = await apiClient.get(`/books/${id}`);
  return response.data;
};

export const fetchWord = async (id: string): Promise<Word> => {
  const response = await apiClient.get(`/dictionary/${id}`);
  return response.data;
};

export const createBook = async (data: Partial<Book>): Promise<Book> => {
  const response = await apiClient.post('/books', {
    ...data,
    chapters: data.chapters || [{
      id: 0,
      name: 'Chapter 1',
      image: null,
      values: []
    }]
  });
  return response.data;
};

export const createWord = async (data: Partial<Word>): Promise<Word> => {
  const response = await apiClient.post('/dictionary', data);
  return response.data;
};

export const updateBook = async (id: string, bookData: Partial<Book>): Promise<Book> => {
  const response = await apiClient.patch(`/books/${id}`, bookData);
  return response.data;
};

export const updateWord = async (id: string, wordData: Partial<Word>): Promise<Word> => {
  const response = await apiClient.patch(`/dictionary/${id}`, wordData);
  return response.data;
};

export const deleteBook = async (id: string): Promise<void> => {
  await apiClient.delete(`/books/${id}`);
};

export const deleteWord = async (id: string): Promise<void> => {
  await apiClient.delete(`/dictionary/${id}`);
};

export const fetchProfile = async (id: string | string[]): Promise<Profile> => {
  try {
    const response = await apiClient.get(`/profiles/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to fetch profile");
    }
    throw new Error("Failed to fetch profile");
  }
};

export const syncUser = async (): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error("User not logged in");
    return;
  }

  const userId = user.id;
  const email = user.email!;
  const name = user.user_metadata?.full_name || "";

  try {
    await apiClient.post('/auth/sync-user', { userId, email, name });
  } catch (error) {
    console.error("Failed to sync user", error);
    throw error;
  }
};

export const updateProfile = async (
  id: string,
  profileData: Partial<Profile>,
  avatar?: File
): Promise<Profile> => {
  const formData = new FormData();
  
  // Append all profile data fields
  Object.entries(profileData).forEach(([key, value]) => {
    if (value !== undefined) {
      formData.append(key, value);
    }
  });
  
  // Append the avatar file if provided
  if (avatar) {
    formData.append('avatar', avatar);
  }

  try {
    const response = await apiClient.put(`/profiles/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to update profile");
    }
    throw new Error("Failed to update profile");
  }
};