type UID = string;

export interface Profile {
	id: UID;
	nickname: string;
	image?: string;
	role: 'user' | 'admin';
}

export type word_statuses = 'unknown' | 'learning' | 'learned' | 'upto';

export interface UsersVocab {
  id?: UID;
  created_at?: string;
  user: string;
  status: word_statuses;
  repeatments: number;
  term: string;
}

export interface UsersBooks {
	id?: UID;
  user: string;
  book: string;
  is_book_marked?: boolean;
  last_page?: number;
}

export interface Word {
	id: UID;
	word: string;
	level: string;
  createdAt: string;
}

export interface Chapter {
  id: number;
  name: string;
	image: string | null;
	values: string[];
}

export interface Book {
  id: UID;
  title: string;
  description: string;
  image?: string;
	chapters?: Chapter[];
  createdAt: string;
}