type UID = string;

export interface Profile {
	id: UID;
	nickname: string;
	image?: string;
	role: 'user' | 'admin';
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
  image: string | null;
	chapters: Chapter[];
  createdAt: string;
}