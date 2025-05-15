import { Book, Profile, UsersBooks, UsersVocab, Word, word_statuses } from "@/types/dbTypes";
import { supabase } from "./supabaseClient";
import axios, { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Create axios instance with base config
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 seconds timeout
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(async (config) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }
    return config;
  } catch (error) {
    console.error("Failed to set auth token", error);
    throw error;
  }
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response) {
      // Server responded with a status code outside 2xx
      console.error("API Error:", {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url
      });
    } else if (error.request) {
      // No response received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Request setup error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Helper function for handling API errors
const handleApiError = (error: unknown, defaultMessage: string) => {
  if (axios.isAxiosError(error)) {
    throw new Error(error.response?.data?.message || defaultMessage);
  }
  throw new Error(defaultMessage);
};

// UsersBooks API
export const fetchUserBooks = async (userId: string): Promise<UsersBooks[]> => {
  try {
    const response = await apiClient.get<UsersBooks[]>(`/users-books/user/${userId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Failed to fetch user books");
  }
};

export const fetchUserBook = async (userId: string, bookId: string): Promise<UsersBooks | null> => {
  try {
    const response = await apiClient.get<UsersBooks>(`/users-books/user-book/${bookId}/${userId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw handleApiError(error, "Failed to fetch user book");
  }
};

export const createUserBook = async (data: UsersBooks): Promise<UsersBooks> => {
  try {
    const response = await apiClient.post<UsersBooks>('/users-books', data);
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Failed to create user book");
  }
};

export const updateUserBook = async (id: string, data: UsersBooks): Promise<UsersBooks> => {
  try {
    const response = await apiClient.patch<UsersBooks>(`/users-books/${id}`, data);
    return response.data;
  } catch (error) {
    throw handleApiError(error, `Failed to update user book with ID ${id}`);
  }
};

export const updateLastPage = async (id: string, page: number): Promise<UsersBooks> => {
  try {
    const response = await apiClient.patch<UsersBooks>(`/users-books/${id}/last-page/${page}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, `Failed to update last page for user book with ID ${id}`);
  }
};

export const toggleBookmark = async (id: string): Promise<UsersBooks> => {
  try {
    const response = await apiClient.patch<UsersBooks>(`/users-books/${id}/toggle-bookmark`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, `Failed to toggle bookmark for user book with ID ${id}`);
  }
};

export const deleteUserBook = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/users-books/${id}`);
  } catch (error) {
    throw handleApiError(error, `Failed to delete user book with ID ${id}`);
  }
};

// Books API
export const fetchBooks = async (): Promise<Book[]> => {
  try {
    const response = await apiClient.get<Book[]>('/books');
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Failed to fetch books");
  }
};

export const fetchBook = async (id: string): Promise<Book> => {
  try {
    const response = await apiClient.get<Book>(`/books/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, `Failed to fetch book with ID ${id}`);
  }
};

interface BookCreationError {
  message: string;
  error: string;
  statusCode: number;
}

export const createBook = async (data: Partial<Book>, image?: File): Promise<Book> => {
  // Validate required fields before creating FormData
  if (!data?.title?.trim()) {
    throw new Error("Book title is required");
  }

  const formData = new FormData();
  
  formData.append('title', data.title || '');
  formData.append('description', data.description || '');
  formData.append('chapters', JSON.stringify(data.chapters || []));
  
  // Validate and append cover image
  if (image) {
    if (!image.type.startsWith('image/')) {
      throw new Error("Uploaded file must be an image");
    }
    formData.append('image', image);
  }

  try {
    const response = await apiClient.post<Book>('/books', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404 && error.response.data?.error?.includes('title')) {
      throw new Error("Please provide a valid book title");
    }
    throw handleApiError(error, "Failed to create book");
  }
};

export const updateBook = async (
  id: string, 
  bookData: Partial<Book>,
  image?: File
): Promise<Book> => {
  try {
    const formData = new FormData();
    
    // Append each book data field individually
    Object.entries(bookData).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      // Handle arrays (both empty and non-empty)
      if (Array.isArray(value) && typeof value === 'object') {
        formData.append(key, JSON.stringify(value));
      }
      // Handle primitive values
      else {
        formData.append(key, String(value));
      }
    });
    
    if (image) {
      formData.append('image', image);
    }

    const response = await apiClient.patch<Book>(`/books/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error, `Failed to update book with ID ${id}`);
  }
};

export const deleteBook = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/books/${id}`);
  } catch (error) {
    throw handleApiError(error, `Failed to delete book with ID ${id}`);
  }
};

// Dictionary API
export const fetchDictionary = async (): Promise<Word[]> => {
  try {
    const response = await apiClient.get<Word[]>('/dictionary');
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Failed to fetch dictionary");
  }
};

export const fetchWord = async (id: string): Promise<Word> => {
  try {
    const response = await apiClient.get<Word>(`/dictionary/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, `Failed to fetch word with ID ${id}`);
  }
};

export const createWord = async (data: Partial<Word>): Promise<Word> => {
  try {
    const response = await apiClient.post<Word>('/dictionary', data);
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Failed to create word");
  }
};

export const updateWord = async (id: string, wordData: Partial<Word>): Promise<Word> => {
  try {
    const response = await apiClient.patch<Word>(`/dictionary/${id}`, wordData);
    return response.data;
  } catch (error) {
    throw handleApiError(error, `Failed to update word with ID ${id}`);
  }
};

export const deleteWord = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/dictionary/${id}`);
  } catch (error) {
    throw handleApiError(error, `Failed to delete word with ID ${id}`);
  }
};

// Profile API
export const fetchProfile = async (id: string): Promise<Profile> => {
  try {
    const response = await apiClient.get<Profile>(`/profiles/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, `Failed to fetch profile with ID ${id}`);
  }
};

export const updateProfile = async (
  id: string,
  profileData: Partial<Profile>,
  avatar?: File
): Promise<Profile> => {
  try {
    const formData = new FormData();
    
    // Append profile data
		Object.entries(profileData).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      // Handle arrays (both empty and non-empty)
      if (Array.isArray(value) && typeof value === 'object') {
        formData.append(key, JSON.stringify(value));
      }
      // Handle primitive values
      else {
        formData.append(key, String(value));
      }
    });
    
    // Append avatar if provided
    if (avatar) {
      formData.append('avatar', avatar);
    }

    const response = await apiClient.put<Profile>(`/profiles/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error, `Failed to update profile with ID ${id}`);
  }
};

// Auth API
export const syncUser = async (): Promise<void> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not logged in");
    }

    const userId = user.id;
    const email = user.email!;
    const name = user.user_metadata?.full_name || "";

    await apiClient.post('/auth/sync-user', { userId, email, name });
  } catch (error) {
    throw handleApiError(error, "Failed to sync user");
  }
};

export const fetchUserVocab = async (userId: string): Promise<UsersVocab[]> => {
  try {
    const response = await apiClient.get<UsersVocab[]>(`/users-vocab/user/${userId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Failed to fetch user vocabulary");
  }
};

export const fetchVocabItem = async (id: string): Promise<UsersVocab> => {
  try {
    const response = await apiClient.get<UsersVocab>(`/users-vocab/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, `Failed to fetch vocabulary item with ID ${id}`);
  }
};

export const fetchVocabItemByTerm = async (term: string, userId: string): Promise<UsersVocab> => {
  try {
    const response = await apiClient.get<UsersVocab>(`/users-vocab/term/${term}/${userId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, `Failed to fetch vocabulary item with value ${term}`);
  }
};

export const createVocabItem = async (data: Partial<UsersVocab>): Promise<UsersVocab> => {
  try {
    const response = await apiClient.post<UsersVocab>('/users-vocab', data);
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Failed to create vocabulary item");
  }
};

export const updateVocabItem = async (
  id: string, 
  vocabData: Partial<UsersVocab>
): Promise<UsersVocab> => {
  try {
    const response = await apiClient.patch<UsersVocab>(`/users-vocab/${id}`, vocabData);
    return response.data;
  } catch (error) {
    throw handleApiError(error, `Failed to update vocabulary item with ID ${id}`);
  }
};

export const updateVocabStatus = async (
  id: string,
  status: word_statuses
): Promise<UsersVocab> => {
  try {
    const response = await apiClient.patch<UsersVocab>(`/users-vocab/${id}/status/${status}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, `Failed to update status for vocabulary item with ID ${id}`);
  }
};

export const incrementVocabRepeats = async (id: string): Promise<UsersVocab> => {
  try {
    const response = await apiClient.patch<UsersVocab>(`/users-vocab/${id}/increment-repeats`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, `Failed to increment repeats for vocabulary item with ID ${id}`);
  }
};

export const deleteVocabItem = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/users-vocab/${id}`);
  } catch (error) {
    throw handleApiError(error, `Failed to delete vocabulary item with ID ${id}`);
  }
};