import { Book, Profile, Word } from "@/types/dbTypes";
import { supabase } from "./supabaseClient";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchBooks = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  
  const response = await fetch(`${API_URL}/books`, {
    headers: {
      Authorization: `Bearer ${session?.access_token}`
    },
  });
  
  return response.json();
};
export const fetchDictionary = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  
  const response = await fetch(`${API_URL}/dictionary`, {
    headers: {
      Authorization: `Bearer ${session?.access_token}`
    },
  });
  
  return response.json();
};

export const fetchBook = async (id: any) => {
  const { data: { session } } = await supabase.auth.getSession();

  const response = await fetch(`${API_URL}/books/${id}`, {
    headers: {
      Authorization: `Bearer ${session?.access_token}`
    },
  });

  return response.json();
};
export const fetchWord = async (id: any) => {
  const { data: { session } } = await supabase.auth.getSession();

  const response = await fetch(`${API_URL}/dictionary/${id}`, {
    headers: {
      Authorization: `Bearer ${session?.access_token}`
    },
  });

  return response.json();
};

export const createBook = async (data: Partial<Book>): Promise<Book> => {
  const response = await axios.post(`${API_URL}/books`, {
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
  const response = await axios.post(`${API_URL}/dictionary`, {
    ...data
  });
  return response.data;
};

export const updateBook = async (id: string, bookData: Partial<Book>) => {
  const { data: { session } } = await supabase.auth.getSession();

  const response = await fetch(`${API_URL}/books/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access_token}`
    },
    body: JSON.stringify(bookData),
  });

  return response.json();
};
export const updateWord = async (id: string, wordData: Partial<Word>) => {
  const { data: { session } } = await supabase.auth.getSession();

  const response = await fetch(`${API_URL}/dictionary/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access_token}`
    },
    body: JSON.stringify(wordData),
  });

  return response.json();
};

export const deleteBook = async (id: string): Promise<void> => {
  const { data: { session } } = await supabase.auth.getSession();

  const response = await fetch(`${API_URL}/books/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session?.access_token}`
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete book");
  }
};
export const deleteWord = async (id: string): Promise<void> => {
  const { data: { session } } = await supabase.auth.getSession();

  const response = await fetch(`${API_URL}/dictionary/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session?.access_token}`
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete book");
  }
};

//export const fetchUserD = async (
//  userEmail: string,
//  accessToken: string
//): Promise<Partial<UserD>> => {
//  console.log(userEmail);
//  if (!userEmail) throw new Error("Email needed");

//  const response = await fetch(`${API_URL}/user`, {
//    headers: {
//      Authorization: `Bearer ${accessToken}`,
//      "user-email": userEmail,
//    },
//  });
//  if (!response.ok) throw new Error("Failed to fetch books");
//  return response.json();
//};
export const fetchProfiles = async (): Promise<Profile[]> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const response = await fetch(`${API_URL}/profiles`, {
    headers: {
      Authorization: `Bearer ${session?.access_token}`
    },
  });
  if (!response.ok) throw new Error("Failed to fetch profiles: Status code is " + response.status);
  return response.json();
};
export const fetchProfile = async (id: string | string[]): Promise<Profile> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const response = await fetch(`${API_URL}/profiles/${id}`, {
    headers: {
      Authorization: `Bearer ${session?.access_token}`
    },
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch profile");
  }
  
  return response.json();
};

export const syncUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    console.error("User not logged in");
    return;
  }

  const userId = user.id;
  const email = user.email!;
  const name = user.user_metadata?.full_name || "";

  const response = await fetch(`${API_URL}/auth/sync-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, email, name }),
  });

  if (!response.ok) {
    console.error("Failed to sync user");
    return;
  }
};

//export const uploadImage = async (
//  file: File
//) => {
//	const {
//    data: { session },
//  } = await supabase.auth.getSession();
//	if (!session?.user.email) {
//		return;
//	}
//	let fileType: string | string[] = file.name.split('.');
//	fileType = fileType[fileType.length - 1];
//  const filePath = `${Date.now()}.${fileType}`;

//  const { data, error } = await supabase.storage
//    .from("avatars")
//    .upload(filePath, file, {
//			upsert: true
//		});

//  if (error) {
//    console.error("Error uploading image:", error.message);
//    return null;
//  }

//  const { data: publicUrlData } = supabase.storage
//    .from("avatars")
//    .getPublicUrl(filePath);

//	console.log(publicUrlData)
//  const response = await fetch(`${API_URL}/user/${user.id}`, {
//    method: "PATCH",
//    headers: {
//      "Content-Type": "application/json",
//      Authorization: `Bearer ${session?.access_token}`,
//    },
//    body: JSON.stringify({ image: publicUrlData.publicUrl }),
//  });
//	console.log(response)
//  if (!response.ok) throw new Error("Failed to update user");
//	return response.json();
//};
